import { useSelector } from "react-redux";

export default function Header() {
    const count = useSelector(state => state.todo.tasks.length);

    return <h1>Redux Todo ({count})</h1>;
}
