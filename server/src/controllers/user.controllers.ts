import { NextFunction, Request, Response } from 'express';
import { EditProfileDTO } from '../interfaces/dto/auth.dto';
import userService from '../services/user.service';

const editProfile = async (req: Request<{}, {}, EditProfileDTO>, res: Response, next: NextFunction) => {
  const { firstName, lastName, profilePicture } = req.body;
  const userId = <string>req.userId;

  try {
    const data = await userService.editUser({ firstName, lastName, profilePicture, _id: userId });

    res.status(200).json({ message: 'Profile edited successfully', data });
  } catch (error) {
    return next(error);
  }
};

const userController = {
  editProfile,
};

export default userController;
