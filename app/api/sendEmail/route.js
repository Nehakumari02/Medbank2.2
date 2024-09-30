import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, phoneNumber, email, inquiryDetails } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER, // Your email address
    subject: `New Inquiry from ${name}`,
    text: `Name: ${name}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nInquiry Details: ${inquiryDetails}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
    });
  }
}
