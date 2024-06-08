import { View, TextInput, StyleSheet, Button } from "react-native";

import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
	inputGroup: {
		margin: 20,
		padding: 8,
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#559",
		borderRadius: 10,
	},
	input: {
		flexGrow: 1,
	},
});

const api = "http://192.168.100.205:8888/tasks";

export default function Edit() {
	const { id } = useLocalSearchParams();

	const [name, setName] = useState("");

	useEffect(() => {
		(async () => {
			const res = await fetch(`${api}/${id}`);
			const item = await res.json();

            setName(item.name);
		})();
	}, []);

    async function update() {
        await fetch(`${api}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        router.push('/');
    }

	return (
		<View>
			<View style={styles.inputGroup}>
				<TextInput
					value={name}
					onChangeText={setName}
					style={styles.input}
				/>
				<Button
					title="Update"
					onPress={update}
				/>
			</View>
		</View>
	);
}
