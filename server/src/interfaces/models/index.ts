import mongoose from 'mongoose';

export type Relations<Model = any> = string | mongoose.Types.ObjectId | Model;
