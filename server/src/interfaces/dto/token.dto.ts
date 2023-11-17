import { ITokenTypes } from '../models/user.interface';

export interface CreateTokenDTO {
  email: string;
  value?: string;
  tokenType: ITokenTypes;
}
