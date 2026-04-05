const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `Portfolio Contact from ${name}`,
    html: `<div style="font-family:monospace;padding:32px;background:#040507;color:#9aafc8;border:1px solid #1e2535;max-width:600px;"><h2 style="color:#7ec8e3;">New message from your portfolio</h2><p><strong style="color:#5b9bd5;">Name:</strong> ${name}</p><p><strong style="color:#5b9bd5;">Email:</strong> ${email}</p><p><strong style="color:#5b9bd5;">Message:</strong><br/>${message}</p></div>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Mail error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Email user: ${process.env.EMAIL_USER}`);
  console.log(`Sending to: ${process.env.EMAIL_TO}`);
});
