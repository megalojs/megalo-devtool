<template>
<div class="vnodedetails">
  <DetailBox>
    <span v-if="vnode" slot="head">
      {{ vnode.tag || '' }}
    </span>

    <div v-if="vnode" slot="body">
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
  </DetailBox>
</div>
</template>

<script>
import DetailBox from '../../components/DetailBox.vue';
import JSONBox from '../../components/JSONBox.vue';

export default {
  components: {
    DetailBox,
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

<style lang="less" scoped>
.vnodedetails {
  min-width: 300px;
}
</style>
