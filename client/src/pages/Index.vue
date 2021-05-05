<template>
  <div>
    <LinkButton label='Admin' to='/admin' />
    <LinkButton label='Login' to='/login' />
    <LinkButton label='Register' to='/register' />
    <LinkButton label='Submit Todo' to='/todo-submit' />
  </div>
</template>

<script>
import LinkButton from '../components/LinkButton'

export default {
    components: {
        LinkButton
    },
    name: 'IndexPage'
}
</script>

