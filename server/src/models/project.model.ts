import mongoose, { Types } from 'mongoose';
import { IProject } from '../interfaces/models/project.interface';
import { Collections } from '../constants/collections';

const ProjectSchema = new mongoose.Schema<IProject>(
  {
    name: { type: String, required: true },
    workspaceId: { type: Types.ObjectId, ref: Collections.workspaces, required: true },
  },
  { timestamps: true, virtuals: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProjectSchema.virtual('timeSpent').get(() => {
  // get the issues with this project and the time spent on those isses
  return 10;
});

const Project = mongoose.model(Collections.project, ProjectSchema);
export default Project;
