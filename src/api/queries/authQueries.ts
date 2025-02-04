import { useMutation, useQuery } from "@tanstack/react-query"
import { apiClient } from "../clients/apiClient"
import { authEndpoints } from "../endpoints"

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: { email: string, password: string }) => 
      apiClient.post(authEndpoints.login, credentials)
  });
};

export const useFetchData = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => apiClient.get(`/users/${userId}`).then((res) => res.data)
  });
};

