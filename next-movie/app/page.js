import Link from "next/link";

export default function Home() {
    return (
		<div className="max-w-md mx-auto mt-4">
			<h1 className="text-lg font-bold">Home Page</h1>
			<div className="bg-gray-500 h-[200px] rounded-lg"></div>
            <Link href="/about" className="text-blue-600">About</Link> | 
            <Link href="/user/123" className="text-blue-600">User 123</Link>
		</div>
	);
}