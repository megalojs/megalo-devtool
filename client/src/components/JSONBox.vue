<template>
<div
  class="jsonbox"
  :style="{ 'padding-left': `${depth*10}px` }"
>
  <span
    style="position:relative;"
  >
    <span
      v-if="isArrayOrObject"
      class="arrow-wrapper"
      @click="open = !open"
    >
      <span class="arrow" :class="{ rotated: open }"></span>
    </span>

    <span style="padding-left: 15px;">
      <span class="label">{{ label }}: </span>
      <span v-if="isArrayOrObject">
        {{ dataType }}
        <span v-if="dataType === 'Array'">[{{ data.length }}]</span>
      </span>
      <span v-else>
        {{ data }}
      </span>
    </span>
  </span>

  <template
    v-if="open && ['Array', 'Object'].indexOf(dataType) > -1"
  >
    <JSONBox
      v-for="(value, key) in data"
      :depth="depth + 1"
      :key="key"
      :label="key"
      :data="value"
    />
  </template>
</div>
</template>

<script>
import '../styles/common.less';

const DEFAULT_OPEN_MAX = 1;
function captilize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default {
  name: 'JSONBox',
  props: {
    label: {
      default: '',
    },
    data: {
      default: null,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isArrayOrObject() {
      return ['Array', 'Object'].indexOf(this.dataType) > -1;
    },
    dataType() {
      const { data } = this;
      if (Array.isArray(data)) {
        return 'Array';
      }
      return captilize(typeof data);
    },
    length() {
      return Object.keys(this.data || {}).length;
    },
  },
  data() {
    return {
      open: !this.depth || this.depth < DEFAULT_OPEN_MAX,
    };
  },
};
</script>

<style lang="less" scoped>
.jsonbox {
  text-align: left;
  position: relative;
  .label {
    color: #881391;
  }
}
</style>
