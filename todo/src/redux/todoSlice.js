import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

var todoList = [
	{
		id: 1,
		task: 'Breakfast'
	},
	{
		id: 2,
		task: 'Lunch'
	},
	{
		id: 3,
		task: 'Dinner'
	}
];
export const getTodoList = createAsyncThunk(
	'todos/getTodoList',
	async () => {
		let todos = fetchTodoList();
		return { todos }
	}
);
const fetchTodoList = () => {
	let tList = todoList;
	let temp = localStorage.getItem("TODOS");
	console.log("TEMP", temp);
	if (temp === null) {
		localStorage.setItem("TODOS", JSON.stringify(todoList));
	} else {
		tList = JSON.parse(temp);
	}
	console.log("todoList", tList);
	return tList;
}
const saveTodoList = (tl) => {
	localStorage.setItem("TODOS", JSON.stringify(tl));
}
const pushTodo = (todo) => {
	console.log("pushTodo", todo)

	let temp = fetchTodoList();

	const item = { id: todo.id, task: todo.task };
	temp.push(item);
	saveTodoList(temp);

	console.log("temp", temp);

	return todo;
}
export const addTodoItem = createAsyncThunk(
	'todos/addTodoItem',
	async (payload) => {
		const todo = pushTodo({ task: payload.task, id: new Date().getTime() });
		console.log("TODO: ", todo);
		console.log("TODOS", todoList);

		console.log("TODO ADDED: ", todo);
		return { todo };
	}
);

export const deleteTodoItem = createAsyncThunk(
	'todos/deleteTodoItem',
	async (payload) => {
		let todos = fetchTodoList();
		let temp = [];

		todos.forEach((item) => {
			if (item.id !== payload.id) {
				temp.push(item);
			} else {
				console.log("DELETING ", item);
			}
		});
		saveTodoList(temp);

		return { id: payload.id };
	}
);

export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: new Date().getTime(),
				task: action.payload.task

			};
			state.push(todo);
		},

		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
	extraReducers: {
		[getTodoList.fulfilled]: (state, action) => {
			return action.payload.todos;
		},
		[addTodoItem.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},

		[deleteTodoItem.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;