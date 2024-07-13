import MovieList from "@/components/MovieList";

async function fetchPopular() {
	const token = process.env.TMDB_TOKEN;

	const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return await res.json();
}

export default async function Home() {
    const popular = await fetchPopular();
	
    return (
		<>
			<h2 className="text-lg font-bold mb-4 pb-2 border-b">Popular</h2>
			<MovieList movies={popular.results} />
		</>
	);
}
