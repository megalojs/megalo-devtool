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
    empty
  </template>
</div>
</template>

<script>
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
