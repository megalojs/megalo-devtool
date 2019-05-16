<template>
<div class="vmdetails">
  <DetailBox>
    <span v-if="vm" slot="head">
      {{ vm.name || 'Root' }}
    </span>

    <div v-if="vm" slot="body">
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
  </DetailBox>
</div>
</template>

<script>
import DetailBox from '../../components/DetailBox.vue';
import JSONBox from '../../components/JSONBox.vue';
import '../../styles/common.less';

export default {
  components: {
    DetailBox,
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
  min-width: 300px;
}
</style>
