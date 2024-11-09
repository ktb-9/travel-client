import axios from "axios";
interface upCommingResponse {
  data: {
    destination: string;
    thumbnail: any;
    day: string;
    nickname: string;
    groupThumbnail: any;
  };
}
const fetchUpcomming = async () => {
  const { data } = await axios.get<upCommingResponse>("/api/upcomming");
  return data;
};
export default fetchUpcomming;
