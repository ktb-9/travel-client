import fetchGroup from "@/api/group/fetchGroup";
import { queryKeys } from "@/constants/querykeys";
import { useMutation, useQuery } from "@tanstack/react-query";

const getGroupQuery = (groupId: number) => {
  return useQuery({
    queryKey: queryKeys.getGroup,
    queryFn: () => fetchGroup(groupId),
  });
};
export default getGroupQuery;
