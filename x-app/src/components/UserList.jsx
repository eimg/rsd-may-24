import { useState } from "react";

import {
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Button,
} from "@mui/material";

import { useApp } from "../ThemedApp";

import { putFollow, putUnfollow } from "../libs/fetcher";

export default function UserList({ users }) {
	return (
		<Box>
			<List>
				{users.map(user => {
					return (
						<ListItem
							key={user._id}
							secondaryAction={<FollowButton user={user} />}>
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

export function FollowButton({ user }) {
	const { auth, setAuth } = useApp();

	const [followed, setFollowed] = useState(
		auth.following && auth.following.includes(user._id)
	);

	return auth._id === user._id ? (
		<></>
	) : (
		<Button
			size="small"
			edge="end"
			variant={followed ? "outlined" : "contained"}
			sx={{ borderRadius: 5 }}
			onClick={() => {
				if (followed) {
					auth.following = auth.following.filter(
						userId => userId !== user._id
					);
					setAuth({ ...auth });
					putUnfollow(user._id);
				} else {
					auth.following.push(user._id);
					setAuth({ ...auth });
					putFollow(user._id);
				}

				setFollowed(!followed);
			}}>
			{followed ? "Followed" : "Follow"}
		</Button>
	);
}
