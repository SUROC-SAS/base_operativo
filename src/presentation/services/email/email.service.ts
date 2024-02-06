import fs from 'fs';
import hbs from 'handlebars';
import Mail from 'nodemailer/lib/mailer';
import mjml2html from 'mjml';
import { resolve } from 'path';
import { MailService } from '#/domain/interfaces/services/email.service';
import nodemailer, { SendMailOptions } from 'nodemailer';
import { envs } from '#/config';

interface OptionsEmail {
  host: string;
  user: string;
  pass: string;
  port: number;
}

const { FRONTEND_URL: DOMAIN_FRONTEND } = envs;

class EmailService implements MailService {
  private readonly _transport: Mail;
  private _fromEmail = process.env.EMAIL_ADMIN;

  constructor({ host, user, pass, port }: OptionsEmail) {
    this._transport = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
  }

  resetLink(): string {
    return `${DOMAIN_FRONTEND}/auth/confirm`;
  }

  prepareHtml(templateName: string, data: { [k: string]: unknown }) {
    const template = resolve(__dirname, '..', '..', '..', '..', 'src', 'presentation', 'services', 'email', `templates/${templateName}.mjml`);
    const filePath = resolve(__dirname, '..', '..', '..', '..', 'src', 'presentation', 'services', 'email', 'templates');
    const compileTemplate = hbs.compile(fs.readFileSync(template, 'utf-8'));
    return mjml2html(compileTemplate(data), { filePath }).html;
  }

  async sendEmail(subject: string, recipients: string | string[], html: string) {
    const mailOptions: SendMailOptions = {
      from: this._fromEmail,
      to: recipients.toString(),
      subject,
      html,
    };

    const sendEmail = await this._transport.sendMail(mailOptions);
    console.log('Message sent: %s', sendEmail.messageId);
  }
}

export default EmailService;