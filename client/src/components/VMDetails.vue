<template>
<div class="vmdetails">
  <div v-if="vm">
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
</div>
</template>

<script>
import JSONBox from './JSONBox.vue';

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

<style lang="less">
.vmdetails {
  width: 300px;
  .divider {
    border-bottom: 1px solid #ddd;
    margin: 10px 0;
  }
}
</style>
