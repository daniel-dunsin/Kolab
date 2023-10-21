import settings from "../constants/settings";
import { IUser } from "../interfaces/models/user.interface";

export const verifyEmailHtml = (
  { firstName }: Partial<IUser>,
  token: string
) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;1,200&display=swap" rel="stylesheet">
        <style>
        
            /* Reset some default styles for better email rendering */
            body, p {
                margin: 0;
                padding: 0;
            }
            * {
                font-family: "Poppins", san-serif;
            }
    
            /* Center the content */
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background-color: #f5f5f5;
            }
    
            .email-content {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333;
            }
    
            p {
                color: #666;
                font-size: 16px;
            }
    
            .verification-link {
                display: inline-block;
                margin-top: 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                margin-bottom: 20px;
                border-radius: 5px;
            }
    
            /* Media queries for responsiveness */
            @media (max-width: 768px) {
                .email-content {
                    width: 90%;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="email-content">
                <h1>Email Verification</h1>
                <p>Hey ${firstName}, thank you for signing up! To complete your registration, please click the verification link below:</p>
                <a href="${settings.frontendUrl}/verify-account/${token}" class="verification-link">Verify Your Email</a>
                <p>If you did not create an account, you can ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
