import { NextFunction, Request, Response } from 'express';
import membersService from '../services/workspace-membetrs.service';
import { EmailMemberDTO } from '../interfaces/dto/members.dto.';

const getMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workspaceId = req.params.id;

    const data = await membersService.getMembers(<string>req.userId, workspaceId);

    res.status(200).json({ message: 'Members fetched successfully', data });
  } catch (error) {
    return next(error);
  }
};

const emailMember = async (req: Request<{}, {}, EmailMemberDTO>, res: Response, next: NextFunction) => {
  try {
    const { email, subject, message } = req.body;

    await membersService.emailMember({ email, subject, message, userId: <string>req.userId });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    return next(error);
  }
};

const memberControllers = { getMembers, emailMember };

export default memberControllers;
