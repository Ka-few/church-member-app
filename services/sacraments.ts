import api from "./api";

export interface Sacrament {
  id: number;
  name: string;
  status: string;
  date: string | null;
}

export const getSacraments = async (): Promise<Sacrament[]> => {
  const res = await api.get("/sacraments/");
  return res.data;
};
