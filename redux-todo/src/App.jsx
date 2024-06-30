import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, addTask } from "./todoSlice";

import { useEffect, useRef } from "react";
import Header from "./Header";

export default function App() {
    const nameInput = useRef();
    const dispatch = useDispatch();
    const data = useSelector(state => state.todo.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    return <div>
        <Header />
        <form onSubmit={e => {
            e.preventDefault();
            const name = nameInput.current.value;
            dispatch(addTask(name));
            e.currentTarget.reset();
        }}>
            <input type="text" ref={nameInput} />
            <button>Add</button>
        </form>
        <ul>
            {data.map(item => {
                return <li key={item._id}>
                    <button onClick={() => dispatch(deleteTask(item._id))}>
                        Delete
                    </button>
                    {item.name}
                </li>
            })}
        </ul>
    </div>
}