import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../base/api/apiClient";
import { authUsers } from "../endpoints";

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      apiClient()
        .get(authUsers.users)
        .then((res) => res.data),
  });
};
