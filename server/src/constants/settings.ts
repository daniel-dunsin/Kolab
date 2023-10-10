import { config } from "dotenv";

config();

const settings = {
  mongodbUrl: <string>process.env.MONGO_DB_URL,
  port: <string>process.env.PORT || 3001,
  accessTokenSecret: <string>process.env.ACCESS_TOKEN_SECRET,
  nodemailer: {
    user: <string>process.env.NODEMAILER_USER,
    pass: <string>process.env.NODEMAILER_PASS,
  },
  frontendUrl: <string>process.env.FRONTEND_URL,
};

export default settings;
