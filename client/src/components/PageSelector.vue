<template>
<div class="pageselector">
  <span style="margin-right:10px;">Page Path</span>
  <select class="select" v-model="value" @change="onChange">
    <option v-for="(page, i) in list" :key="i" :value="i">
      <span>{{ page.pageInfo.path }}</span>
      <span>[{{ page.pageInfo.id }}]</span>
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
      value: 0,
      open: false,
    };
  },
  mounted() {
    console.log('list', this);
  },
  methods: {
    onChange() {
      const index = this.value;
      const page = this.list[index];

      this.$store.dispatch('updateCurrentRootVM', page);

      this.$emit('change', {
        sender: this,
        page,
        index,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageselector {
  .select {
    display: inline-block;
    height: 30px;
    border: none;
  }
}
</style>
