import { useState } from "react";

import Item from "./Item";

export default function App() {
    const [data, setData] = useState([
		{ id: 1, name: "Apple", price: 0.99 },
		{ id: 2, name: "Orange", price: 0.99 },
		{ id: 3, name: "Milk", price: 0.99 },
	]);

    const add = () => {
        setData([ ...data, {id: 4, name: 'Butter', price: 1.99} ]);
    }

    return <div>
        <h1>Todo</h1>
        <ul>
            {data.map(item => {
                return <Item key={item.id} item={item} />
            })}
        </ul>
        <button onClick={add}>Add</button>
    </div>
}
