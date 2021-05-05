<template>
  <div class="full-width flex row justify-around">
    <p>Title: {{ title }}</p>
    <p>Author: {{ author }}</p>
    <button @click="onEdit">Edit</button>
    <button @click="onDelete">Delete</button>
  </div>
</template>

<script>

export default {
    name: 'TodoItem',
    props: {
        title: String,
        author: String
    },
    methods:{
        onEdit(e){
            const newTitle = prompt('Enter new title')
            if(newTitle != null){
                this.$emit('editTodo', newTitle)
            }
        },
        onDelete(e){
            this.$emit('deleteTodo')
        }
    }
}
</script>
