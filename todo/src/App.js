import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
	return (
		<div className='container bg-white p-4 mt-5'>
			<h1>Todo List:</h1>
			<TodoForm />
			<TodoList />
			
		</div>
	);
};

export default App;