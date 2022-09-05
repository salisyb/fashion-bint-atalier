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

export const updateClientMeasurement = async (measurementData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const res = await api.put(
    `/api/v1/auth/measurement/${measurementData.id}/`,
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

export const deleteClientMeasurement = async (measurementId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  const res = await api.delete(
    `/api/v1/auth/measurement/${measurementId}`,
    {},
    config
  );

  if (res.ok) {
    return true;
  }

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
    config.headers["Authorization"] = `Token ${token}`;
  }

  const res = await api.get(`/api/v1/auth/order`, {}, config);

  if (res.ok) {
    return res.data;
  }

  console.log(res.data);

  return [];
};

export const getInvoiceOrder = async (ref) => {
  const res = await api.get(`/api/v1/invoice?i=${ref}`);

  if (res.ok) {
    return res.data;
  }

  console.log(res.data);

  return [];
};

export const createInvoiceOrder = async (data) => {
  const res = await api.post("/api/v1/invoice/", data);

  if (res.ok) {
    return res.data;
  }

  console.log(res.data);

  return false;
};

export const getClientListOfOrder = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await api.get(`/api/v1/order/${id}`, {}, config);

  if (res.ok) {
    return res.data;
  }

  console.log(res.data);

  return [];
};

export const updateOrderInformation = async (orderId, data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const res = await api.put(`/api/v1/auth/order/${orderId}/`, data, config);

  if (res.ok) {
    return res.data;
  }

  return false;
};

export const deleteOrderInformation = async (orderId, data, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const res = await api.delete(`/api/v1/auth/order/${orderId}/`, {}, config);

  if (res.ok) {
    return true;
  }

  return false;
};

export const deleteClient = async (clientId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await api.delete(`/api/v1/auth/client/${clientId}/`, {}, config);

  if (res.ok) {
    return true;
  }

  return false;
};

export const editClient = async (clientData, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  const res = await api.put(
    `/api/v1/auth/client/${clientData.id}/`,
    clientData,
    config
  );

  if (res.ok) {
    return res.data;
  }

  console.log(res.problem);
  console.log(res.data);
  return false;
};
