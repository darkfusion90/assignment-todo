<template>
  <div class="flex flex-center">
    <form id="register">
        <input v-model="username">
        <input v-model="password" type="password">
        <button type="submit" form="register" @click="registerUser">Register</button>
    </form>
  </div>
</template>

<script>
import axios from '../axios'

export default {
    name: 'IndexPage',
    data(){
        return {
            username: undefined,
            password: undefined
        }
    },
    methods: {
        registerUser(e){
            e.preventDefault()
            
            axios.post('/register/users', {username: this.username, password: this.password})
                .then(_=>{
                    alert('Registration done! Please Login now')
                    this.$router.push('/login') 
                })
                .catch(err=>{
                    console.log(err)
                    alert(`Error registering: ${err}`)
                })
        }
    }
}
</script>