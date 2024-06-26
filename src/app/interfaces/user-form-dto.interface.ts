import {Roles} from "../types/roles.type";

export interface UserFormDto {
  username: string;
  password: string;
  fullName: string;
  role: Roles | null;
}
