import axios from "axios";
import { axiosInstance } from "../axiosinstance";
import { END_POINTS } from "@/constants/api";
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
const fetchUpcomming = async () => {
  const { data } = await axiosInstance.get<upCommingResponse>(
    END_POINTS.GETUPCOMMING
  );
  return data;
};
export default fetchUpcomming;
