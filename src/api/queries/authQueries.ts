import { useMutation, useQuery } from "@tanstack/react-query";
// import { apiClient } from "../clients/apiClient"
// import { authEndpoints } from "../endpoints"
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { setLocalStorage } from "src/utils/storage";
import { authEndpoints } from "src/services/endpoints";
import { apiClient } from "src/services/base/api/apiClient";

type LoginData = { email: string; password: string };
type LoginResponse = {
  data: {
    accessToken: string;
  };
};
type ErrorResponse = { message: string };

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginData
  >({
    mutationFn: (credentials: LoginData) =>
      apiClient().post(authEndpoints.login, credentials),
    onSuccess: (data) => {
      setLocalStorage("token", data?.data?.accessToken || "");
      navigate("/dashboard");
    },
  });

  return {
    ...mutation,
    errorMessage: mutation.error?.response?.data?.message || "",
  };
};

export const useFetchData = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      apiClient()
        .get(`/users/${userId}`)
        .then((res) => res.data),
  });
};
