import axiosInstance from "./AxiosInstance";


export const getAllProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data?.data;
};

export const getProductById = async (id) => {
  const response = await axiosInstance.get(`products/${id}`);
  return response.data?.data;
};

export const createProduct = async (data) => {
  const response = await axiosInstance.post("products", data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await axiosInstance.put(`products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`products/${id}`);
  return response.data;
};

export const uploadProductImages = async (id, formData) => {
  const response = await axiosInstance.post(
    `products/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
