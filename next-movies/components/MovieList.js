import Link from "next/link";

export default function MovieList({ movies }) {
	const poster = "http://image.tmdb.org/t/p/w342";

	return (
		<div className="flex flex-wrap gap-4 justify-evenly">
			{movies.map(movie => {
				return (
					<div
						className="w-[200px] text-center"
						key={movie.id}>
						<Link href={`/movie/${movie.id}`}>
							<img
								className="hover:scale-105 transition-all"
								src={poster + movie.poster_path}
							/>
						</Link>
						<div className="mt-2">{movie.title}</div>
						<span className="text-gray-600">
							{movie.release_date.split("-")[0]}
						</span>
					</div>
				);
			})}
		</div>
	);
}
