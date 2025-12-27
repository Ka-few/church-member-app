import api from "./api";

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

export const getEvents = async (): Promise<Event[]> => {
  const res = await api.get("/events");
  return res.data;
};
