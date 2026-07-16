import { UserDto } from "../../dto/UserDto";

export interface IsFollowerRequest {
  token: string;
  user: UserDto;
  selectedUser: UserDto;
}
