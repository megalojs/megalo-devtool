<template>
<div class="vmdetails">
  <template v-if="vm">
    <div class="head">
      <span style="color:#ccc;">&lt;</span>
      <span style="color:#42b983">{{ vm.name || 'Root' }}</span>
      <span style="color:#ccc;">&gt;</span>
    </div>

    <div style="padding:8px;">
      <JSONBox
        label="data"
        :data="vm.data"
      />
      <div class="divider"></div>
      <JSONBox
        label="props"
        :data="vm.props"
      />
      <div class="divider"></div>
      <JSONBox
        label="computed"
        :data="vm.computed"
      />
    </div>
  </template>
</div>
</template>

<script>
import JSONBox from './JSONBox.vue';
import '../styles/common.less';

export default {
  components: {
    JSONBox,
  },
  props: {
    vm: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.vmdetails {
  width: 300px;
  .head {
    border-bottom: 1px solid #ddd;
  }
}
</style>
