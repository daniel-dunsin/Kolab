export interface CreateIssueDTO {
  title: string;
  description: string;
  attachments: string[];
  assignedBy: string;
  userId: string;
  projectId: string;
}
