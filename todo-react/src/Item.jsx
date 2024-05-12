export default function Item({ item, remove, toggle }) {
	return (
		<li>
			{item.done ? (
				<button onClick={() => toggle(item.id)}>Undo</button>
			) : (
				<button onClick={() => toggle(item.id)}>Done</button>
			)}

			{item.name}
			<button onClick={() => remove(item.id)}>Del</button>
		</li>
	);
}
