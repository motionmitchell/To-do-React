import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodoItem } from '../redux/todoSlice';

const TodoItem = ({ id, task, completed }) => {
	const dispatch = useDispatch();

	const handleDeleteClick = () => {
		dispatch(deleteTodoItem({ id }));
	};

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					
					{task}
				</span>
				<button onClick={handleDeleteClick} className='btn btn-danger'>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoItem;