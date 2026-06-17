import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";


type SongSearchBarProps = {
    onType: (search: string) => void
}
export default function SongSearchBar({onType} : SongSearchBarProps) {


    const [text, setText] = useState('');

    function handleSearch(search: string) {

        setText(search);
        onType(search);
    }
    
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            onChangeText={(text) => handleSearch(text)}
            value={text}
            placeholder="Search a song"
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: "#ddd"
  },
});