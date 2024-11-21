



import emailjs from "emailjs-com";

const sendEmail = async ({ sendTo, subject}) => {
  try {
    // Initialize EmailJS
    emailjs.init(process.env.YOUR_USER_ID);

    // Prepare email parameters
    const templateParams = {
      from_name: "onlypipe <noreply@amitprajapati.co.in>",
      to_name: sendTo,
      message: subject,
      reply_to: "admin@example.com",
    };

    // Send email
    const response = await emailjs.send(
      process.env.YOUR_SERVICE_ID,
      process.env.YOUR_TEMPLATE_ID,
      templateParams
    );

    console.log("Email sent successfully!", response.status, response.text);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export default sendEmail;
