import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email,message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // Your email address
    subject: "MEDBANK 【遺伝子解析について】Genetic Analysis",
    text: `Dear ${name}

こんにちは。MEDBANK株式会社の佐藤みずきです。
Hello. I am Mizuki Sato from MEDBANK.

メッセージをお送りしていますので、マイページより内容のご確認をお願いします。
Please check the message from My Page.

マイページログインはこちら
Click here to log in to My Page
< Login URL>

—----------------------------------------------
${message}

—----------------------------------------------

※こちらのメールは送信専用となります。お問合せやお困りの際はマイページ内よりお願い致します。
Please note that this e-mail is for sending only. If you have any questions or problems, please contact us from My Page.

MEDBANK株式会社　担当　佐藤みずき
MEDBANK PTE. LTD. Mizuki Satou

`,

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
