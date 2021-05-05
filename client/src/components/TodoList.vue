<template>
  <div v-if="!todos || !todos.length">No todo items to show</div>
  <div v-else class="flex flex-center column">
    <TodoItem
        v-for="todo in todos"
        v-bind:key="todo.id"
        v-bind:title="todo.title"
        v-bind:author="todo.author"
        @deleteTodo="onDeleteTodo(todo.id)"
        @editTodo="onEditTodo(todo.id, ...arguments)"
    ></TodoItem>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import axios from '../axios'

export default {
    name: 'TodoList',
    components: {
        TodoItem
    },
    data(){
        return {
            todos: []
        }
    },
    mounted(){
        this.fetchTodos()
    },
    methods:{
        onEditTodo(todoId, newTitle){
            axios.patch(`/api/todos/${todoId}`, {title: newTitle})
                .then(_=>{
                    this.fetchTodos()
                })
        },
        onDeleteTodo(todoId){
            axios.delete(`/api/todos/${todoId}`)
            this.fetchTodos()
        },
        fetchTodos(){
            axios.get('/api/todos')
            .then(res=>{
                this.todos = res.data
            }).catch(err=>{
                alert(`Error getting todos: ${err}`)
            })
        }
    }
}
</script>
