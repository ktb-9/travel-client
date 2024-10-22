import fetchExample from "@/api/mockApi/example/example";
import { queryKeys } from "@/constants/querykeys";
import { useQuery } from "@tanstack/react-query";
export interface ExampleResponse {
  message: string;
}
const exampleQuery = () => {
  return useQuery<ExampleResponse, Error>({
    queryKey: queryKeys.example,
    queryFn: fetchExample,
  });
};
export default exampleQuery;
