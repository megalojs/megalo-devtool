<template>
<div class="vmbox">
  <div
    v-if="vm"
    class="vmbox_tagname_wrapper"
    :style="{ 'padding-left': `${depth*10}px` }"
    :class="{ hover: hover, selected: $store.state.currentVM === vm }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="onSelect"
  >
    <span class="vmbox_tagname">
      <span
        v-if="hasChildren"
        class="arrow-wrapper"
        @click="open = !open"
      >
        <span class="arrow" :class="{ rotated: open }"></span>
      </span>
      <span style="color:#ccc;">&lt;</span>
      <span>{{ vm.name || 'Root' }}</span>
      <span style="color:#ccc;">&gt;</span>
    </span>
  </div>
  <template v-if="open && hasChildren">
    <VMBox
      v-for="child in vm.children"
      :key="child.id"
      :vm="child"
      :depth="(depth || 0) + 1"
    />
  </template>
</div>
</template>

<script>
export default {
  name: 'VMBox',
  props: {
    vm: {
      type: Object,
      defaults: () => {},
    },
    depth: {
      type: Number,
      defaults: 0,
    },
  },
  data() {
    return {
      open: (!this.depth || this.depth < 2),
      hover: false,
    };
  },
  computed: {
    hasChildren() {
      const host = this.vm;
      return host && host.children && host.children.length;
    },
  },
  methods: {
    onSelect() {
      this.$store.dispatch('updateCurrentVM', this.vm);
    },
    onHover() {
      this.hover = true;
      console.log('enter');
    },
  },
};
</script>

<style lang="less" scoped>
.vmbox {
  text-align: left;
  &_tagname_wrapper {
    cursor: pointer;
    color: #42b983;
    font-weight: 500;
  }
  &_tagname {
    position: relative;
    padding-left: 15px;
  }
  .selected {
    background: #f7e45dad;
  }
  .hover {
    background: #f7e45d;
  }
}
</style>
