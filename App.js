import { useState, useCallback } from 'react'
import TodoList from './components/TodoList'
import './App.css'

const List = () => {
  const [input, setInput] = useState('') // 입력값
  const [add, setAdd] = useState([]) // 결과값
  const [, setEdit] = useState(null) // 편집중?

  // 입력된 값을 가져와서 그 값을 리스트에 넣는다.
  const handleChange = useCallback((e) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      setInput('') // input value값 초기화
      setAdd((items) => [...items, input]) // items은 입력된 모든 요소, input은 새로 입력된 요소
      // submit 이벤트는 브라우저 새로고침 발생시킴
      e.preventDefault()
    },

    [input]
  )

  const handleRemove = useCallback(
    (id) => {
      // item:현재 요소, index: 현재 요소의 위치 / item, index, id의 관계?
      setAdd((items) => items.filter((item, index) => index !== id)) // id가 고유값인데 index가 왜 필요한 것인지?: filter 메서드를 통하여 새로운 배열을 만들었기에 새로운 변수가 필요함, id는 각 항목의 고유한 식별자이고 index는 전체에서의 인덱스이다. / item은 왜 읽히지 않으면서 있어야하는건지?: filter 메서드의 콜백함수가 두 개의 매개변수를 받기 때문에 포함
    },
    [add] // useCallback은 [add]값이 변경될 때만 새로운 함수 생성
  )

  const handleEdit = useCallback((id, value) => {
    const update = prompt('Edit To-Do')
    if (update !== null && update.trim() !== '') {
      setAdd((items) =>
        items.map((item, index) => (index === id ? update : item))
      )

      // setInput(value)
      setEdit(value)
    }
  })

  // const list = useState('')

  return (
    <div className="container">
      <p>TODO LIST</p>
      <hr color="rgb(213, 177, 247)" />
      <div className="input">
        <input
          value={input}
          placeholder="add item . . . "
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          ADD
        </button>
      </div>
      <div className="list">
        <TodoList
          add={add}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  )
}

export default List
