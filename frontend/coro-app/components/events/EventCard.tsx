import { StyleSheet, Text, View, Platform } from "react-native";


type EventCardProps = {
    event: {
        event_id: number;
        event_name: string;
        event_location: string;
        event_time: string;
        event_date: string;
    }
};

export default function EventCard({ event }: EventCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                {event.event_name}
            </Text>

            <View style={styles.row}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value}>{event.event_location}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{event.event_date}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Time:</Text>
                <Text style={styles.value}>{event.event_time}</Text>
            </View>
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

        ...Platform.select({
            web: {
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            },
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 3,
            },
        }),
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        fontSize: 13,
        color: '#888',
        width: 70,
    },
    value: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    }
})