
import SongSearchBar from '@/components/songs/SongSearchBar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>

        <View style={styles.header}>

            <Text>5 Total Songs </Text>
            <TouchableOpacity style={styles.addButton} accessibilityRole="button" accessibilityLabel="Add">
                <Text style={styles.addIcon}>+ Add Song</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <SongSearchBar />
        </View>
      </View>

      <View style={styles.results}>
        <Text style={styles.noResultsText}>no results</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  topRow: {
    flexDirection: 'column',
    width: '100%'
  },
  searchWrapper: {
    width: "100%"
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 12,
    lineHeight: 28,
    fontWeight: '600',
  },
  results: {
    marginTop: 24,
    alignItems: 'center',
  },
  noResultsText: {
    color: '#000',
    fontSize: 16,
  },
});