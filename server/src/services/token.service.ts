import { BadRequestError, NotFoundError } from '../constants/errors';
import { CreateTokenDTO } from '../interfaces/dto/token.dto';
import { ITokenTypes, IToken } from '../interfaces/models/user.interface';
import Token from '../models/token.model';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

const createToken = async (data: CreateTokenDTO): Promise<IToken> => {
  const tokenInDb = await Token.findOne({ email: data.email, tokenType: data.tokenType });

  if (tokenInDb) {
    throw new BadRequestError('Token already exists');
  }

  return await Token.create({ ...data });
};

const findToken = async (query: FilterQuery<IToken>): Promise<IToken | null> => {
  const tokenInDb = await Token.findOne(query);

  return tokenInDb;
};

const updateToken = async (query: FilterQuery<IToken>, update: UpdateQuery<IToken>): Promise<IToken> => {
  const token = await Token.findOneAndUpdate(query, update, {
    new: true,
    runValidators: true,
  });

  if (!token) throw new NotFoundError('Token does not exist');

  return token;
};

const deleteToken = async (query: FilterQuery<IToken>) => {
  const token = await Token.findOne(query);

  if (!token) throw new NotFoundError('token does not exist');

  await token.deleteOne();
};

const tokenService = { createToken, updateToken, deleteToken, findToken };

export default tokenService;
