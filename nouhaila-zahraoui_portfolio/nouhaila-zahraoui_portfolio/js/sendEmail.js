const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import cors
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to send email
app.post("/send-email", (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).send("All fields are required.");
    }
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nouhaila98.zahraoui@gmail.com", // Replace with your Gmail address
            pass: "Azerty@@123456"      // Replace with your app-specific password
        }
    });

    // Email options
    const mailOptions = {
        from: "nouhaila98.zahraoui@gmail.com", // The actual sender's authenticated email
        to: "zehraoui.1998@gmail.com",     // Replace with the recipient’s email
        subject: `${subject} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        replyTo: email // Sets the user's email for replies
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
