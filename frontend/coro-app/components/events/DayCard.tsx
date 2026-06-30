import { Pressable, StyleSheet, Text } from "react-native";

type DayProps = {
  date: Date;
  onPress: (date: Date) => void;
  isSelected: boolean;
};

export default function DayCard({ date, onPress, isSelected }: DayProps) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const options: Intl.DateTimeFormatOptions = { month: "long" };

  return (
    <Pressable
      style={[style.day, isSelected ? style.daySelected : style.dayNotSelected]}
      onPress={() => onPress(date)}
    >
      <Text style={style.textWhite}>{dayNames[date.getDay()]}</Text>
      <Text style={style.textWhite}>{date.getDate()}</Text>
      <Text style={style.textWhite}>
        {new Intl.DateTimeFormat("en-US", options).format(date).slice(0, 3)}
      </Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  textWhite: {
    color: "#fff",
  },

  daySelected: {
    borderColor: "#fff",
  },

  dayNotSelected: {
    borderColor: "#5e5e5e",
  },

  day: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 10,
    borderWidth: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
});
