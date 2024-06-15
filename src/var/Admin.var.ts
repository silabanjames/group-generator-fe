import { User } from "./User.enum";

export interface Admin {
  id: string;
  email: string;
  role: User;
}
