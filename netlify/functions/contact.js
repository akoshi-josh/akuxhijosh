const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, message } = JSON.parse(event.body);

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'All fields are required.' })
    };
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
    html: `
      <div style="font-family:monospace;padding:32px;background:#040507;color:#9aafc8;border:1px solid #1e2535;max-width:600px;">
        <h2 style="color:#7ec8e3;">New message from your portfolio</h2>
        <p><strong style="color:#5b9bd5;">Name:</strong> ${name}</p>
        <p><strong style="color:#5b9bd5;">Email:</strong> ${email}</p>
        <p><strong style="color:#5b9bd5;">Message:</strong><br/>${message}</p>
        <p style="color:#3d4f6b;font-size:12px;">Sent from akuxhijosh portfolio</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Email sent successfully!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
