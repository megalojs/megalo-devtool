<template>
<div class="vnodebox">
  <div
    class="vnodebox_tagname_wrapper"
    :style="{ 'padding-left': `${depth*10}px` }"
    :class="{ hover: hover, selected: $store.state.selectedVNode === vnode }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="onSelect"
  >
    <span class="vnodebox_tagname">
      <template v-if="vnode && vnode.tag">
        <span class="arrow-wrapper" @click="open = !open">
          <span class="arrow" :class="{ rotated: open }"></span>
        </span>
        <span style="color:#ccc">&lt;</span>
        <span>{{ vnode.tag || 'unknown' }}</span>
        <span style="color:#ccc">&gt;</span>
      </template>
      <template
        v-else-if="vnode && vnode.text"
      >
        <span style="color:#bbb;">{{ vnode.text }}</span>
      </template>
    </span>
  </div>

  <template v-if="open && vnode && vnode.children">
    <VNodeBox
      v-for="(child, i) in vnode.children"
      :depth="depth + 1"
      :key="i"
      :vnode="child"
    />
  </template>
</div>
</template>

<script>
import '../styles/common.less';

export default {
  name: 'VNodeBox',
  props: {
    vnode: {
      type: Object,
      defaults: () => {},
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      open: true,
      hover: false,
    };
  },
  created() {
  },
  methods: {
    onSelect() {
      this.$store.dispatch('updateSelectedVNode', this.vnode);
    },
  },
};
</script>

<style lang="less" scoped>
.vnodebox {
  text-align: left;
  &_tagname_wrapper {
    color: #42b983;
    font-weight: 500;
    cursor: pointer;
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
