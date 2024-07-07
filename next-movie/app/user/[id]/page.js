import Link from "next/link";

export default function User({ params }) {
    const { id } = params;

	return (
		<div className="max-w-md mx-auto mt-4">
			<h1 className="text-lg font-bold">User Page</h1>
			<div className="bg-gray-500 h-[200px] rounded-lg"></div>
			<Link
				href="/"
				className="text-blue-600">
				Home ({id})
			</Link>
		</div>
	);
}
