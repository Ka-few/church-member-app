import api from "./api";

export interface Donation {
  id: number;
  amount: number;
  purpose: string;
  date: string;
}

export const getDonations = async (): Promise<Donation[]> => {
  const res = await api.get("/donations/");
  return res.data;
};
