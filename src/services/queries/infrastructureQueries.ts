import { useQuery } from "@tanstack/react-query";
import { dataClient } from "../base/api/apiClient";
import { infrastructureEndpoints } from "../endpoints";

export const useFetchDataBarChart = () => {
  return useQuery({
    queryKey: ["barChart"],
    queryFn: () =>
      dataClient()
        .get(infrastructureEndpoints.barChart)
        .then((res) => {
          return res.data.data;
        }),
  });
};
