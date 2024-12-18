import fetchUpcomming from "@/api/main/upComming";
import { queryKeys } from "@/constants/querykeys";
import { useSuspenseQuery } from "@tanstack/react-query";
interface upCommingResponse {
  0: {
    destination: string;
    background_url: string;
    date: string;
    group_name: string;
    group_thumbnail: any;
    trip_id: number;
  };
}
const upCommingQuery = () => {
  return useSuspenseQuery<upCommingResponse, Error>({
    queryKey: queryKeys.upcomming,
    queryFn: fetchUpcomming,
  });
};
export default upCommingQuery;
