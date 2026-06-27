import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Events() {
  function createEvent() {
    console.log("open modal where user specifies even info");
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
        <View>
          <Text>Carousel</Text>
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
    fontSize: 20,
  },

  headerTwo: {
    fontSize: 25,
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
});
