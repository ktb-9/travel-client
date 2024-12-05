import fetchUpcomming from "@/api/mockApi/main/upComming";
import { queryKeys } from "@/constants/querykeys";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
interface upCommingResponse {
  data: {
    destination: string;
    thumbnail: any;
    day: string;
    nickname: string;
    groupThumbnail: any;
  };
}
const upCommingQuery = () => {
  return useSuspenseQuery<upCommingResponse, Error>({
    queryKey: queryKeys.upcomming,
    queryFn: fetchUpcomming,
  });
};
export default upCommingQuery;
