import EventCard from "@/components/events/EventCard";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";


type Event = {
    event_id: number;
    event_name: string;
    event_location: string;
    event_time: string;
    event_date: string;
}

export default function EventsScreen() {

    const dummyData: Event[] = [
        {
            event_id: 1,
            event_name: "Christmas",
            event_time: "9:20",
            event_date: "6/19/2026",
            event_location: "huntington Park",
        },
        {
            event_id: 2,
            event_name: "Easter",
            event_time: "9:20",
            event_date: "6/19/2026",
            event_location: "Downey",
        },
        {
            event_id: 3,
            event_name: "Wedding",
            event_time: "9:20",
            event_date: "6/19/2026",
            event_location: "Downey",
        },
    ]

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function getEvents() {
            try {
                setEvents(dummyData)
            } catch (error) {
                console.log(error)
            }
        }

        getEvents();
    });
    
    return (
        <View style={styles.page}>

            <View style={styles.header}>
                <Text>
                    Events page
                </Text>
                <Text>Mode selector</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.carouselContainer}>
                    <Text>Carousel</Text>
                </View>

                <View style={styles.selectedEvents}>
                    <Text>
                        Selected Dates Events
                    </Text>
                </View>

                <View style={styles.nextEvents}>
                    <FlatList
                        data={events}
                        keyExtractor={(item) => item.event_id.toString()}
                        renderItem={({item}) => (
                           <EventCard
                            event={item}
                           />
                        )}
                        ListEmptyComponent={
                            <Text>no results</Text>
                        }
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    body: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    carouselContainer: {
        paddingTop: 10,
    },
    selectedEvents: {
        paddingTop: 10,
    },
    nextEvents: {
        paddingTop: 10,
    }
})
