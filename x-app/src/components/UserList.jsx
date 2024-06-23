import {
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
} from "@mui/material";

export default function UserList({ users }) {
	return (
		<Box>
			<List>
				{users.map(user => {
					return (
						<ListItem key={user._id}>
							<ListItemAvatar>
								<Avatar />
							</ListItemAvatar>
							<ListItemText
								primary={user.name}
								secondary={`
                                    ${
										user.followers
											? user.followers.length
											: 0
									}
                                    followers`}
							/>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
