import DayCard from "@/components/events/DayCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Events() {

  const [days, setDays] = useState<Date[]>([]);
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
      setDays(days)
    } catch (error) {
    }
  }, [])

  function createEvent() {
    console.log("open modal where user specifies even info");
  }

  function getEventsForDate(date: Date) {

    console.log("we need to fetch all the events for the clicked date:", date);
  }
  return (
    <View style={style.container}>
      <View style={style.header}>
        <View>
          <Text style={style.headerOne}>Events</Text>
          <Text style={style.headerTwo}>Your shows and setlist</Text>
        </View>

        <View>
          <TouchableOpacity style={style.createEventBtn} onPress={createEvent}>
            <Text style={style.createEventBtnText}>Create Event</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.body}>
        <View style={style.carousel}>
          <View style={style.carouselArrow}>
            <IconSymbol size={20} name="paperplane.fill" color="#fff"/>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={days}
              keyExtractor={(item) => item.toISOString()}
              renderItem={({ item }) => (

                <DayCard 
                  date={item} onPress={getEventsForDate}
                />
              )}
            />
          </View>

          <View style={style.carouselArrow}>
            <IconSymbol size={20} name="paperplane.fill" color="#fff"/>
          </View>
        </View>

        <View>
          <Text>Events for the selected date via the coursel</Text>
        </View>

        <View style={style.upcomingEventsContainer}>
          <Text>Upcoming event</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerOne: {
    fontSize: 15,
  },

  headerTwo: {
    fontSize: 18,
  },

  createEventBtn: {
    borderRadius: 8,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  createEventBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  body: {
    flexDirection: "column",
    alignItems: "center",
  },
  upcomingEventsContainer: {
    backgroundColor: "#ff2",
    width: 80,
    height: 80,
  },

  carousel: {
    width: "100%",
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "space-around"
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
    alignItems: 'center',
  }
});
