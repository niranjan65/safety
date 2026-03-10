import nodemailer from 'nodemailer'

function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })
}

/**
 * Build a beautiful HTML email for a quote request
 */
function buildQuoteEmailHTML({ customerName, email, phone, productName, productSlug, quantity, size, message }) {
    const productUrl = `https://www.sardasafetyindustries.com/product/${productSlug || '#'}`
    const date = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata' })

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#0d0d0f; font-family:'Segoe UI',Roboto,Arial,sans-serif; color:#ffffff;">
    <div style="max-width:600px; margin:0 auto; background-color:#111113;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #F5C518 0%, #E8930C 100%); padding:32px 40px; text-align:center;">
            <h1 style="margin:0; font-size:24px; font-weight:800; color:#111; letter-spacing:0.5px;">
                🛡️ SARDA SAFETY INDUSTRIES
            </h1>
            <p style="margin:8px 0 0; font-size:13px; color:#333; font-weight:600; letter-spacing:2px; text-transform:uppercase;">
                New Quotation Request Received
            </p>
        </div>

        <!-- Badge -->
        <div style="text-align:center; padding:24px 0 8px;">
            <span style="display:inline-block; background:#F5C518; color:#111; font-size:11px; font-weight:700; padding:6px 16px; border-radius:20px; letter-spacing:1.5px; text-transform:uppercase;">
                📋 RFQ #${Date.now().toString(36).toUpperCase()}
            </span>
        </div>

        <!-- Product Details Card -->
        <div style="margin:16px 24px; background:#1a1a1e; border:1px solid #2a2a30; border-radius:16px; overflow:hidden;">
            <div style="padding:20px 24px; border-bottom:1px solid #2a2a30;">
                <h2 style="margin:0 0 4px; font-size:18px; font-weight:700; color:#F5C518;">
                    📦 Product Details
                </h2>
            </div>
            <table style="width:100%; border-collapse:collapse;">
                <tr>
                    <td style="padding:14px 24px; font-size:13px; color:#888; font-weight:600; width:140px; border-bottom:1px solid #222226;">Product</td>
                    <td style="padding:14px 24px; font-size:14px; color:#fff; font-weight:600; border-bottom:1px solid #222226;">
                        ${productName}
                    </td>
                </tr>
                ${size ? `
                <tr>
                    <td style="padding:14px 24px; font-size:13px; color:#888; font-weight:600; border-bottom:1px solid #222226;">Size</td>
                    <td style="padding:14px 24px; font-size:14px; color:#fff; border-bottom:1px solid #222226;">${size}</td>
                </tr>` : ''}
                ${quantity ? `
                <tr>
                    <td style="padding:14px 24px; font-size:13px; color:#888; font-weight:600; border-bottom:1px solid #222226;">Quantity</td>
                    <td style="padding:14px 24px; font-size:14px; color:#fff; border-bottom:1px solid #222226;">${quantity}</td>
                </tr>` : ''}
                <tr>
                    <td style="padding:14px 24px; font-size:13px; color:#888; font-weight:600;">Product Link</td>
                    <td style="padding:14px 24px;">
                        <a href="${productUrl}" style="font-size:13px; color:#F5C518; text-decoration:none; font-weight:600;">View Product →</a>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Customer Details Card -->
        <div style="margin:16px 24px; background:#1a1a1e; border:1px solid #2a2a30; border-radius:16px; overflow:hidden;">
            <div style="padding:20px 24px; border-bottom:1px solid #2a2a30;">
                <h2 style="margin:0 0 4px; font-size:18px; font-weight:700; color:#F5C518;">
                    👤 Customer Details
                </h2>
            </div>
            <table style="width:100%; border-collapse:collapse;">
                <tr>
                    <td style="padding:14px 24px; font-size:13px; color:#888; font-weight:600; width:140px; border-bottom:1px solid #222226;">Name</td>
                    <td style="padding:14px 24px; font-size:14px; color:#fff; font-weight:600; border-bottom:1px solid #222226;">${customerName}</td>
                </tr>
                <tr>
                    <td style="padding:14px 24px; font-size:13px; color:#888; font-weight:600; border-bottom:1px solid #222226;">Email</td>
                    <td style="padding:14px 24px; font-size:14px; color:#fff; border-bottom:1px solid #222226;">
                        <a href="mailto:${email}" style="color:#F5C518; text-decoration:none;">${email}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding:14px 24px; font-size:13px; color:#888; font-weight:600; border-bottom:1px solid #222226;">Phone</td>
                    <td style="padding:14px 24px; font-size:14px; color:#fff; border-bottom:1px solid #222226;">
                        <a href="tel:${phone}" style="color:#F5C518; text-decoration:none;">${phone}</a>
                    </td>
                </tr>
                ${message ? `
                <tr>
                    <td style="padding:14px 24px; font-size:13px; color:#888; font-weight:600; vertical-align:top;">Message</td>
                    <td style="padding:14px 24px; font-size:14px; color:#ccc; line-height:1.6;">${message}</td>
                </tr>` : ''}
            </table>
        </div>

        <!-- CTA Button -->
        <div style="text-align:center; padding:20px 24px;">
            <a href="mailto:${email}?subject=Re: Quotation for ${encodeURIComponent(productName)}" 
               style="display:inline-block; background:linear-gradient(135deg, #F5C518 0%, #E8930C 100%); color:#111; font-size:14px; font-weight:700; padding:14px 36px; border-radius:50px; text-decoration:none; letter-spacing:0.3px;">
                Reply to Customer →
            </a>
        </div>

        <!-- Footer -->
        <div style="padding:24px 32px; border-top:1px solid #222226; text-align:center;">
            <p style="margin:0 0 6px; font-size:12px; color:#555; line-height:1.6;">
                Generated on ${date} | Sarda Safety Industries
            </p>
            <p style="margin:0; font-size:11px; color:#444;">
                <a href="https://www.sardasafetyindustries.com" style="color:#F5C518; text-decoration:none;">www.sardasafetyindustries.com</a>
            </p>
        </div>

    </div>
</body>
</html>`
}

/**
 * Send a quote request email notification
 */
export async function sendQuoteEmail(quoteData) {
    const recipientEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('⚠️ SMTP credentials not configured. SMTP_USER:', !!process.env.SMTP_USER, 'SMTP_PASS:', !!process.env.SMTP_PASS)
        return false
    }

    const transporter = createTransporter()

    const mailOptions = {
        from: `"Sarda Safety Industries" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        subject: `📋 New RFQ: ${quoteData.productName} — ${quoteData.customerName}`,
        html: buildQuoteEmailHTML(quoteData),
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('✅ Quote notification email sent:', info.messageId)
        return true
    } catch (error) {
        console.error('❌ Failed to send quote email:', error.message)
        console.error('Full error:', JSON.stringify(error, null, 2))
        return false
    }
}
