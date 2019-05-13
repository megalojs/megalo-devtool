<template>
<div>
  <span style="margin-right:10px;">Page Path</span>
  <select>
    <option v-for="(page, i) in list" :key="i">
      <span>{{ page.pageInfo.path }}</span>
      <span>[{{ page.pageInfo.webviewId }}]</span>
    </option>
  </select>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      open: false,
    };
  },
  mounted() {
    console.log('list', this);
  },
  methods: {
    test() {
      // console.log()
    },
  },
  beforeDestroy() {
    // window.
  },
};
</script>

<style>

</style>
