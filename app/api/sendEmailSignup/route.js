import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SIGNUP,
    to: email, // Your email address
    subject: "MEDBANK 【登録完了】Registeration completed",
    text: `Dear ${name}

初めまして。MEDBANK株式会社の佐藤みずきです。
Hello. It is nice to meet you. I am Mizuki Sato from MEDBANK.

この度はマイページへのご登録ありがとうございます。
Thank you for registering on My Page.

「遺伝子解析を発注するときに、やりとりが複雑でむつかしい！」という声にお答えし、マイページより、かんたんに相談や発注が行えるようになっています。
We are glad to hear that you have found it easy to consult with us and place an order for genetic analysis. In response to this, we have made it easier for you to consult with us and place an order from "My Page.

わからないことがございましたら、マイページ内からお気軽にお声がけください。
私、または担当者が、直接ご回答いたしております。
If you have any questions, please feel free to contact us from My Page.
We will reply to you directly.

みなさまの研究がスムーズに進むように、一生懸命サポートさせていただきます。
We will do our best to support you so that your research will proceed smoothly.

これからどうぞよろしくお願い致します。
We look forward to working with you in the future.

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
