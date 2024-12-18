import fetchMember from "@/api/group/fetchMember";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";

const getMemberQuery = (groupId: number) => {
  return useQuery({
    queryKey: [queryKeys.getMember, groupId],
    queryFn: () => fetchMember(groupId),
  });
};
export default getMemberQuery;
