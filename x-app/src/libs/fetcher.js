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
    const token = localStorage.getItem("token");
    const res = await fetch(`${api}/posts/${id}`);
    return await res.json();
}
