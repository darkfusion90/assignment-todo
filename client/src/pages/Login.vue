<template>
  <div class="flex flex-center">
    <form id="login">
        <input v-model="username">
        <input v-model="password" type="password">
        <button type="submit" form="login" @click="loginUser">Login</button>
    </form>
  </div>
</template>

<script>
import login from '../login'

export default {
    name: 'IndexPage',
    data(){
        return {
            username: undefined,
            password: undefined
        }
    },
    methods: {
        loginUser(e){
            e.preventDefault()
            console.log({username: this.username, password: this.password})
            login(this.username, this.password)
                .then(_=>{
                    this.$router.push('/todo-submit')
                })
        }
    }
}
</script>