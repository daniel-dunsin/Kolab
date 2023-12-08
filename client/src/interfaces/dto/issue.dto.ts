import { IssueStatus } from '../issues.interface';

export interface CreateIssueDTO {
  userId: string;
  projectId: string;
  attachments: File[] | string[];
  description: string;
  title: string;
}

export interface EditIssueStatusDTO {
  id: string;
  status: IssueStatus;
}
