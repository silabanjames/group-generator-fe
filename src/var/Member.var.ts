import { Mentor } from "@/app/admin/(content)/mentor/columns";
import { Department } from "./Departement.enum";

export interface Member {
  id: string;
  name: string;
  departement: Department;
  year: number;
  mentor?: Mentor;
}
