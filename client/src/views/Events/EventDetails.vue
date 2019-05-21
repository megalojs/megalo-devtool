<template>
<div>
  <template v-if="event">
    <JSONBox
      label="event"
      :data="event.event"
    />
  </template>
  <template v-else>
    <div class="empty">No event selected</div>
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
    event: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>

</style>
