import sendMail from '../helpers/mailer';
import { EmailMemberDTO } from '../interfaces/dto/members.dto.';
import { IUser } from '../interfaces/models/user.interface';
import { IWorkspaceMember } from '../interfaces/models/workspace-member.interface';
import User from '../models/user.model';
import WorkspaceMember from '../models/workspace-member.model';

const getMembers = async (userId: string, workspaceId: string): Promise<IWorkspaceMember[]> => {
  return WorkspaceMember.find({ userId: { $ne: userId }, workspaceId }).populate('userId');
};

const emailMember = async (data: EmailMemberDTO): Promise<void> => {
  const user = <IUser>await User.findById(data.userId);
  await sendMail({
    from: user.email,
    to: data.email,
    subject: data.subject,
    text: data.message,
  });
};

const membersService = {
  getMembers,
  emailMember,
};

export default membersService;
