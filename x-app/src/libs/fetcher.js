const api = import.meta.env.VITE_API;

export async function fetchVerify() {
	const token = localStorage.getItem("token");

	const res = await fetch(`${api}/users/verify`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (res.ok) {
		return await res.json();
	}

	return false;
}

export async function postLogin(username, password) {
	const res = await fetch(`${api}/users/login`, {
		method: "POST",
		body: JSON.stringify({ username, password }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (res.ok) {
		const data = await res.json();
		return data.token;
	}

	return false;
}

export async function getPosts() {
	const res = await fetch(`${api}/posts`);

	if (res.ok) {
		return await res.json();
	}

	return false;
}

export async function getFollowed() {
    const token = localStorage.getItem("token");
	const res = await fetch(`${api}/posts/followed`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

	if (res.ok) {
		return await res.json();
	}

	return false;
}

export async function postRegister(data) {
	const res = await fetch(`${api}/users/register`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res.ok;
}

export async function putLike(id) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${api}/posts/like/${id}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function putUnlike(id) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${api}/posts/unlike/${id}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function fetchPost(id) {
    const res = await fetch(`${api}/posts/${id}`);
    return await res.json();
}

export async function postPost(body) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${api}/posts`, {
        method: "POST",
        body: JSON.stringify({ body }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    return await res.json();
}

export async function postComment(body, origin) {
    const token = localStorage.getItem("token");

	const res = await fetch(`${api}/posts/comment/${origin}`, {
		method: "POST",
		body: JSON.stringify({ body }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return await res.json();
}

export async function putFollow(id) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${api}/users/follow/${id}`, {
		method: "put",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function putUnfollow(id) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${api}/users/unfollow/${id}`, {
		method: "put",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function fetchFollowers(id) {
	const res = await fetch(`${api}/users/followers/${id}`);
	if (!res.ok) return [];

	const user = await res.json();
	return user.followers || [];
}

export async function fetchFollowing(id) {
	const res = await fetch(`${api}/users/following/${id}`);
	if (!res.ok) return [];

	const user = await res.json();
	return user.following || [];
}

export async function fetchUser(id) {
	const res = await fetch(`${api}/users/${id}`);
	if (!res.ok) return false;

	return await res.json();
}

export async function fetchUploadPhoto(id, formData) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${api}/users/photo/${id}`, {
		method: "post",
		body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
	});

	return res.ok;
}

export async function fetchUploadCover(id, formData) {
	const token = localStorage.getItem("token");

	const res = await fetch(`${api}/users/cover/${id}`, {
		method: "post",
		body: formData,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function fetchSearch(q) {
	const res = await fetch(`${api}/users/profile/search?q=${q}`);
	if (!res.ok) return false;

	return await res.json();
}
