import axios from "axios";

const fetchHotplace = async () => {
  const { data } = await axios.get("/api/hotplace");
  return data;
};
export default fetchHotplace;
