import { View, Text, StyleSheet } from "react-native"

export default function SongCard({ style }: any) {
  return (
    <View style={[styles.card, style]}>
      <Text>Song Name</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
})
