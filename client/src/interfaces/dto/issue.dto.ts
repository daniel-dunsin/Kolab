export interface CreateIssueDTO {
  userId: string;
  projectId: string;
  attachments: File[] | string[];
  description: string;
  title: string;
}
