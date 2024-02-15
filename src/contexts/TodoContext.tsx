/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, createContext, useContext, useEffect, useState } from 'react';

export interface TodoType {
	id: number;
	todo: string;
	completed: boolean;
}
interface TodoContextValue {
	todos: TodoType[];
	addTodo: (todo: TodoType) => void;
	updateTodo: (id: number, updatedTodo: TodoType) => void;
	deleteTodo: (id: number) => void;
	toggleComplete: (id: number) => void;
	setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}
// initial values for the context
const initialTodoContextValue: TodoContextValue = {
	todos: [],
	addTodo: (_todo) => {},
	updateTodo: (_id, _updatedTodo) => {},
	deleteTodo: (_id) => {},
	toggleComplete: (_id) => {},
	setTodos: () => {},
};

export const TodoContext = createContext<TodoContextValue>(
	initialTodoContextValue
);

interface MyContextProviderProps {
	children: React.ReactNode;
}
export const TodoProvider: FC<MyContextProviderProps> = ({ children }) => {
	const [todos, setTodos] = useState<Array<TodoType>>([]);

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos && todos.length > 0) setTodos(todos);
	}, []);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	function addTodo(todo: TodoType): void {
		setTodos((pvev) => [...pvev, { ...todo }]);
	}
	function updateTodo(id: number, todo: TodoType): void {
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

// eslint-disable-next-line react-refresh/only-export-components
export function useTodo() {
	const context = useContext(TodoContext);
	if (!context) throw new Error('context used outside todoContext');

	return context;
}
