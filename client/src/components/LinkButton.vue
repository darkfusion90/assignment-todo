<template>
    <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        no-caps
        v-bind:to="to"
        v-bind:label="label"
    />
</template>

<script>
export default {
    name: 'LinkButton',
    props: {
        label: String,
        to: String
    }
}
</script>