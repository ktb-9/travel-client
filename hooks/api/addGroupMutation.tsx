import postGroup from "@/api/group/postGroup";
import groupHostState from "@/recoil/groupHostState";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

const addGroupMutation = () => {
  const [, setGroupHost] = useRecoilState(groupHostState);
  return useMutation({
    mutationFn: postGroup,
    onSuccess: (data) => {
      setGroupHost(data);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default addGroupMutation;
