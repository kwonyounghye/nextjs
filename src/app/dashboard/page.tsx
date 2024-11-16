"use client";
import { useState } from 'react'

interface Todo {
    id: number;    // 각 할 일의 고유 식별자
    text: string;  // 할 일 내용
    // isDone: boolean; // 완료 여부
    // isEdit: boolean;  // 편집 여부
}

export default function TodoList() {
    // [상태변경 전, 후]
    const [todo, setTodo] = useState<string>(''); // 입력값
    // <문자열이 배열>(빈배열로 초기화) / todos는 Todo배열 안에 있는 객체만 받을 수 있음
    const [todos, setTodos] = useState<Todo[]>([]); // 출력값
    const [nextId, setNextId] = useState(1); // 다음에 추가될 할 일의 ID를 관리

    // 추가
    const handleAddTodo = () => {
        // trim(): 앞뒤 공백 제거
        if (todo.trim() === '') return;
        const newItem: Todo = {
            id: nextId,
            text: todo,
            // isDone: false,
            // isEdit: false,
        }
        // setTodos([...todos, newItem]);이 안되는 이유는 사용되는 '시점'과 '맥락'이 달라서 단순 실행만 된다.
        // 아래의 방식으로 하면 react가 값을 추적해서 업데이트한다.
        // etTodos(prevTodos => [...prevTodos, Todo]);가 안되는 것은 Todo는 배열이 아닌 객체이기 때문에 안됨.
        setTodos(prevTodos => [...prevTodos, newItem]); // Todo 객체 추가
        setNextId(nextId + 1); // 다음 ID 준비
        setTodo('') // 입력필드 초기화
    }

    // 이행여부
    // const toggleTodo = () => {

    // }

    // 제거
    const handleDeleteTodo = () => {
        // setTodos()
    }

    // 편집
    // const editTodo = () => {

    // }

    return (
            <div>
                <h1>Enter your to-do</h1>
                <hr />
                <input
                    type='text'
                    placeholder='To-Do'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} />
                <button onClick={handleAddTodo}>Add</button>
                {todos.map(todo => (
                    <div key={todo.id}>
                        <input type='checkbox' />
                        <span>{todo.text}</span>
                        <button>Edit</button>
                        <button>Delete</button>
                    </ div>
                ))}
            </div>
    )
};
