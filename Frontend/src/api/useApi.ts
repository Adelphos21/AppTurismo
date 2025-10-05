
import { useAuth } from "@clerk/clerk-react";
import { api } from "api/api";

export function useApi() {
  const { getToken } = useAuth();

  const get = async (url: string, params = {}) => {
    const token = await getToken();
    const { data } = await api.get(url, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  const post = async (url: string, body = {}) => {
    const token = await getToken();
    const { data } = await api.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  const patch = async (url: string, body = {}) => {
    const token = await getToken();
    const { data } = await api.patch(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  };

  return { get, post, patch };
}
