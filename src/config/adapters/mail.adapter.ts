import fs from 'fs';
import hbs from 'handlebars';
import mjml2html from 'mjml';
import { resolve } from 'path';
import Mail from 'nodemailer/lib/mailer';
import nodemailer, { SendMailOptions } from 'nodemailer';

interface OptionsEmail {
  host: string;
  user: string;
  pass: string;
  port: number;
}

class EmailAdapter {
  private readonly _transport: Mail;
  private _fromEmail = process.env.EMAIL_ADMIN;

  constructor({ host, user, pass, port }: OptionsEmail) {
    this._transport = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass,
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
