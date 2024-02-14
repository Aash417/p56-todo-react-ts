import { FC, createContext, useContext, useEffect, useState } from 'react';

export interface Todo {
	id: number;
	todo: string;
	completed: boolean;
}
interface TodoContextValue {
	todos: Todo[];
	addTodo: (todo: Todo) => void;
	updateTodo: (id: number, updatedTodo: Todo) => void;
	deleteTodo: (id: number) => void;
	toggleComplete: (id: number) => void;
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
export const TodoContext = createContext<TodoContextValue>({});

interface MyContextProviderProps {
	children: React.ReactNode;
}
export const TodoProvider: FC<MyContextProviderProps> = ({ children }) => {
	const [todos, setTodos] = useState<Array<Todo>>([
		{
			id: 1,
			todo: 'Todo msg',
			completed: false,
		},
	]);
	useEffect(() => {
		let localData: string;
		const getL = localStorage.getItem('todos');
		if (getL) {
			localData = JSON.parse(getL);
			if (localData && localData.length > 0) setTodos(todos);
		}
	}, [setTodos]);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	function addTodo(todo: Todo): void {
		setTodos((pvev) => [...pvev, { ...todo, id: Date.now() }]);
	}
	function updateTodo(id: number, todo: Todo): void {
		setTodos((prev) =>
			prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
		);
	}
	function deleteTodo(id: number): void {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	}
	function toggleComplete(id: number): void {
		setTodos((prev) =>
			prev.map((prevTodo) =>
				prevTodo.id === id
					? { ...prevTodo, completed: !prevTodo.completed }
					: prevTodo
			)
		);
	}

	return (
		<TodoContext.Provider
			value={{
				todos,
				setTodos,
				addTodo,
				updateTodo,
				deleteTodo,
				toggleComplete,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export function useTodo() {
	const context = useContext(TodoContext);
	if (!context )
		throw new Error('context used outside todoContext');

	return context;
}
