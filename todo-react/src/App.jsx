import { useRef, useState } from "react";

import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Typography,
    List,
} from "@mui/material";

import {
    List as ListIcon
} from "@mui/icons-material";

import Item from "./Item";

export default function App() {
    const inputRef = useRef();

    const [data, setData] = useState([
		{ id: 1, name: "Apple", done: true },
		{ id: 2, name: "Orange", done: false },
		{ id: 3, name: "Milk", done: false },
	]);

    const remove = id => {
        setData( data.filter(item => item.id !== id) );
    }

    const toggle = id => {
        setData(
            data.map(item => {
                if(item.id === id) item.done = !item.done;
                return item;
            })
        );
    }

    const add = name => {
        const id = data[data.length - 1].id + 1;
        setData([ ...data, { id, name, done: false } ]);
    }

    return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<ListIcon sx={{ mr: 2 }} />
					<Typography variant="h6">Todo</Typography>
				</Toolbar>
			</AppBar>

			<Box sx={{ mx: 'auto', maxWidth: "md", mt: 4 }}>
				<form
					onSubmit={e => {
						e.preventDefault();

						const name = inputRef.current.value;
						if (!name) return false;

						add(name);

						inputRef.current.value = "";
						inputRef.current.focus();
					}}>
					<input
						type="text"
						ref={inputRef}
					/>
					<button>Add</button>
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
