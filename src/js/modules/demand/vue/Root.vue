<template>
    <div class="c-vue">
        <p>{{ msg }}</p>
        <component :is="view"></component>
    </div>
</template>

<script>
import Foo from './Foo';
import Bar from './Bar';

export default {
    components: {
        Foo,
        Bar
    },
    data() {
        return {
            view: 'Foo',
            msg: 'A Vue Integration'
        };
    }
};
</script>