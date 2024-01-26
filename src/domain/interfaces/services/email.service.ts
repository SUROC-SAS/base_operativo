export interface MailService {
  sendEmail(subject: string, recipients: string[], html: string): Promise<void>;
  prepareHtml(templateName: string, data: { [k: string]: unknown }): string;
}
