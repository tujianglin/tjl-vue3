<script lang="tsx">
  import { defineComponent } from 'vue';
  import Hello from './components/Hello.vue';
  export default defineComponent({
    setup() {
      return () => <Hello></Hello>;
    },
  });
</script>
<style lang="less" scoped>
  .name {
    color: @color;
  }
</style>
