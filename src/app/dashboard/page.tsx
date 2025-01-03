"use client";
import { useState } from 'react'

interface Todo {
    id: number;    // 각 할 일의 고유 식별자
    text: string;  // 할 일 내용
    isDone: boolean; // 완료 여부
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
            isDone: false,
            isEdit: false,
        }
        // setTodos([...todos, newItem]);이 안되는 이유는 사용되는 '시점'과 '맥락'이 달라서 단순 실행만 된다.
        // 아래의 방식으로 하면 react가 값을 추적해서 업데이트한다.
        // setTodos(prevTodos => [...prevTodos, Todo]);가 안되는 것은 Todo는 배열이 아닌 객체이기 때문에 안됨.
        setTodos(prevTodos => [...prevTodos, newItem]);
        setNextId(prevId => prevId + 1);
        setTodo(''); // 입력필드 초기화

    }

    // 체크
    const handleToggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id
                // ...: 스프레드 연산자 - 기존의 모든 속성 복사
                ? { ...todo, isDone: !todo.isDone }  // isDone 상태 반전
                : todo
        ));
    };

    // 편집
    const handleEditTodo = (id: number) => {
        // 항목의 todo를 찾아서 EditText에 담기
        const editingTodo = todos.find(todo => todo.id === id);
        if (editingTodo) {
            // 매번 원래 todo의 text로 덮어씌워서 handleCancelTodo에서 setEditText(''); 과정이 필요없음
            setEditText(editingTodo.text);
            setTodos(todos.map(todo =>
                id === todo.id
                    // 수정 모드
                    ? { ...todo, isEdit: true }
                    // 텍스트 모드
                    : { ...todo, isEdit: false }
            ));
        }
    };

    // 업데이트
    const handleUpdateTodo = (id: number, editText: string) => {
        setTodos(
            // map - 각 항목을 순회하면서 일부 항목을 변경하기 위해 업데이트에 자주 사용
            todos.map(todo =>
                todo.id === id ? { ...todo, text: editText, isEdit: false } : todo
            )
        );
    };

    // 취소
    const handleCancelTodo = (id: number) => {
        setTodos(
            // map - isEdit 변경
            todos.map(todo =>
                todo.id === id ? { ...todo, isEdit: false } : todo
            )
        );
    };

    // 제거
    const handleDeleteTodo = (id: number) => {
        // filter(제거) - 조건을 만족하는 요소를 제외한 나머지 요소들을 새로운 배열로 반환
        setTodos(todos.filter(todo => todo.id !== id));
    };


    return (
        // <div>
        <>
            <h1>Enter your to-do</h1>
            <hr />
            <div className='add_todo'>
            <input
                type='text'
                placeholder='To-Do'
                // 화면에 띄우기: 변수 사용
                value={todo}
                // 행동: 함수 호출
                onChange={(e) => setTodo(e.target.value)}
                // 괄호 있음: "조건이 맞으면 바로 이 함수 실행하세요"라고 직접 지시하기
                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()} />
            {/* 괄호 없음: "이따가 클릭하면 이 함수 실행해주세요"라고 메모 남기기 */}
            <button onClick={handleAddTodo}>Add</button>
            </div>
            {/********************************************************************************/}
            {todos.map(todo => (
                <div className='list' key={todo.id}>
                    <input
                        type='checkbox'
                        // 편집여부랑 체크박스 상태 상관없음
                        checked={todo.isDone}
                        onChange={() => handleToggleTodo(todo.id)} />
                    {todo.isEdit ? (
                        <>
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
                            <button onClick={() => handleCancelTodo(todo.id)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <span
                                style={{
                                    textDecoration: todo.isDone ? 'line-through' : 'none',
                                    color: todo.isDone ? 'gray' : 'black'
                                }}>
                                {todo.text}
                            </span>
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
