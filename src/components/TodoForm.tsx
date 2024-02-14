import { FormEvent, useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
	const [newTodo, setNewTodo] = useState<string>('');
	const { addTodo } = useTodo();

	const add = (e) => {
		e.preventDefault();
		console.log(newTodo);
		addTodo({ id: Date.now(), todo: newTodo, completed: false });
	};

	return (
		<form className='flex' onSubmit={add}>
			<input
				type='text'
				placeholder='Write Todo...'
				className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
			/>
			<button
				type='submit'
				className='rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0'
			>
				Add
			</button>
		</form>
	);
}

export default TodoForm;
