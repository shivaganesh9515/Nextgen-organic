// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export async function sendEmail(to: string, subject: string, html: string) {
//   try {
//     const msg = {
//       to,
//       from: process.env.SENDGRID_FROM_EMAIL!,
//       subject,
//       html,
//     };
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// }

// For now, just log the email
export async function sendEmail(to: string, subject: string, html: string) {
  console.log('Email would be sent here:');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('HTML:', html);
}