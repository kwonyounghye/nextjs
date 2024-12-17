"use client";
import { useState } from 'react'

interface Todo {
    id: number;    // 각 할 일의 고유 식별자
    text: string;  // 할 일 내용
    // isDone: boolean; // 완료 여부
    isEdit: boolean;  // 편집 여부
}

export default function TodoList() {
    // [상태변경 전, 후]
    const [todo, setTodo] = useState<string>(''); // 입력값
    // <문자열이 배열>(빈배열로 초기화) / todos는 Todo배열 안에 있는 객체만 받을 수 있음
    const [todos, setTodos] = useState<Todo[]>([]); // 출력값
    const [nextId, setNextId] = useState<number>(1); // 다음에 추가될 할 일의 ID를 관리
    const [editText, setEditText] = useState<string>('');

    // 추가
    const handleAddTodo = () => {
        // trim(): 앞뒤 공백 제거
        if (todo.trim() === '') return;
        const newItem: Todo = {
            id: nextId,
            text: todo,
            // isDone: false,
            isEdit: false,
        }
        // setTodos([...todos, newItem]);이 안되는 이유는 사용되는 '시점'과 '맥락'이 달라서 단순 실행만 된다.
        // 아래의 방식으로 하면 react가 값을 추적해서 업데이트한다.
        // setTodos(prevTodos => [...prevTodos, Todo]);가 안되는 것은 Todo는 배열이 아닌 객체이기 때문에 안됨.
        setTodos(prevTodos => [...prevTodos, newItem]); // Todo 객체 추가
        setNextId(nextId + 1); // 다음 ID 준비
        setTodo(''); // 입력필드 초기화

    }

    // 이행여부
    // const toggleTodo = () => {

    // }

    // 편집
    const handleEditTodo = (id: number) => {
        setTodos(todos.map(todo =>
            id === todo.id
                // 수정 모드
                ? { ...todo, isEdit: true }
                // 텍스트 모드
                : { ...todo, isEdit: false }
                ));
                setTodo(todo);
                setEditText('');

    };
    // 업데이트
    const handleUpdateTodo = (id: number, editText: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, text: editText, isEdit: false } : todo,
                todos.find(todo => todo.id === id)
            )
        );
    };
    const handleCancelTodo = (id: number, currentText: string) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, text: currentText, isEdit: false } : todo
            )
        );
    };

    // 제거
    const handleDeleteTodo = (nextId: number) => {
        setTodos(todos.filter(todo => todo.id !== nextId));
    };


    return (
        // <div>
        <>
            <h1>Enter your to-do</h1>
            <hr />
            <input
                type='text'
                placeholder='To-Do'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} />
            <button onClick={handleAddTodo}>Add</button>
            {/********************************************************************************/}
            {todos.map(todo => (
                <div key={todo.id}>
                    {todo.isEdit ? (
                        <>
                            <input type='checkbox' />
                            <input 
                                type='text'
                                value={editText} 
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUpdateTodo(todo.id, editText);
                                    }
                            }} />
                            <button onClick={() => handleUpdateTodo(todo.id, editText)}>Update</button>
                            <button onClick={() => handleCancelTodo(todo.id, todo.text)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <input type='checkbox' />
                            <span>{todo.text}</span>
                            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                        </>
                    )}
                </ div>
            ))}
        {/* </div> */}
        </>
    )
};
