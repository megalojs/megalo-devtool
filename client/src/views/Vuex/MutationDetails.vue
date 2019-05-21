<template>
<div>
  <template v-if="mutation">
    <JSONBox
      label="mutation"
      :data="mutation.mutation"
    />
    <JSONBox
      label="state"
      :data="mutation.state"
    />
  </template>
  <template v-else>
    <div class="empty">No mutation selected</div>
  </template>
</div>
</template>

<script>
import '../../styles/common.less';
import JSONBox from '../../components/JSONBox.vue';

export default {
  components: {
    JSONBox,
  },
  props: {
    mutation: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>

</style>
