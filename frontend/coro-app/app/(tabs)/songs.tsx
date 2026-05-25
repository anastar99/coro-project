
import SongSearchBar from '@/components/songs/SongSearchBar';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, FlatList} from 'react-native';
import React , {useEffect, useState} from 'react';
import SongCard from '@/components/songs/SongCard';

type Song = {
    song_id: number;
    song_name: string;
    page_number?: number | null;
    song_url?: string | null
};

export default function HomeScreen() {
    const [error, setError] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const [songName, setSongName] = useState('');
    const [pageNumber, setPageNumber] = useState('');
    const [songURL, setSongURL] = useState('');

    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        async function getAllSongs() {
            try {
                const resp = await fetch('http://localhost:8080/songs');
                const data = await resp.json();

                setSongs(data);
                console.log("Data", data);

            } catch (error) {
                console.log(error);
            }
        }

        getAllSongs();
    }, []);

    async function createSong() {

        if (!songName.trim()) {
            setError("Song name is required");
            return false;
        }

        if (pageNumber && isNaN(Number(pageNumber))) {
            setError("Page number must be a number");
            return false;
        }

        await fetch('http://localhost:8080/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                song_name: songName,
                page_number: Number(pageNumber),
                song_url: songURL,
            })
        });

        return true;
    }

    async function handleSubmit() {

        const success = await createSong();


        if (!success) {
            return;
        }
        setModalVisible(false);
        setSongName('');
        setPageNumber('');
        setSongURL('');
    }

    function closeForm() {
        setSongName('');
        setPageNumber('');
        setSongURL('');
        setError('');
        setModalVisible(false);
    }

    function handleDeleteSong(id: number) {
        setSongs(prev => prev.filter(s => s.song_id !== id));
    }

  return (
    <>
    <Modal
    animationType="slide"
    visible={modalVisible}
    style={styles.createSongForm}>
        <TextInput
            placeholder='Enter song name'
            value={songName}
            onChangeText={(text) => {
                setSongName(text)

                if (error) {
                    setError('');
                }
            }
            }
            autoCapitalize='none'
            style={styles.input}/>

        <TextInput 
            placeholder="Enter page number"
            value={pageNumber}
            onChangeText={(text) => {
                setPageNumber(text);

                if (error) {
                    setError('');
                }
            }
            }
            keyboardType="numeric"
            style={styles.input}/>

        <TextInput 
            placeholder='Enter song url'
            value={songURL}
            onChangeText={setSongURL}
            style={styles.input}/>

            {error ? (<Text style={styles.errorText}>{error}</Text>) : null}
        
        <TouchableOpacity style={styles.input} onPress={handleSubmit}>
            <Text>Save Song</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeForm}>
            <Text>Close Form</Text>
        </TouchableOpacity>

    </Modal>
    <View style={styles.container}>
      <View style={styles.topRow}>

        <View style={styles.header}>

            <Text>{songs.length} Total Songs</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton} accessibilityRole="button" accessibilityLabel="Add">
                <Text style={styles.addIcon}>+ Add Song</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <SongSearchBar />
        </View>
      </View>

    <FlatList
    data={songs}
    keyExtractor={(item) => item.song_id.toString()}
    renderItem={({ item }) => (
        <SongCard
        song={item}   
        onPress={handleDeleteSong}     />
    )}
    ListEmptyComponent={
        <Text style={styles.noResultsText}>no results</Text>
    }
    />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    createSongForm: {
        flexDirection: "column",
    },
    input: {
        marginBottom: 12,
    },
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
    errorText: {
    color: 'red',
    fontSize: 14,
  },
});