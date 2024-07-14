const token = process.env.TMDB_TOKEN;

async function fetchPerson(id) {
	const res = await fetch(`https://api.themoviedb.org/3/person/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return await res.json();
}

export async function GET(req, { params }) {
    const { id } = params;
    const person = await fetchPerson(id);

    return Response.json(person);
}
