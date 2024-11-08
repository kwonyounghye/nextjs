"use client";
import { useState } from 'react'


export default function TodoList() {

    interface Todo {
        id: number;    // 각 할 일의 고유 식별자
        text: string;  // 할 일 내용
        completed: boolean;  // 완료 여부
    }
    
    // [상태변경 전, 후]
    const [todo, setTodo] = useState<string>(''); // 입력값
    // <문자열이 배열>(빈배열로 초기화)
    const [todos, setTodos] = useState<string[]>([]); // 출력값
    const [nextId, setNextId] = useState(1); // 다음에 추가될 할 일의 ID를 관리
    
    // 추가
    const addTodo = () => {
        // trim(): 앞뒤 공백 제거
        if (todo.trim() === '') return;
        setTodos([...todos, todo])
        setNextId(nextId + 1); // 다음 ID 준비
        setTodo('') // 입력필드 초기화

    }

    // 이행여부
    // const toggleTodo = () => {

    // }

    // 제거
    // const deleteTodo = () => {

    // }
    // 편집
    // const editTodo = () => {

    // }

    return (
        <div>
            <div key={todo}>
                <h1>Enter your to-do</h1>
                <hr />
                <input
                    type='text'
                    placeholder='To-Do' 
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()} />
                <button onClick={addTodo}>Add</button>
           
                    {todos.map(todo => (
                    <>
                <input type='checkbox' />
                <span>{todo}</span>
                <button>Edit</button>
                <button>Delete</button>
                </>
                ))}
            </div>
        </div>
    )
};
