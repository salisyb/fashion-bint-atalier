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
  console.log(res.data);
  return false;
};

export const createClientOrder = async (orderData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const res = await api.post(`/api/v1/auth/order/`, orderData, config);

  if (res.ok) {
    return res.data;
  }

  console.log(res.problem);
  return false;
};

export const getOrderInformation = async (orderId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const res = await api.get(`/api/v1/auth/order/${orderId}/`, {}, config);

  if (res.ok) {
    return res.data;
  }

  return false;
};

export const getListOfOrder = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const res = await api.get(`/api/v1/auth/order`, {}, config);

  if (res.ok) {
    return res.data;
  }

  console.log(res.problem);
  return [];
};

export const updateOrderInformation = async (orderId, data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const res = await api.put(`/api/v1/auth/order/${orderId}/`, data, config);

  if (res.ok) {
    return res.data;
  }

  return false;
};
