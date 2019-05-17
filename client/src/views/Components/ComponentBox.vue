<template>
<div class="componentbox">
  <div
    v-if="component"
    class="componentbox_tagname_wrapper"
    :style="{ 'padding-left': `${depth*10}px` }"
    :class="{ hover: hover, selected: $store.state.currentComponent === component }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="onSelect"
  >
    <span class="componentbox_tagname">
      <span
        v-if="hasChildren"
        class="arrow-wrapper"
        @click="open = !open"
      >
        <span class="arrow" :class="{ rotated: open }"></span>
      </span>
      <span style="color:#ccc;">&lt;</span>
      <span>{{ component.name || 'Root' }}</span>
      <span style="color:#ccc;">&gt;</span>
    </span>
  </div>
  <template v-if="open && hasChildren">
    <VMBox
      v-for="child in component.children"
      :key="child.id"
      :component="child"
      :depth="(depth || 0) + 1"
    />
  </template>
</div>
</template>

<script>
export default {
  name: 'VMBox',
  props: {
    component: {
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
      const host = this.component;
      return host && host.children && host.children.length;
    },
  },
  methods: {
    onSelect() {
      this.$store.dispatch('components/updateCurrentComponent', this.component);
    },
    onHover() {
      this.hover = true;
      console.log('enter');
    },
  },
};
</script>

<style lang="less" scoped>
.componentbox {
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
