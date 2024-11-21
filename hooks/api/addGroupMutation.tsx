import postGroup from "@/api/group/postGroup";
import groupHostState from "@/recoil/groupHostState";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useRecoilState } from "recoil";

const addGroupMutation = () => {
  const router = useRouter();
  const [, setGroupHost] = useRecoilState(groupHostState);
  return useMutation({
    mutationFn: postGroup,
    onSuccess: (data) => {
      setGroupHost(data);
      router.push(`/group/join/${data.group_id}`);
    },
    onError: (error) => {
      alert(error);
    },
  });
};
export default addGroupMutation;
