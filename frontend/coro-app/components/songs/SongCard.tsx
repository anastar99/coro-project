import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';

type SongCardProps = {
  name: string;
  pageNumber?: number | null;
  pageUrl?: string | null;
};

export default function SongCard({
  name,
  pageNumber,
  pageUrl,
}: SongCardProps) {
  const hasPageNumber = pageNumber !== null && pageNumber !== undefined;
  const hasPageUrl = pageUrl !== null && pageUrl !== undefined && pageUrl !== '';

  const openUrl = () => {
    if (hasPageUrl) {
      Linking.openURL(pageUrl);
    }
  };

  return (
    <View style={styles.card}>
      {/* Song name */}
      <Text style={styles.title}>{name}</Text>

      {/* Page number */}
      <Text style={styles.subText}>
        Page: {hasPageNumber ? pageNumber : '—'}
      </Text>

      {/* Page URL */}
      {hasPageUrl ? (
        <Pressable onPress={openUrl}>
          <Text style={styles.link}>Open page</Text>
        </Pressable>
      ) : (
        <Text style={styles.subText}>No page link</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 12,

    // shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // shadow (Android)
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111',
  },

  subText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  link: {
    fontSize: 13,
    color: '#2563eb',
    marginTop: 6,
    fontWeight: '500',
  },
});
