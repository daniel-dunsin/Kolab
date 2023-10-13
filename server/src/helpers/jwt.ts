import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import settings from "../constants/settings";
import { decode } from "punycode";

class JWT {
  private readonly decodeSecret = (): string => {
    return Buffer.from(settings.accessTokenSecret).toString("ascii");
  };

  public sign = async (userId: string | Types.ObjectId): Promise<string> => {
    const token = await jwt.sign({ userId }, this.decodeSecret(), {
      expiresIn: "30d",
    });

    return token;
  };

  public verify = async <T>(token: string): Promise<T> => {
    const decoded = await jwt.verify(token, this.decodeSecret());

    return decoded as T;
  };
}

const JwtHelper = new JWT();

export default JwtHelper;
