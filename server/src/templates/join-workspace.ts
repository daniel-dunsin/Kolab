import settings from "../constants/settings";
import { IUser } from "../interfaces/models/user.interface";
import { IWorkspace } from "../interfaces/models/workspace.interface";

export const joinWorkspaceHTML = (
  name: string,
  workspace: IWorkspace,
  link: string
) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Join Workspace</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;1,200&display=swap"
          rel="stylesheet"
        />
        <style>
          /* Reset some default styles for better email rendering */
          body,
          p {
            margin: 0;
            padding: 0;
          }
          body {
            background-color: #f5f5f5;
          }
          * {
            margin: 0;
            padding: 0;
            font-family: "Poppins", sans-serif;
          }
          .container {
            width: 100vw;
            max-width: 800px;
            margin: 0 auto;
            padding: 1rem;
          }
          h1 {
            margin-bottom: 1rem;
            color: #333;
          }
          h2 {
            margin-bottom: 1rem;
            color: #333;
          }
          h2 + p {
            color: #333;
            font-size: 1rem;
            margin-bottom: 0.4rem;
          }
          h2 + p + p + p {
            margin: 0.4rem 0;
          }
    
          button {
            background-color: #2073fa;
            color: white;
            border-radius: 20px;
            outline: none;
            border: none;
            padding: 10px 1rem;
            margin-top: 1rem;
            cursor: pointer;
            font-weight: bold;
          }
    
          button:hover {
            transform: scale(0.98);
          }
    
          i {
            display: block;
            margin-top: 0.6rem;
          }
        </style>
      </head>
      <body>
        <section class="container">
          <h1>Workspace Invite</h1>
          <h2>Hello there${name ? `, ${name} ` : " "}👋🏼</h2>
          <p>
            You have been invited by ${
              (workspace.director as IUser).firstName
            } to join ${workspace.name}'s Workspace on
            <b>Kolab</b>.
          </p>
          <p>
            <b>Workspace description:</b> ${workspace.description}
          </p>
          <p>If you do not have an account, create one at ${
            settings.frontendUrl + "/signup"
          } and join the workspace by clicking the button below</p>
          
          <i>P.S: you cannot join the workspace without first creating your account</i>

          <a href="${link}">
            <button>Join Workspace</button>
          </a>
    
          <i>Kindly ignore this invite if you do not wish to join</i>
        </section>
      </body>
    </html>
    `;
};
