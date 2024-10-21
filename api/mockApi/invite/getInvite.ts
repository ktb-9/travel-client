import axios from "axios";

const fetchInvite = async () => {
  const { data } = await axios.get("/api/invite");
  return data;
};
export default fetchInvite;
