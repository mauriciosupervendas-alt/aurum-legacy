import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { uploadFileToDrive } from './services/googleDriveService';
import { sendWhatsAppMessage } from './services/whatsappService';

import { GoogleGenAI } from "@google/genai";

// Data persistence setup
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const CONTENT_FILE = path.join(DATA_DIR, 'site_content.json');

// Helper to read appointments
const getAppointments = (): any[] => {
  if (!fs.existsSync(APPOINTMENTS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(APPOINTMENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading appointments:', error);
    return [];
  }
};

// Helper to read site content
const getSiteContent = () => {
  if (!fs.existsSync(CONTENT_FILE)) {
    return null;
  }
  try {
    const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading content:', error);
    return null;
  }
};

// Helper to save appointments
const saveAppointment = (appointment: any) => {
  const appointments = getAppointments();
  appointments.push(appointment);
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
};

// Helper to save site content
const saveSiteContent = (content: any) => {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
};

// ... existing imports

const app = express();
const PORT = 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// API Route to get site content (Public)
app.get('/api/content', (req, res) => {
  const content = getSiteContent();
  if (content) {
    res.json(content);
  } else {
    res.status(404).json({ error: 'Content not found' });
  }
});

// API Route to update site content (Admin Only)
app.post('/api/admin/content', (req, res) => {
  const { password, content } = req.body;
  
  if (password !== '6002') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!content) {
    return res.status(400).json({ error: 'No content provided' });
  }

  saveSiteContent(content);
  res.json({ success: true });
});

// API Route to add a new testimonial (Public)
app.post('/api/testimonials', (req, res) => {
  const newTestimonial = req.body;
  
  if (!newTestimonial || !newTestimonial.name || !newTestimonial.text) {
    return res.status(400).json({ error: 'Invalid testimonial data' });
  }

  const content = getSiteContent();
  if (content) {
    // Ensure testimonials array exists
    if (!content.testimonials) {
      content.testimonials = [];
    }
    
    // Add new testimonial with pending status
    content.testimonials.push({
      ...newTestimonial,
      id: Date.now(),
      status: 'pending'
    });
    
    saveSiteContent(content);
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to load content' });
  }
});

// API Route to get booked appointments (Public - Limited Data)
app.get('/api/appointments', (req, res) => {
  const appointments = getAppointments();
  // Return only necessary data for availability check
  const bookedSlots = appointments.map(app => ({
    date: app.date,
    time: app.time,
    duration: app.duration // Include duration
  }));
  res.json(bookedSlots);
});

// API Route to get full appointment details (Admin Only)
app.get('/api/admin/appointments', (req, res) => {
  const password = req.query.password;
  
  if (password !== '6002') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const appointments = getAppointments();
  res.json(appointments);
});

// API Route to cancel an appointment
app.delete('/api/appointments', (req, res) => {
  const { date, time, password } = req.body;

  if (password !== '6002') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const appointments = getAppointments();
  const newAppointments = appointments.filter(app => !(app.date === date && app.time === time));

  if (appointments.length === newAppointments.length) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(newAppointments, null, 2));
  res.json({ success: true });
});

// API Route for file upload (Legacy)
app.post('/api/upload', upload.array('photos', 10), (req, res) => {
  if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const files = req.files as Express.Multer.File[];
  const urls = files.map(file => {
    return `/uploads/${file.filename}`;
  });

  res.json({ urls });
});

// API Route for Scheduling
app.post('/api/schedule', upload.array('photos', 5), async (req, res) => {
  try {
    const { name, date, time, duration, carModel, objective, packageName, packagePrice, addOns } = req.body;
    const files = req.files as Express.Multer.File[];
    
    let photoLinks: string[] = [];

    if (files && files.length > 0) {
      // Upload each file to Drive
      for (const file of files) {
        try {
          const link = await uploadFileToDrive(file.path, file.originalname, file.mimetype);
          if (link) {
            photoLinks.push(link);
            // Only delete the local file if it was uploaded to Drive (not a local simulation)
            if (link.includes('drive.google.com')) {
              fs.unlinkSync(file.path);
            }
          }
        } catch (err) {
          console.error(`Failed to upload file ${file.originalname}:`, err);
        }
      }
    }

    // Construct WhatsApp Message
    const message = `*NOVO AGENDAMENTO - MF AURUM LEGACY*\n\n` +
      `*Cliente:* ${name}\n` +
      `*Veículo:* ${carModel}\n` +
      `*Objetivo:* ${objective}\n\n` +
      `*Pacote:* ${packageName} (${packagePrice})\n` +
      `*Duração Est.:* ${duration} min\n` +
      `*Adicionais:* ${addOns || 'Nenhum'}\n\n` +
      `*Agendamento Solicitado:*\n` +
      `📅 Data: ${date}\n` +
      `⏰ Horário: ${time}\n\n` +
      (photoLinks.length > 0 ? `*Fotos do Veículo:*\n${photoLinks.join('\n')}` : `_Nenhuma foto anexada._`);

    // Save appointment locally
    saveAppointment({
      name,
      carModel,
      objective,
      packageName,
      packagePrice,
      addOns,
      date,
      time,
      duration, // Save duration
      photoLinks,
      createdAt: new Date().toISOString()
    });

    // Send to Owner's WhatsApp
    const myPhone = process.env.MY_PHONE_NUMBER;
    if (myPhone) {
      await sendWhatsAppMessage(myPhone, message);
    } else {
      console.warn('MY_PHONE_NUMBER not set, skipping WhatsApp notification');
    }

    res.json({ success: true, photoLinks });
  } catch (error) {
    console.error('Error processing schedule:', error);
    res.status(500).json({ error: 'Failed to process schedule' });
  }
});

// API Route to list uploaded files
app.get('/api/uploads', (req, res) => {
  const password = req.query.password;
  
  if (password !== '6002') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to list files' });
    }
    const fileUrls = files.map(file => `/uploads/${file}`);
    res.json({ files: fileUrls });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving would go here if needed
    // But for this environment, we rely on Vite dev server mostly
    // Or serve 'dist' folder
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
