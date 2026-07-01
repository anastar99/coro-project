import DayCard from "@/components/events/DayCard";
import EventCard from "@/components/events/EventCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Event = {
  id: string;
  title: string;
  time: Date;
  location: string;
  type: string;
};

export default function Events() {
  const [days, setDays] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedDayHeader, setSelectedDayHeader] = useState<string | null>(
    null,
  );

  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  const options: Intl.DateTimeFormatOptions = { month: "long" };
  const days_string = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function generateDays(count: number) {
    const gen_days: Date[] = [];
    const today = new Date();

    for (let i = 0; i < count; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      gen_days.push(day);
    }

    return gen_days;
  }

  useEffect(() => {
    try {
      const days = generateDays(30);
      setSelectedDay(days[0].toISOString());
      setSelectedDayHeader(
        `${days_string[days[0].getDay()]}, ${new Intl.DateTimeFormat("en-US", options).format(days[0])} ${days[0].getDate()}`,
      );
      setUpcomingEvents([
        {
          id: "2",
          title: "Upcoming event 1",
          time: new Date(),
          location: "California",
          type: "Gig",
        },
      ]);
      setDays(days);
    } catch (error) {}
  }, []);

  function createEvent() {
    console.log("open modal where user specifies even info");
  }

  function getEventsForDate(date: Date) {
    setSelectedDay(date.toISOString());

    setSelectedDayHeader(
      `${days_string[date.getDay()]}, ${new Intl.DateTimeFormat("en-US", options).format(date)} ${date.getDate()}`,
    );

    setSelectedDayEvents([
      {
        id: "1",
        title: "Event 1",
        time: new Date(),
        location: "California",
        type: "Rehearsel",
      },
    ]);
    console.log("we need to fetch all the events for the clicked date:", date);
  }
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View>
          <Text style={style.headerOne}>Event Planner</Text>
          <Text style={style.headerTwo}>Your shows & setlists</Text>
        </View>

        <View>
          <TouchableOpacity style={style.createEventBtn} onPress={createEvent}>
            <Text style={style.createEventBtnText}>New Event</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Days Carousel */}
      <View style={style.body}>
        <View style={style.carousel}>
          <View style={style.carouselArrow}>
            <IconSymbol size={20} name="paperplane.fill" color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={days}
              keyExtractor={(item) => item.toISOString()}
              renderItem={({ item }) => (
                <DayCard
                  date={item}
                  onPress={getEventsForDate}
                  isSelected={selectedDay === item.toISOString()}
                />
              )}
            />
          </View>

          <View style={style.carouselArrow}>
            <IconSymbol size={20} name="paperplane.fill" color="#fff" />
          </View>
        </View>

        {/* Selected Day Events */}
        <View style={style.selectedDayEventsContainer}>
          <View style={style.selectedDayEventsHeader}>
            <Text style={style.selectedDate}>
              {selectedDayHeader ?? "No Date selected"}
            </Text>
            <Text style={[style.selectedDayEventsCount]}>
              {selectedDayEvents.length < 1
                ? "No events"
                : `- ${selectedDayEvents.length} event(s)`}
            </Text>
          </View>
          <View style={style.selectedDayEventsList}>
            <FlatList
              data={selectedDayEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <EventCard event={item} />}
              ListEmptyComponent={
                <Text style={[style.noResultsText, style.primaryText]}>
                  No results for selected date
                </Text>
              }
            />
          </View>
        </View>

        {/* Upcoming Events */}
        <Text style={style.upcomingEventsHeader}>Upcoming events</Text>
        <View style={style.upcomingEventsContainer}>
          <FlatList
            data={upcomingEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard event={item} />}
            ListEmptyComponent={
              <Text style={[style.noResultsText, style.primaryText]}>
                No Upcoming events
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  primaryText: {
    color: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerOne: {
    fontSize: 12,
    color: "#9e9e9e",
    paddingBottom: 7,
  },

  headerTwo: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    paddingBottom: 10,
  },

  createEventBtn: {
    borderRadius: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  createEventBtnText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },

  body: {
    flexDirection: "column",
    alignItems: "center",
  },

  upcomingEventsHeader: {
    paddingVertical: 24,
    color: "#fff",
  },
  upcomingEventsContainer: {
    width: "100%",
  },

  carousel: {
    width: "100%",
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  carouselArrow: {
    width: "10%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dayItem: {
    paddingHorizontal: 12,
    alignItems: "center",
  },

  noResultsText: {
    fontSize: 16,
  },
  selectedDayEventsContainer: {
    width: "100%",
  },
  selectedDayEventsHeader: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },

  selectedDayEventsList: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },

  selectedDate: {
    paddingEnd: 5,
    color: "#fff",
    textAlign: "left",
    fontWeight: "600",
  },

  selectedDayEventsCount: {
    color: "#9e9e9e",
  },
});
