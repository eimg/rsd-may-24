export default function Item({ item }) {
	return (
		<li>
			{item.name} ({item.price})
		</li>
	);
}
