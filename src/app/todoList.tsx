import { useState } from 'react'


export default function todoList() {
    // [상태변경 전, 후]
    const [todo, setTodo] = useState<string>(''); // 입력값
                                // <문자열이 배열>(빈배열로 초기화)
    const [todos, setTodos] = useState<string[]>([]); // 출력값
    

    // 추가
    const addTodo = () => {
        if(todo.trim()=='') {
            // setTodos([...todos, setTodo]);
        }
    }

    // 제거
    const deleteTodo = () => {

    }
    // 편집
    const editTodo = () => {

    }
}