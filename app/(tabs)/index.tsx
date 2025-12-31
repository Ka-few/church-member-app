import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { getAnnouncements, Announcement } from "../../services/announcements";
import { useAuth } from "../../context/AuthContext";

export default function AnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const loadAnnouncements = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, [user]);

  return (
    <ScrollView className="flex-1 bg-[#FAFAF8] p-4">
      <Text className="text-2xl font-semibold mb-6">Parish Announcements</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#C6A44A" className="mt-10" />
      ) : announcements.length === 0 ? (
        <Text className="text-gray-500 text-center mt-10">
          No announcements available.
        </Text>
      ) : (
        announcements.map((a) => (
          <View
            key={a.id}
            className="bg-white rounded-2xl p-5 mb-4 shadow-lg border border-[#EFE7C9]"
          >
            <Text className="text-lg font-semibold">{a.title}</Text>
            <Text className="text-gray-600 mt-2">{a.message}</Text>
            {a.created_at && (
              <Text className="text-xs text-gray-400 mt-2">
                {new Date(a.created_at).toLocaleDateString()}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}
