<template>
    <div>
        <p>Bar</p>
        <button @click="changeView">Switch to Foo</button>
    </div>
</template>

<script>
export default {
    methods: {
        changeView() {
            this.$parent.view = 'Foo';
        }
    }
};
</script>