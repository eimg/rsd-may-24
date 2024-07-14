import { Badge } from "@/components/ui/badge";

import Link from "next/link";

const token = process.env.TMDB_TOKEN;

async function fetchMovie(id) {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return await res.json();
}

async function fetchCredits(id) {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return await res.json();
}

export default async function Movie({ params }) {
	const { id } = params;
	const movie = await fetchMovie(id);
	const credits = await fetchCredits(id);

	const backdrop = "http://image.tmdb.org/t/p/w1280";
	const profile = "http://image.tmdb.org/t/p/w185";

	return (
		<>
			<h2 className="mb-4">
				{movie.title} ({movie.release_date.split("-")[0]})
			</h2>
			<div className="flex gap-2 mb-4">
				{movie.genres.map(genre => {
					return <Badge key={genre.id}>{genre.name}</Badge>;
				})}
			</div>
			<div>
				<img
					className="w-full"
					src={backdrop + movie.backdrop_path}
				/>
			</div>
			<div className="my-4">{movie.overview}</div>

			<h3 className="mb-4 border-b pb-2">Casts</h3>
			<div className="flex flex-wrap gap-4 justify-evenly">
				{credits.cast.map(person => {
					return (
						<div
							key={person.id}
							className="w-[185px] text-center flex flex-col gap-2 border justify-between">
							{person.profile_path ? (
								<img src={profile + person.profile_path} />
							) : (
								<div></div>
							)}

							<div>
								<b className="block">
									<Link href={`/person/${person.id}`}>
										{person.name}
									</Link>
								</b>
								<span className="text-gray-500">
									{person.character}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
