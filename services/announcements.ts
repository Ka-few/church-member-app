import api from "./api";

export type Announcement = {
  id: number;
  title: string;
  message: string;
  created_at?: string;
};

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const res = await api.get("/announcements/");
  return res.data;
};
