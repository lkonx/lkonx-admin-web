<template>
    <div class="">
        {{message}}
    </div>
</template>

<script>
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        name: 'Home',
        components: {}
    })

    export default class Home extends Vue {
        message = 'home'
    }
</script>

<style scoped>

</style>