<template>
<div class="vmbox">
  <div
    v-if="vm"
    class="vmbox_tagname_wrapper"
    :style="{ 'padding-left': `${depth*10}px` }"
    :class="{ hover: hover, selected: $store.state.selectedVM === vm }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="onSelect"
  >
    <span class="vmbox_tagname">
      <span class="arrow-wrapper" @click="open = !open">
        <span class="arrow" :class="{ rotated: open }"></span>
      </span>
      <span style="color:#ccc;">&lt;</span>
      <span>{{ vm.name || 'Root' }}</span>
      <span style="color:#ccc;">&gt;</span>
    </span>
  </div>
  <template v-if="open && vm.children">
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
      open: false,
      hover: false,
    };
  },
  methods: {
    onSelect() {
      this.$store.dispatch('updateSelectedVM', this.vm);
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
  // padding-left: 10px;
  &_tagname_wrapper {
    cursor: pointer;
    color: #42b983;
    font-weight: 500;
  }
  &_tagname {
    position: relative;
    padding-left: 15px;
    .arrow-wrapper {
      position: absolute;
      display: inline-block;
      width: 16px;
      height: 16px;
      top: -1px;
      left: 6px;
      .arrow {
        display: inline-block;
        transition: transform 0.1s ease;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 6px solid #2c3e50;
        &.rotated {
          transform: rotate(90deg);
        }
      }
    }
  }
  .selected {
    background: #f7e45dad;
  }
  .hover {
    background: #f7e45d;
  }
}
</style>
