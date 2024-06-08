import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	TouchableOpacity,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

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
	list: {
		marginLeft: 20,
		marginRight: 20,
		borderWidth: 1,
		borderColor: "#aaa",
		borderRadius: 10,
	},
	item: {
		padding: 20,
		borderBottomWidth: 1,
		borderColor: "#aaa",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	itemText: {
		fontSize: 18,
	},
});

const api = "http://192.168.100.205:8888/tasks";

export default function Index() {
	const [data, setData] = useState([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		(async () => {
			const res = await fetch(api);
			setData(await res.json());
		})();
	}, []);

	async function add() {
		const res = await fetch(api, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: input }),
		});

		const item = await res.json();

		setData([...data, item]);
		setInput("");
	}

    function toggle(id) {
        fetch(`${api}/${id}/toggle`, { method: 'PUT', });

        setData(data.map(item => {
            if(item._id === id) item.done = !item.done;
            return item;
        }));
    }

    const remove = id => () => {
        setData(data.filter(item => item._id !== id));

        fetch(`${api}/${id}`, { method: 'DELETE' });
    }

	return (
		<View>
			<View style={styles.inputGroup}>
				<TextInput
					style={styles.input}
					value={input}
					onChangeText={setInput}
				/>
				<Button
					title="Add"
					onPress={add}
				/>
			</View>
			<View style={styles.list}>
				{data
					.filter(item => !item.done)
					.map(item => {
						return (
							<View
								style={styles.item}
								key={item._id}>
								<View style={{ flexDirection: "row", gap: 8 }}>
									<TouchableOpacity
										onPress={() => toggle(item._id)}>
										<Ionicons
											name="square-outline"
											size={24}
											gap={8}
										/>
									</TouchableOpacity>
									<Text style={styles.itemText}>
										{item.name}
									</Text>
								</View>

								<View style={{ flexDirection: "row", gap: 8 }}>
									<TouchableOpacity>
										<Link href={`/edit/${item._id}`}>
											<Ionicons
												name="pencil"
												size={24}
											/>
										</Link>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={remove(item._id)}>
										<Ionicons
											name="trash"
											size={24}
											color="red"
										/>
									</TouchableOpacity>
								</View>
							</View>
						);
					})}
			</View>

			<View style={[styles.list, { marginTop: 20 }]}>
				{data
					.filter(item => item.done)
					.map(item => {
						return (
							<View
								style={styles.item}
								key={item._id}>
								<View style={{ flexDirection: "row", gap: 8 }}>
									<TouchableOpacity
										onPress={() => toggle(item._id)}>
										<Ionicons
											name="checkbox-outline"
											size={24}
											gap={8}
										/>
									</TouchableOpacity>
									<Text style={styles.itemText}>
										{item.name}
									</Text>
								</View>

								<View style={{ flexDirection: "row", gap: 8 }}>
									<TouchableOpacity>
										<Link href={`/edit/${item._id}`}>
											<Ionicons
												name="pencil"
												size={24}
											/>
										</Link>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={remove(item._id)}>
										<Ionicons
											name="trash"
											size={24}
											color="red"
										/>
									</TouchableOpacity>
								</View>
							</View>
						);
					})}
			</View>
		</View>
	);
}
