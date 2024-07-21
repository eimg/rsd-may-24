import {
	Box,
	List,
	Avatar,
	ListItem,
	ListItemText,
	OutlinedInput,
	InputAdornment,
	ListItemButton,
	ListItemAvatar,
} from "@mui/material";

import { PersonSearch as PersonSearchIcon } from "@mui/icons-material";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchSearch } from "../libs/fetcher";

export default function Search() {
	const [users, setUsers] = useState([]);

	const navigate = useNavigate();
	const input = useRef();

	return (
		<Box>
			<OutlinedInput
				fullWidth={true}
				inputRef={input}
				variant="outlined"
				placeholder="Search user"
				startAdornment={
					<InputAdornment position="start">
						<PersonSearchIcon />
					</InputAdornment>
				}
				onKeyUp={() => {
                    const q = input.current.value;
                    
					fetchSearch(q).then(data => setUsers(data));
				}}
			/>
			<List>
				{users.map(user => {
                    const images = import.meta.env.VITE_IMAGES_URL;
                    let photo;
                    
                    if(user.photo) {
                        photo = `${images}/${user.photo}`;
                    }

					return (
						<ListItem key={user._id}>
							<ListItemButton
								onClick={() => {
									navigate(`/profile/${user._id}`);
								}}>
								<ListItemAvatar>
									<Avatar src={photo} alt="Profile">
                                        {user.name[0]}
                                    </Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={user.name + " @" + user.username}
									secondary={user.bio}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
