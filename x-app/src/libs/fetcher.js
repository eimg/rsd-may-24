const api = import.meta.env.VITE_API;

export async function getPosts() {
    const res = await fetch(`${api}/posts`);

    if(res.ok) {
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
