import nodemailer from 'nodemailer';

const sendInvoice = async (orderData) => {
    try {
        // Configure transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const userEmail = orderData.address.email;
        if (!userEmail) {
            console.error("Invoice Error: No user email found in order address.");
            return;
        }

        // Generate Item Rows for the HTML
        const itemRows = orderData.items.map(item => `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eeeeee;">
                    <strong>${item.name}</strong><br/>
                    <span style="color: #666; font-size: 12px;">Size: ${item.size}</span>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eeeeee; text-align: center;">${item.quantity}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eeeeee; text-align: right;">₹${item.price}</td>
            </tr>
        `).join('');

        const orderDate = new Date(orderData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        // Ensure discount calculations match checkout
        // Our cart minus 100 discount logic was applied to the total amount.
        const originalAmount = orderData.amount + 100;
        const finalAmount = orderData.amount;

        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <div style="text-align: center; padding: 20px 0;">
                <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px;">OFFSIDE</h1>
                <p style="color: #666; font-size: 14px; margin-top: 5px;">Minimal. Timeless. Unapologetic.</p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                <h2 style="margin-top: 0;">Order Confirmation</h2>
                <p>Hello ${orderData.address.firstName},</p>
                <p>Thank you for your order! We've received it and it is currently being processed. Below is your invoice and order summary.</p>
                
                <table style="width: 100%; margin-top: 20px; font-size: 14px;">
                    <tr>
                        <td><strong>Order ID:</strong> ${orderData._id || 'N/A'}</td>
                        <td style="text-align: right;"><strong>Date:</strong> ${orderDate}</td>
                    </tr>
                    <tr>
                        <td><strong>Payment Method:</strong> ${orderData.paymentMethod}</td>
                        <td style="text-align: right;"><strong>Status:</strong> ${orderData.status}</td>
                    </tr>
                </table>
            </div>

            <h3 style="margin-top: 30px; border-bottom: 2px solid #333; padding-bottom: 10px;">Items Ordered</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <thead>
                    <tr style="background-color: #f9f9f9;">
                        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                        <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                        <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemRows}
                </tbody>
            </table>

            <div style="margin-top: 20px; width: 100%; display: flex; justify-content: flex-end;">
                <table style="width: 250px; font-size: 14px; margin-left: auto;">
                    <tr>
                        <td style="padding: 5px 0; color: #666;">Subtotal:</td>
                        <td style="padding: 5px 0; text-align: right;">₹${originalAmount}</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 0; color: #666;">Member Savings:</td>
                        <td style="padding: 5px 0; text-align: right; color: green;">- ₹100</td>
                    </tr>
                    <tr>
                        <td style="padding: 5px 0; color: #666;">Shipping:</td>
                        <td style="padding: 5px 0; text-align: right; color: green;">Free</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; font-weight: bold; font-size: 16px; border-top: 1px solid #ddd;">Total:</td>
                        <td style="padding: 10px 0; font-weight: bold; font-size: 16px; text-align: right; border-top: 1px solid #ddd;">₹${finalAmount}</td>
                    </tr>
                </table>
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                <h4 style="margin: 0 0 10px 0;">Shipping Address:</h4>
                <p style="margin: 0;">${orderData.address.firstName} ${orderData.address.lastName}</p>
                <p style="margin: 0;">${orderData.address.street}</p>
                <p style="margin: 0;">${orderData.address.city}, ${orderData.address.state} ${orderData.address.zipcode}</p>
                <p style="margin: 0;">${orderData.address.country}</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
                <p>If you have any questions about your order, simply reply to this email.</p>
                <p>&copy; ${new Date().getFullYear()} OFFSIDE. All rights reserved.</p>
            </div>
        </div>
        `;

        const mailOptions = {
            from: `"OFFSIDE Store" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Invoice for your OFFSIDE Order #${(orderData._id || '').toString().slice(-8)}`,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Invoice email sent successfully to ${userEmail}: ${info.messageId}`);
    } catch (error) {
        console.error("Failed to send invoice email:", error);
    }
}

export default sendInvoice;
