import { useEffect, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { getEvents, Event } from "../../services/events";

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator className="mt-10" />;
  }

  return (
    <ScrollView className="bg-[#FAFAF8] p-4">
      <Text className="text-2xl font-semibold mb-4">Parish Events</Text>

      {events.map(event => (
        <View
          key={event.id}
          className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-[#EFE7C9]"
        >
          <Text className="font-semibold text-lg">{event.title}</Text>
          <Text className="text-gray-500 text-sm mt-1">
            {event.date} • {event.location}
          </Text>
          <Text className="text-gray-600 mt-2">{event.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
