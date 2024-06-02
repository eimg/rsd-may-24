import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#559",
        padding: 20,
        paddingTop: 50,
	},
    title: {
        fontSize: 21,
        color: 'white'
    },
    inputGroup: {
        margin: 20,
        padding: 8,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#559',
        borderRadius: 10,
    },
    input: {
        flexGrow: 1,
    },
    list: {
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#aaa',
    },
    itemText: {
        fontSize: 18,
    }
});

export default function Index() {
    return (
		<View>
			<View style={styles.header}>
				<Text style={styles.title}>Todo</Text>
			</View>
			<View style={styles.inputGroup}>
				<TextInput style={styles.input} />
				<Button title="Add" />
			</View>
			<View style={styles.list}>
				<View style={styles.item}>
					<Text style={styles.itemText}>Item One</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.itemText}>Item Two</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.itemText}>Item Ten</Text>
				</View>
			</View>
		</View>
	);
}
