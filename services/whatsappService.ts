import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let client: twilio.Twilio | null = null;

try {
  if (accountSid && authToken) {
    client = twilio(accountSid, authToken);
  } else {
    console.warn('Twilio credentials not found. WhatsApp notifications will be simulated.');
  }
} catch (error) {
  console.error('Error initializing Twilio client:', error);
}

export const sendWhatsAppMessage = async (to: string, message: string) => {
  if (!client) {
    console.log(`[SIMULATION] Sending WhatsApp message to ${to}: ${message}`);
    return 'simulated_sid';
  }

  try {
    const from = `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;
    const toFormatted = `whatsapp:${to.replace(/\D/g, '')}`; // Ensure only digits

    const response = await client.messages.create({
      body: message,
      from: from,
      to: toFormatted
    });

    return response.sid;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    // Don't throw, just log error so the main flow continues
    return null;
  }
};
