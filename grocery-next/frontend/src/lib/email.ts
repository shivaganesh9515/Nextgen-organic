import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email templates
export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to OrganicNext',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to OrganicNext! 🌱</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for joining OrganicNext, your trusted marketplace for fresh organic products!</p>
            <p>We're excited to have you as part of our community. Here's what you can do:</p>
            <ul>
              <li>Browse products from 100+ certified organic vendors</li>
              <li>Get doorstep delivery of fresh produce</li>
              <li>Track your orders in real-time</li>
              <li>Submit bulk order requests for wholesale pricing</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/shop" class="button">Start Shopping</a>
            <p>If you have any questions, feel free to reach out to our support team.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 OrganicNext. All rights reserved.</p>
            <p>Fresh Organic Products, Delivered to Your Doorstep</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  orderConfirmation: (orderNumber: string, customerName: string, total: number, items: { product: { name: string }; quantity: number; total: number }[]) => ({
    subject: `Order Confirmation - ${orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; }
          .order-summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { border-bottom: 1px solid #e5e7eb; padding: 10px 0; display: flex; justify-content: space-between; }
          .total { font-size: 20px; font-weight: bold; color: #10b981; margin-top: 15px; text-align: right; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed! ✅</h1>
          </div>
          <div class="content">
            <h2>Hi ${customerName},</h2>
            <p>Thank you for your order! Your organic goodies are being prepared.</p>
            <div class="order-summary">
              <h3>Order #${orderNumber}</h3>
              <div class="items">
                ${items.map(item => `
                  <div class="item">
                    <span>${item.product.name} x ${item.quantity}</span>
                    <span>₹${item.total.toFixed(2)}</span>
                  </div>
                `).join('')}
              </div>
              <div class="total">Total: ₹${total.toFixed(2)}</div>
            </div>
            <p>We'll notify you when your order is on its way!</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/orders/${orderNumber}" class="button">Track Order</a>
          </div>
          <div class="footer">
            <p>&copy; 2025 OrganicNext. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  vendorApproval: (businessName: string, ownerName: string) => ({
    subject: 'Your Vendor Application Has Been Approved! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .tips { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Congratulations! 🎉</h1>
          </div>
          <div class="content">
            <h2>Hi ${ownerName},</h2>
            <p>Great news! Your vendor application for <strong>${businessName}</strong> has been approved.</p>
            <p>You can now start listing your organic products and reaching thousands of customers.</p>
            <div class="tips">
              <h3>Getting Started Tips:</h3>
              <ul>
                <li>Add high-quality photos of your products</li>
                <li>Provide detailed descriptions and certifications</li>
                <li>Set competitive prices</li>
                <li>Respond to customer inquiries promptly</li>
                <li>Keep your inventory updated</li>
              </ul>
            </div>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/vendor/dashboard" class="button">Go to Vendor Dashboard</a>
            <p>If you need any assistance, our vendor support team is here to help.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 OrganicNext. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

// Send email function
export async function sendEmail(to: string, template: { subject: string; html: string }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: template.subject,
      html: template.html,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}