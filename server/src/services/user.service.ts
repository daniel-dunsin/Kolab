import { NotFoundError } from '../constants/errors';
import { EditProfileDTO } from '../interfaces/dto/auth.dto';
import { IUser } from '../interfaces/models/user.interface';
import User from '../models/user.model';

const editUser = async (data: EditProfileDTO): Promise<IUser> => {
  const user = await User.findById(data._id);

  if (!user) throw new NotFoundError('User does not eixst');

  user.firstName = data.firstName || user.firstName;
  user.lastName = data.lastName || user.lastName;
  user.profilePicture = data.profilePicture || user.profilePicture;

  return await user.save();
};

const userService = {
  editUser,
};

export default userService;
