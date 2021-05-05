<template>
  <div>
    <div v-if='checkingAdmin'>Checking if you are admin...</div>
    <div v-else-if='isAdmin'>
    <p>Admin: Todo List of Users</p>
    <br>
    <TodoList></TodoList>
    </div>
    <div v-else>Sorry! You are not admin. Please login as admin to access</div>
  </div>
</template>

<script>
import TodoList from '../components/TodoList'
import axios from '../axios'

export default {
    components: {
        TodoList
    },
    name: 'AdminPage',
    data(){
        return {
            checkingAdmin: true,
            isAdmin: false
        }
    },
    mounted(){
        console.log('Mounted. check admin')
        axios.get('/check-admin')
            .then(res=>{
                this.isAdmin = res.data.isAdmin
            })
            .catch(err=>{
                alert('Error checking admin')
            })
            .finally(_=>{
                this.checkingAdmin = false
            })
    },
}
</script>
