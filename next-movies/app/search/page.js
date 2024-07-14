import MovieList from "@/components/MovieList";

const token = process.env.TMDB_TOKEN;

async function fetchSearch(q) {
	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${q}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return await res.json();
}

export default async function Search({ searchParams }) {
	const { q } = searchParams;
	const search = await fetchSearch(q);

	return (
		<>
			<h2 className="text-lg font-bold mb-4 pb-2 border-b">
                Search: {q}
            </h2>
			<MovieList movies={search.results} />
		</>
	);
}
