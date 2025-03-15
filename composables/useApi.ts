import { useAsyncData } from "nuxt/app";

export const useApi = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: Record<string, any>
) => {
  return useAsyncData<T>(url, () =>
    $fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(body ? { body } : {}),
    })
  );
};
