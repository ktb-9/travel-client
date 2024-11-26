import { atom } from "recoil";

export interface Member {
  user_id: string;
  nickname: string;
  profileImage: string;
  role: string;
}

export const groupMembersState = atom<Member[]>({
  key: "groupMembersState",
  default: [],
});
