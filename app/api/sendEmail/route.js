import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, phoneNumber, email, inquiryDetails } = await req.json();

  const transporter = nodemailer.createTransport({
    
    host: "smtp.mail.us-east-1.awsapps.com",
    port: 465, // Use 465 for SSL or 587 for TLS
    secure: true,
    
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Your email address
    subject: `New Inquiry from ${name}`,
    text: `Name: ${name}\nPhone Number: ${phoneNumber}\nEmail: ${email}\nInquiry Details: ${inquiryDetails}`,
  };

  const mailOptions1 = {
    from:process.env.EMAIL_USER,
    to: email, // Your email address
    subject: "お問い合わせありがとうございます（Thank you very much for your inquiry）",
    html: `
        <div>
          <p>この度はMEDBANKの遺伝子解析サービスへのお問い合わせありがとうございました。</p>
          <p>Thank you very much for your inquiry to our gene sequencing service.</p>

          <p>下記の内容で情報を受け付けました。</p>
          <p>Information was accepted on the following:</p>

          <ul>
            <li><strong>Name</strong>: ${name}</li>
            <li><strong>Phone Number</strong>: ${phoneNumber}</li>
            <li><strong>Email</strong>: ${email}</li>
            <li><strong>Inquiry Details</strong>: ${inquiryDetails}</li>
          </ul>

          <p>お問い合わせ内容は2日以内を目安にお返事致しております。各オーダーについてや、お急ぎの場合は、マイページのチャットからお問い合わせください。</p>
          <p>Our reply to your inquiry will be within 2 days. If you have any questions about each order or if you are in a hurry, please contact us through the chat on My Page.</p>

          <p>Best regards,<br>The MEDBANK Team</p>
        </div>
        `
    
  }

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions1);
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error sending email' }), {
      status: 500,
    });
  }
}
