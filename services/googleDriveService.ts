import { google, drive_v3 } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Load credentials from environment or file
const KEY_FILE_PATH = path.join(process.cwd(), 'service-account.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

let drive: drive_v3.Drive | null = null;

try {
  if (fs.existsSync(KEY_FILE_PATH)) {
    const keyFileContent = fs.readFileSync(KEY_FILE_PATH, 'utf-8');
    const keyFile = JSON.parse(keyFileContent);
    
    // Check if it's a placeholder
    if (keyFile.project_id === 'placeholder-project') {
      console.warn('Using placeholder service-account.json. Google Drive upload will be simulated.');
    } else {
      const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE_PATH,
        scopes: SCOPES,
      });
      drive = google.drive({ version: 'v3', auth });
    }
  } else {
    console.warn('service-account.json not found. Google Drive upload will be simulated.');
  }
} catch (error) {
  console.error('Error initializing Google Drive client:', error);
}

export const uploadFileToDrive = async (filePath: string, fileName: string, mimeType: string) => {
  if (!drive) {
    console.log(`[SIMULATION] Uploading ${fileName} to Google Drive...`);
    // Return a fake Google Drive link or the local path
    // Since we can't really generate a valid drive link without uploading, 
    // we'll return a local URL that points to the file on the server.
    // In a real app, you'd want to handle this differently.
    // For this demo, we'll assume the file is available at /uploads/filename
    const localUrl = `${process.env.APP_URL || 'http://localhost:3000'}/uploads/${path.basename(filePath)}`;
    return localUrl;
  }

  try {
    const fileMetadata = {
      name: fileName,
    };
    const media = {
      mimeType: mimeType,
      body: fs.createReadStream(filePath),
    };

    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    // Make the file public
    await drive.permissions.create({
      fileId: file.data.id!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    return file.data.webViewLink;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    // Fallback to local URL if upload fails
    const localUrl = `${process.env.APP_URL || 'http://localhost:3000'}/uploads/${path.basename(filePath)}`;
    return localUrl;
  }
};
