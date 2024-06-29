import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function App() {
    const nameInput = useRef();

    const queryClient = useQueryClient();

    const { isLoading, isError, error, data } = useQuery("tasks", async () => {
        const res = await fetch("http://localhost:8888/tasks");
        return res.json();
    });

    const add = useMutation(
		async name => {
			const res = await fetch("http://localhost:8888/tasks", {
				method: "POST",
				body: JSON.stringify({ name }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			return res.json();
		},
		{
			onSuccess: task => {
				// queryClient.cancelQueries("tasks");
				queryClient.setQueryData("tasks", old => [...old, task]);
			},
		}
	);

    const remove = useMutation(async id => {
        const res = await fetch(`http://localhost:8888/tasks/${id}`, {
            method: "DELETE",
        });

        return res.json();
    }, {
        onMutate: async id => {
            queryClient.cancelQueries("tasks");
            queryClient.setQueryData("tasks", old => {
                return old.filter(item => item._id !== id);
            });
        }
    });

    if(isLoading) {
        return <div>Loading...</div>;
    }

    return <div>
        <h1>Todo</h1>
        <form onSubmit={e => {
            e.preventDefault();
            const name = nameInput.current.value;
            add.mutate(name);
            e.currentTarget.reset();
        }}>
            <input type="text" ref={nameInput} />
            <button>Add</button>
        </form>
        <ul>
            {data.map(item => {
                return <li key={item._id}>
                    <button onClick={() => remove.mutate(item._id)}>Delete</button>
                    {item.name}
                </li>
            })}
        </ul>
    </div>
}