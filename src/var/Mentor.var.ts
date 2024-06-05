import { Department } from "./Departement.enum";
import { Member } from "./Member.var";

export interface Mentor {
  id: string;
  name: string;
  departement: Department;
  members?: Member[]
  createdAt: Date
  updatedAt: Date
}