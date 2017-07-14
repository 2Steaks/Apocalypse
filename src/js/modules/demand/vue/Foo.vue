<template>
    <div>
        <p>Foo</p>
        <button @click="changeView">Switch to Bar</button>
    </div>
</template>

<script>
export default {
    methods: {
        changeView() {
            this.$parent.view = 'Bar';
        }
    }
};
</script>