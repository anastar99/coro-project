import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function SongSearchBar() {

    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            onChangeText={setText}
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
    padding: 20,
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