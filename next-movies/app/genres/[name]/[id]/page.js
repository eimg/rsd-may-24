import MovieList from "@/components/MovieList";

async function fetchGenre(id) {
	const token = process.env.TMDB_TOKEN;

	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return await res.json();
}

export default async function Genre({ params }) {
    const { name, id } = params;
	const genre = await fetchGenre(id);

	return (
		<>
			<h2 className="text-lg font-bold mb-4 pb-2 border-b">{name}</h2>
			<MovieList movies={genre.results} />
		</>
	);
}
