import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

async function handleSearch(formData) {
    "use server"
    const q = formData.get("q");
    redirect(`/search?q=${q}`);
}

export default function Header() {
    return (
		<nav className="border rounded mb-4 px-4 py-2 flex justify-between">
			<h1 className="font-bold text-lg">Next Movies</h1>
            <form action={handleSearch} className="flex gap-2">
                <Input name="q" placeholder="Search" />
                <Button>Search</Button>
            </form>
		</nav>
	);
}
