import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../clients/apiClient";
import { infrastructureEndpoints } from "../endpoints";

export const useFetchDataBarChart = () => {
  return useQuery({
    queryKey: ['barChart'],
    queryFn: () => apiClient.get(infrastructureEndpoints.barChart).then((res) => res.data),
  });
};