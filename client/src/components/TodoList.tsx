import { useDispatch, useSelector } from 'react-redux'
import ListHeader from './ListHeader'
import List from './List'
import {
  addItem,
  getTodos,
  markItemAsDone,
  removeItem,
} from '../store/actions/todo'
import { useEffect, useState } from 'react'
import { RootState } from '../store/reducers'

function TodoList() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState<string>('')

  const todo: any = useSelector((state: RootState) => state.todo)

  const addItemToList = () => {
    if (!title) return

    dispatch(addItem(title))
    setTitle('')
  }

  const removeItemFromList = (item_id: string) => {
    dispatch(removeItem(item_id))
  }

  const toggleItemDone = (item_id: number) => {
    dispatch(markItemAsDone(item_id))
  }

  useEffect(() => {
    dispatch(getTodos())
  })

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg rounded-lg w-[500px]">
        <ListHeader
          addItemToList={addItemToList}
          title={title}
          setTitle={setTitle}
        />
        {todo.error !== '' && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5 mr-8 ml-8"
            role="alert"
          >
            <span className="block sm:inline">{todo.error}</span>
          </div>
        )}
        <List
          list={todo.todo_list}
          removeItemFromList={removeItemFromList}
          toggleItemDone={toggleItemDone}
        />
      </div>
    </div>
  )
}

export default TodoList
