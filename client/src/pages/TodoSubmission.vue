<template>
  <div class="flex flex-center">
    <form id="todo-submit">
        <input v-model="title">
        <button type="submit" form="todo-submit" @click="submitTodo">Submit Todo</button>
    </form>
  </div>
</template>

<script>
import axios from '../axios'

export default {
    name: 'IndexPage',
    data(){
        return {
            title: undefined,
        }
    },
    methods: {
        submitTodo(e){
            e.preventDefault()
            console.log('Submit Todo: ', this.title)

            axios.post('/api/todos', {title:this.title}).then(_=>{
                alert('Todo submitted!')
            }).catch(err=>{
                alert(`Error submitting Todo: ${err.msg}`)
            })
        }
    },
}
</script>