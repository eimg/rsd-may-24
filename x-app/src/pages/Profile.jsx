import { useState, useEffect } from "react";

import {
	Box,
	Avatar,
	Typography,
	Button,
	IconButton,
	Card,
	CardActionArea,
} from "@mui/material";
import { pink } from "@mui/material/colors";

import { Link, useNavigate, useParams } from "react-router-dom";

import PostCard from "../components/PostCard";

import {
	fetchUser,
	fetchUploadPhoto,
	fetchUploadCover,
    putLike,
    putUnlike,
} from "../libs/fetcher";

import { useApp } from "../ThemedApp";
import { FollowButton } from "../components/UserList";

export default function Profile() {
	const { id } = useParams();

	const navigate = useNavigate();

	const { auth } = useApp();

	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	const [photo, setPhoto] = useState("");
	const [cover, setCover] = useState("");

    const like = _id => {
		const result = posts.map(post => {
			if (post._id === _id) {
				post.likes = [...post.likes, auth];
			}

			return post;
		});

		setPosts(result);
		putLike(_id);
	};

	const unlike = _id => {
		const result = posts.map(post => {
			if (post._id === _id) {
				post.likes = post.likes.filter(like => like._id !== auth._id);
			}

			return post;
		});

		setPosts(result);
		putUnlike(_id);
	};

	useEffect(() => {
		(async () => {
			const data = await fetchUser(id);
			setPosts(data.posts);
			setUser(data.user);

			const images = import.meta.env.VITE_IMAGES_URL;
			if (data.user.photo) {
				setPhoto(`${images}/${data.user.photo}`);
			}

			if (data.user.cover) {
				setCover(`${images}/${data.user.cover}`);
			}

			setLoading(false);
		})();
	}, [id, auth]);

	const getFile = async () => {
		const [fileHandle] = await window.showOpenFilePicker({
			types: [
				{
					description: "Images",
					accept: {
						"image/*": [".png", ".jpeg", ".jpg"],
					},
				},
			],
			excludeAcceptAllOption: true,
			multiple: false,
		});

		return await fileHandle.getFile();
	};

	const changeCover = async e => {
		if (auth._id !== id) return false;

		const file = await getFile();
		setCover(URL.createObjectURL(file));

		const fileName =
			file.type === "image/png"
				? `${id}-cover.png`
				: `${id}-cover.jpg`;

		const formData = new FormData();
		formData.append("cover", file, fileName);
		fetchUploadCover(auth._id, formData);
	};

	const changePhoto = async e => {
		if (auth._id !== id) return false;

		const file = await getFile();
		setPhoto(URL.createObjectURL(file));

		const fileName =
			file.type === "image/png"
				? `${id}-photo.png`
				: `${id}-photo.jpg`;

		const formData = new FormData();
		formData.append("photo", file, fileName);
		fetchUploadPhoto(auth._id, formData);
	};

	return (
		<>
			{loading ? (
				<Box>Loading...</Box>
			) : (
				<Box>
					<Card>
						<CardActionArea
							sx={{
								bgcolor: "banner.background",
								height: 200,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							onClick={changeCover}>
							<img
								src={cover}
								alt=""
								style={{ width: "100%" }}
							/>
						</CardActionArea>
					</Card>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							mb: 8,
							mt: -12,
						}}>
						<Avatar
							onClick={changePhoto}
							src={photo}
							sx={{
								background: pink[500],
								width: 128,
								height: 128,
								mb: -6,
                                cursor: "pointer",
							}}>
							{user.name[0]}
						</Avatar>
					</Box>

					<Box sx={{ mb: 4, textAlign: "center" }}>
						{auth._id === id ? (
							<Button
								variant="outlined"
								onClick={() => {
									navigate("/edit/user");
								}}>
								Edit Profile
							</Button>
						) : (
							<FollowButton user={user} />
						)}
						<Typography sx={{ mb: 1, mt: 2 }}>
							{user.name}
							<Typography
								component="span"
								sx={{ color: "text.fade", ml: 1 }}>
								. {user.username}
							</Typography>
						</Typography>
						<Typography>
							<Link
								to={`/followers/${user._id}`}
								style={{
									textDecoration: "none",
									color: pink[500],
								}}>
								{user.followers.length} Followers
							</Link>
							<Typography
								component="span"
								sx={{ ml: 3 }}>
								<Link
									to={`/following/${user._id}`}
									style={{
										textDecoration: "none",
										color: pink[500],
									}}>
									{user.following.length} Following
								</Link>
							</Typography>
						</Typography>
					</Box>

					{posts.map(post => {
						return (
							<PostCard
								post={post}
								key={post._id}
								like={like}
								unlike={unlike}
							/>
						);
					})}
				</Box>
			)}
		</>
	);
}
