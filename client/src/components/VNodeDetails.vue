<template>
<div class="vnodedetails">
  <div v-if="vnode">
    <JSONBox
      label="data"
      :data="vnode.data"
    />
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

<style>
.vnodedetails {
  width: 300px;
}
</style>
