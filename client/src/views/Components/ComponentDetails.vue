<template>
<div class="componentdetails">
  <DetailBox>
    <span v-if="component" slot="head">
      {{ component.name || 'Root' }}
    </span>

    <div v-if="component" slot="body">
      <JSONBox
        label="data"
        :data="component.data"
      />
      <div class="divider"></div>
      <JSONBox
        label="props"
        :data="component.props"
      />
      <div class="divider"></div>
      <JSONBox
        label="computed"
        :data="component.computed"
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
    component: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.componentdetails {
  min-width: 300px;
}
</style>
