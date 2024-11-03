"use client";
import { useState } from 'react'


export default function todoList() {
    // [상태변경 전, 후]
    const [todo, setTodo] = useState<string>(''); // 입력값
                                // <문자열이 배열>(빈배열로 초기화)
    const [todos, setTodos] = useState<string[]>([]); // 출력값
    

    // 추가
    const addTodo = () => {
        // trim(): 앞뒤 공백 제거
        if(todo.trim()!=='') return;
            
    }

    // 제거
    const deleteTodo = () => {

    }
    // 편집
    const editTodo = () => {

    }

    return (
        <div>
            <div>
                <h1>To-do List</h1>
                <hr />
                <input type='text' value={todo} placeholder='To-do input' />
                <button>Add</button>
            </div>
            <div>
                <span></span>
                <button>edit</button>
                <button>delete</button>
            </div>
        </div>
    )
};
