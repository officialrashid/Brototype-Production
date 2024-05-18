import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

// Create a transporter
const transporter: Transporter = nodemailer.createTransport({
  service: "gmail", // or your email service provider
  auth: {
    user: process.env.NODEMAILER_GMAIL,
    pass: process.env.NODEMAILER_PASS, // Replace with your App Password
  },
});

// Define a function to send an email with HTML content
export function sendEmail(subject: string, Content: string, to: string): void {
  const mailOptions: SendMailOptions = {
    from: process.env.NODEMAILER_GMAIL,
    to: to,
    subject: subject,
    html: Content, // Use HTML content
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
}

// Example usage with an HTML email template


// Call the function with the HTML email content

