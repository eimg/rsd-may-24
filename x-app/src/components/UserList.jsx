import {
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	ListItemButton,
	Button,
} from "@mui/material";

export default function UserList({ users }) {
	return (
		<Box>
			<List>
				{users.map(user => {
					return (
						<ListItem
							key={user._id}
							secondaryAction={
								<Button
									variant="outlined"
									size="small">
									Follow
								</Button>
							}>
							<ListItemAvatar>
								<Avatar />
							</ListItemAvatar>
							<ListItemText
								primary={user.name}
								secondary={`
                                    ${user.bio} - 
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
