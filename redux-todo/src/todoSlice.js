import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("todo/fetch", async () => {
	const res = await fetch("http://localhost:8888/tasks");
    return await res.json();
});

export const addTask = createAsyncThunk("todo/add", async name => {
	const res = await fetch(`http://localhost:8888/tasks`, {
		method: "POST",
		body: JSON.stringify({ name }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return await res.json();
});

export const deleteTask = createAsyncThunk("todo/delete", async (id) => {
    await fetch(`http://localhost:8888/tasks/${id}`, {
        method: "DELETE",
    });

    return id;
});

export const todoSlice = createSlice({
	name: "todo",
	initialState: {
        status: "idle",
		tasks: [],
	},
	reducers: {
		add: (state, action) => {
			state.tasks = [action.payload, ...state.tasks];
		},
		del: (state, action) => {
			state.tasks = state.tasks.filter(
				item => item.id !== action.payload
			);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.tasks = action.payload;
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks = [action.payload, ...state.tasks];
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.tasks = state.tasks.filter(
					item => item._id !== action.payload
				);
			});
	},
});

export const { add, del } = todoSlice.actions;
export default todoSlice.reducer;
