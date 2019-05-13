<template>
<div class="vnodedetails">
  <div v-if="vnode">
    <JSONBox
      label="data"
      :data="vnode.data"
    />
    <div class="divider"></div>
    <JSONBox
      label="children"
      :data="vnode.children"
    />
  </div>
</div>
</template>

<script>
import JSONBox from './JSONBox.vue';

export default {
  components: {
    JSONBox,
  },
  props: {
    vnode: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    // console.log('vnode', this.vnode);
  },
};
</script>

<style lang="less">
.vnodedetails {
  width: 300px;
  .divider {
    border-bottom: 1px solid #ddd;
    margin: 10px 0;
  }
}
</style>
