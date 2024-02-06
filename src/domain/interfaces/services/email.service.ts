export interface MailService {
  resetLink(): string;
  sendEmail(subject: string, recipients: string | string[], html: string): Promise<void>;
  prepareHtml(templateName: string, data: Record<string, unknown>): string;
}
