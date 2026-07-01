import { StyleSheet, Text, View } from "react-native";

type EventProps = {
  event: {
    id: string;
    title: string;
    time: Date;
    location: string;
    type: string;
  };
};
export default function EventCard({ event }: EventProps) {
  return (
    <View style={style.container}>
      <View style={style.eventInfo}>
        <Text style={style.typeText}>{event.type}</Text>
        <Text style={style.titleText}>{event.title}</Text>
        <View style={style.moreEventInfo}>
          <Text style={style.timeText}>
            {event.time.getHours() > 12
              ? `${event.time.getHours() - 12}:00 PM`
              : `${event.time.getHours()}:00 AM`}
          </Text>
          <Text style={style.timeText}>{event.location}</Text>
        </View>
      </View>

      <View>
        <Text>Icon and number of setlist in event</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#474747",
    backgroundColor: "#1c1c1c",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  eventInfo: {
    padding: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  typeText: {
    backgroundColor: "#474747",
    padding: 2,
    color: "#fff",
    textAlign: "center",
    width: 75, // or minWidth, or alignSelf: "stretch" if parent has a width
    fontSize: 13,
    borderRadius: 10,
  },

  titleText: {
    color: "#fff",
    fontWeight: "700",
    paddingStart: 3,
  },

  timeText: {
    color: "#a3a3a3",
  },

  moreEventInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
