import { api } from "./config";

export const getClientMeasurement = async (clientId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const res = await api.get(
    `/api/v1/auth/measurement`,
    { owner: clientId },
    config
  );

  if (res.ok) {
    return res.data;
  }

  console.log(res.problem);
  return [];
};

export const createClientMeasurement = async (measurementData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const res = await api.post(
    `/api/v1/auth/measurement/`,
    measurementData,
    config
  );

  if (res.ok) {
    return res.data;
  }

  console.log(res.problem);
  return false;
};
