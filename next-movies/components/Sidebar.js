import { Button } from "@/components/ui/button";
import Link from "next/link";

async function fetchGenres() {
    const token = process.env.TMDB_TOKEN;

    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return await res.json();
}

export default async function Sidebar() {
    const data = await fetchGenres();

    return (
		<aside className="w-[220px] flex flex-col gap-1">
			<Button
				variant="outline"
				className="justify-start"
				asChild>
				<Link href="/">All Movies</Link>
			</Button>

			{data.genres.map(genre => {
                return (
					<Button
                        key={genre.id}
						variant="outline"
						className="justify-start"
						asChild>
						<Link href={`/genres/${genre.name}/${genre.id}`}>
                            {genre.name}
                        </Link>
					</Button>
				);
            })}
		</aside>
	);
}
