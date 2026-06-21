import { Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Text, StyleSheet, Pressable, Linking, Modal, View, TextInput, Platform} from 'react-native';

type SongCardProps = {
  song: {
    song_id: number;
    song_name: string;
    page_number?: number | null;
    song_url?: string | null;
  };
  onPress: (id: number) => void;
};

export default function SongCard({song, onPress}: SongCardProps) {
  const hasPageNumber = song.page_number !== null && song.page_number !== undefined;
  const hasPageUrl = song.song_url !== null && song.song_url !== undefined && song.song_url !== '';

  const [openModal, setOpenModal] = useState(false);
  const [editSongName, setEditSongName] = useState('');
  const [editPageNumber, setEditPageNumber] = useState('');
  const [editSongURL, setEditSongURL] = useState('');
  const [error, setError] = useState('');

  async function deleteSong(id: number) {

      try {
        const resp = await fetch(`http://localhost:8080/songs/${id}`, {
          method: 'DELETE'
        });

        const data = await resp.json();

        console.log('Delete data', data);
        setOpenModal(false);

        onPress(id);
      } catch (error) {
        console.log(error);
      }
  }

  async function updateSong(id: number) {

    try {
      const resp = await fetch(`http://localhost:8080/songs/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          song_name: editSongName,
          page_number: Number(editPageNumber),
          song_url: editSongURL,
        })
      });

      const data = await resp.json();

      console.log("Updated data", data);
      
      setOpenModal(false);

    } catch (error) {
      console.log(error);
    }
  }

  async function openEditModal(id: number) {

      setOpenModal(true);

      try {
          const resp = await fetch(`http://localhost:8080/songs/${id}`)
          const data = await resp.json();

          setEditSongName(data.song_name);
          setEditPageNumber(String(data.page_number));
          setEditSongURL(data.song_url);

          console.log("Data", data);
      } catch (error) {
          console.log(error);
      }
    }

  const openUrl = () => {
    if (hasPageUrl) {
      Linking.openURL(String(song.song_url));
    }
  };


  return (

    <>
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
    
            <View style={styles.modalheader}>
                <Text style={styles.modalTitle}>Edit Song</Text>
    
                <Pressable onPress={() => deleteSong(song.song_id)}>
                    <Trash2 />
                </Pressable>
    
            </View>
    
          <TextInput
            style={styles.modalinput}
            placeholder="Enter song name"
            placeholderTextColor="#888"
            value={editSongName}
            onChangeText={(text) => {
              setEditSongName(text);
    
              if (error) {
                setError('');
              }
            }}
          />
    
          <TextInput
            style={styles.modalinput}
            placeholder="Enter page number"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={editPageNumber}
            onChangeText={(text) => {
              setEditPageNumber(text);
    
              if (error) {
                setError('');
              }
            }}
          />
    
          <TextInput
            style={styles.modalinput}
            placeholder="Enter song url"
            placeholderTextColor="#888"
            value={editSongURL}
            onChangeText={(text) => {
              setEditSongURL(text);
    
              if (error) {
                setError('');
              }
            }}
          />
    
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
    
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => setOpenModal(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
    
            <Pressable
              style={[styles.button, styles.saveButton]}
              onPress={() => updateSong(song.song_id)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
    <Pressable style={styles.card} onPress={() => openEditModal(song.song_id)}>
      {/* Song name */}
      <Text style={styles.title}>{song.song_name}</Text>

      {/* Page number */}
      <Text style={styles.subText}>
        Page: {hasPageNumber ? song.page_number: '—'}
      </Text>

      {/* Page URL */}
      {hasPageUrl ? (
        <Pressable onPress={openUrl}>
          <Text style={styles.link}>Open page</Text>
        </Pressable>
      ) : (
        <Text style={styles.subText}>No page link</Text>
      )}
    </Pressable>
    </>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    gap: 14,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },

  modalinput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f7f7f7',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },

  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#d1d5db',
  },

  saveButton: {
    backgroundColor: '#2563eb',
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});
