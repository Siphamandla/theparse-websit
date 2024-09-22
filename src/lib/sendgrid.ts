import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!); // Ensure API key is set, using TypeScript's non-null assertion

// Function to send email using SendGrid
async function sendEmail({
  to,
  cc = "",
  bcc = "",
  dynamicTemplateData,
  templateId
}: {
  to: string;
  cc?: string | string[]; // Can be a string or an array of strings
  bcc?: string | string[]; // Can be a string or an array of strings
  dynamicTemplateData: any;
  templateId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // Ensure the Admin Email is set in environment variables
    if (!process.env.ADMIN_EMAIL) {
      throw new Error("Admin Email must be set as env var ADMIN_EMAIL");
    }

    // Send the email using SendGrid
    await sendgrid.send({
      from: process.env.ADMIN_EMAIL, // Your website's verified email
      replyTo: process.env.ADMIN_EMAIL, // Reply to the admin email or adjust as needed
      personalizations: [
        {
          to,
          cc: cc ? cc : undefined, // Only include if cc is provided
          bcc: bcc ? bcc : undefined, // Only include if bcc is provided
          dynamicTemplateData: {
            ...dynamicTemplateData, // Spread the template data
          },
        },
      ],
      templateId, // The template ID from SendGrid
    });

    return { success: true, message: "Email Sent" };
  } catch (error: any) {
    console.error("Error sending email:", error); // Log error for debugging
    return { success: false, message: error.message };
  }
}

export default sendEmail;