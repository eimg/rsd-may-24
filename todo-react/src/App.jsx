import { useRef, useState } from "react";

import {
	Box,
	IconButton,
	List,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import Item from "./Item";
import Header from "./Header";

export default function App() {
	const inputRef = useRef();

	const [data, setData] = useState([
		{ id: 1, name: "Apple", done: true },
		{ id: 2, name: "Orange", done: false },
		{ id: 3, name: "Milk", done: false },
	]);

	const remove = id => {
		setData(data.filter(item => item.id !== id));
	};

	const toggle = id => {
		setData(
			data.map(item => {
				if (item.id === id) item.done = !item.done;
				return item;
			})
		);
	};

	const add = name => {
		const id = data[data.length - 1].id + 1;
		setData([...data, { id, name, done: false }]);
	};

	return (
		<Box>
            <Header count={data.filter(item => !item.done).length} />
			<Box sx={{ mx: "auto", maxWidth: "md", mt: 4 }}>
				<form
					onSubmit={e => {
						e.preventDefault();

						const name = inputRef.current.value;
						if (!name) return false;

						add(name);

						inputRef.current.value = "";
						inputRef.current.focus();
					}}>
					<OutlinedInput
						fullWidth
						inputRef={inputRef}
						endAdornment={
							<InputAdornment>
								<IconButton type="submit">
									<AddIcon />
								</IconButton>
							</InputAdornment>
						}
					/>
				</form>
				<List>
					{data
						.filter(item => !item.done)
						.map(item => {
							return (
								<Item
									key={item.id}
									item={item}
									remove={remove}
									toggle={toggle}
								/>
							);
						})}
				</List>
				<hr />
				<List>
					{data
						.filter(item => item.done)
						.map(item => {
							return (
								<Item
									key={item.id}
									item={item}
									remove={remove}
									toggle={toggle}
								/>
							);
						})}
				</List>
			</Box>
		</Box>
	);
}
