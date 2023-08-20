import React from 'react'
import { api } from "../utils/api";
import Todo from './Todo'

const Todos = () => {
  const{data:todos, isLoading,isError}=api.todo.all.useQuery()
  if(isLoading)return <div>loading Todos</div>
  if(isError)return <div>Error loading Todos</div>
  return (
    <>
    {todos.length ? todos.map(todo=>{
      return <Todo key={todo.id} todo={todo}/>
    }): 'Create your first todo...'}
    </>
  )
}

export default Todos
