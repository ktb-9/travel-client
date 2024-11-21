import { atom } from "recoil";
interface authType {
  id: number;
  nickname: string;
  profileImage: string;
}
const authState = atom<authType>({
  key: "authState",
  default: { id: 0, nickname: "", profileImage: "" },
});
export default authState;
