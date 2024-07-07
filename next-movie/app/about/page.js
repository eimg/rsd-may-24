import Link from "next/link";

export default function About() {
	return (
		<div className="max-w-md mx-auto mt-4">
			<h1 className="text-lg font-bold">About Page</h1>
			<div className="bg-gray-500 h-[200px] rounded-lg"></div>
			<Link
				href="/"
				className="text-blue-600">
				Home
			</Link>
		</div>
	);
}
