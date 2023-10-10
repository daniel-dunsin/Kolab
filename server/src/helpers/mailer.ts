import nodemailer from "nodemailer";
import settings from "../constants/settings";
import { MailOptions } from "nodemailer/lib/json-transport";
import { BadRequestError } from "../constants/errors";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: settings.nodemailer,
});

const sendMail = async (options: MailOptions) => {
  try {
    await transporter.sendMail({
      from: settings.nodemailer.user,
      ...options,
    });
  } catch (error: any) {
    throw new BadRequestError(error);
  }
};

export default sendMail;
