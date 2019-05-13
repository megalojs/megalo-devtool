<template>
<div class="vmdetails">
  <div v-if="vm">
    <JSONBox
      label="data"
      :data="vm.data"
    />
    <JSONBox
      label="props"
      :data="vm.props"
    />
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

<style>
.vmdetails {
  width: 300px;
}
</style>
