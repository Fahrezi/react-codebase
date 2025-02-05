import { useMutation, useQuery } from "@tanstack/react-query"
import { apiClient } from "../clients/apiClient"
import { authEndpoints } from "../endpoints"
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

type LoginData = { email: string; password: string };
type LoginResponse = { token: string };
type ErrorResponse = { message: string };

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginData>({
    mutationFn: (credentials: LoginData) => 
      apiClient.post(authEndpoints.login, credentials),
    onSuccess: () => {
      console.log('halo');
      navigate('/dashboard');
    }
  })

  return {
    ...mutation,
    errorMessage: mutation.error?.response?.data?.message || '',
  }
};

export const useFetchData = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => apiClient.get(`/users/${userId}`).then((res) => res.data)
  });
};

