import axios from "axios";
import { getLocalStorage } from "src/services/localStorage";

type Options = {
  Timeout: number;
};

const FindToken = (): string => {
  const user = getLocalStorage(import.meta.env.VITE_USER_DATA || "user_data");

  if (!user) {
    return "User not found";
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return user.token;
};

// let isRefreshing = false;
// let refreshQueue: { resolve: Function; reject: Function }[] = [];

export const apiClient = (opts: Options = { Timeout: 10000 }) => {
  const httpClient = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_HOST || "http://localhost:3000",
    headers: {
      Accept: "application/json",
    },
    timeout: opts.Timeout,
  });
  httpClient.interceptors.response.use(
    (response) => response
    //   async (error: any) => {
    //     const originalRequest = error.config;
    //     if (
    //       error.response &&
    //       error.response.status === 401 &&
    //       !originalRequest._retry
    //     )
    // {
    //   if (!isRefreshing) {
    //     isRefreshing = true;
    //     try {
    //       const refreshedToken = await refreshToken();
    //       httpClient.defaults.headers.common[
    //         "Authorization"
    //       ] = `Bearer ${refreshedToken}`;
    //       // Retry all queued requests
    //       refreshQueue.forEach((queueItem) => queueItem.resolve());
    //       refreshQueue = [];
    //       // Retry the original request
    //       originalRequest.headers[
    //         "Authorization"
    //       ] = `Bearer ${refreshedToken}`;
    //       return httpClient.request(originalRequest);
    //     } catch (refreshError) {
    //       // Handle refresh token failure
    //       refreshQueue.forEach((queueItem) => queueItem.reject(refreshError));
    //       refreshQueue = [];
    //       throw refreshError;
    //     } finally {
    //       isRefreshing = false;
    //     }
    //   } else {
    //     // Queue the request while refreshing the token
    //     return new Promise((resolve, reject) => {
    //       refreshQueue.push({ resolve, reject });
    //     }).then(() => {
    //       return httpClient.request(originalRequest);
    //     });
    //   }
    // }
    // For other errors, simply throw the error
    //     throw error;
    //   }
  );
  return httpClient;
};

export const dataClient = (opts: Options = { Timeout: 10000 }) => {
  const httpClient = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_HOST || "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${FindToken()}`,
      Accept: "application/json",
      // "Content-Type": "application/json",
    },
    timeout: opts.Timeout,
  });
  httpClient.interceptors.response.use((response) => response);
  return httpClient;
};
