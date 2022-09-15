<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Button } from 'ant-design-vue';
  export default defineComponent({
    setup() {
      return () => <Button type={'primary'}>登录</Button>;
    },
  });
</script>
<style lang="less" scoped></style>
