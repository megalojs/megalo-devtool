<template>
<div class="pageselector">
  <span
    v-if="label"
    style="margin-right:10px;"
  >
    {{ label }}
  </span>
  <select class="select" v-model="value" @change="onChange">
    <option v-for="(item, i) in list" :value="i" :key="item.key">
      <slot :page="item.pageInfo"></slot>
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
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: 0,
      open: false,
    };
  },
  methods: {
    onChange() {
      const index = this.value;
      const item = this.list[index];

      this.$emit('change', {
        sender: this,
        item,
        index,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pageselector {
  padding: 0 6px;
  .select {
    display: inline-block;
    height: 30px;
    border: none;
  }
}
</style>
