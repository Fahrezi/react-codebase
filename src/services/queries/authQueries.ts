import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient, dataClient } from "../base/api/apiClient";
import { authEndpoints } from "../endpoints";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { setLocalStorage } from "../localStorage";

type LoginData = { email: string; password: string };
type LoginResponse = {
  data: {
    token: string;
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
      dataClient()
        .post(authEndpoints.login, credentials, {
          headers: {
            "Content-type": "multipart/form-data",
          },
          auth: {
            username: "dashboard",
            password: "changemeasd",
          },
        })
        .then((res) => res.data),
    onSuccess: (value) => {
      // const parsed = typeof value === "object" ? JSON.stringify(value) : value;
      setLocalStorage("platform_user", { token: value.data.token });
      console.log("halo");
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
