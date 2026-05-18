
import SongCard from '@/components/songs/SongCard';
import SongSearchBar from '@/components/songs/SongSearchBar';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (

    <View style={styles.container}>
        <SongSearchBar/>
        <SongCard style={styles.songcard}/>


    </View>

  );
}

const styles = StyleSheet.create({
    songcard: {
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: '#ddd'
    }
})