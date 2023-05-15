import SMTPTransport from 'nodemailer/lib/smtp-transport';
import nodemailer from 'nodemailer';

export interface EmailPayload {
  text: string;
  html: string;
}

export class EmailService {
  #transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
    });
  }

  async sendEmail(user: string, payload?: EmailPayload) {
    console.log(`EmailService::sendEmail() - sending email to ${user}`);
    return await this.#transporter.sendMail({
      from: `"The best Chuk site outh there 👻" <${process.env.MAIL_SENDER}>`, // sender address
      to: user,
      subject: 'Your new Chuck Norris joke',
      text: payload?.text || 'Default text',
      html: payload?.html || '<p>Default text</p>',
    });
  }
}
