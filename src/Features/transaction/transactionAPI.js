import axios from "axios";

export const getTransactions = async () => {
  const res = await axios.get("http://localhost:9000/transactions");
  return res.data;
};
export const addTransactions = async (data) => {
  const res = await axios.post("http://localhost:9000/transactions", data);
  return res.data;
};

export const editTransactions = async (id, data) => {
  const res = await axios.put(`http://localhost:9000/transactions/${id}`, data);
  return res.data;
};
export const delteTransactions = async (id) => {
  const res = await axios.delete(`http://localhost:9000/transactions/${id}`);
  return res.data;
};
