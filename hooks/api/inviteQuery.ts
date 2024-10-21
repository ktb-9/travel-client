import fetchInvite from "@/api/mockApi/invite/getInvite";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const inviteQuery = () => {
  return useQuery({
    queryKey: queryKeys.getInvite,
    queryFn: fetchInvite,
  });
};
export default inviteQuery;
