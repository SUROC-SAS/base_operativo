import fs from 'fs';
import hbs from 'handlebars';
import mjml2html from 'mjml';
import { resolve } from 'path';
import Mail from 'nodemailer/lib/mailer';
import nodemailer, { SendMailOptions } from 'nodemailer';

class EmailAdapter {
  private readonly _transport: Mail;
  private _fromEmail = process.env.EMAIL_ADMIN;

  constructor() {
    const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;

    this._transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(subject: string, recipients: string[], html: string) {
    const mailOptions: SendMailOptions = {
      from: this._fromEmail,
      to: recipients.toString(),
      subject,
      html,
    };

    const sendEmail = await this._transport.sendMail(mailOptions);
    console.log('Message sent: %s', sendEmail.messageId);
  }

  prepareHtml(templateName: string, data: { [k: string]: unknown }) {
    const template = resolve(__dirname, '..', '..', '..', 'src', 'config', 'adapters', `templates/${templateName}.mjml`);
    const compileTemplate = hbs.compile(fs.readFileSync(template, 'utf-8'));

    const html = mjml2html(compileTemplate(data), {
      filePath: resolve(__dirname, '..', '..', '..', 'src', 'config', 'adapters', 'templates'),
    }).html;

    return html;
  }
}

export default EmailAdapter;
