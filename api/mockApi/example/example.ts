import axios from "axios";

export interface ExampleResponse {
  message: string;
}
const fetchExample = async () => {
  const { data } = await axios.get<ExampleResponse>("/api/example");
  return data;
};
export default fetchExample;
