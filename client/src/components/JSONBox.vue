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
      open: !this.depth || this.depth < 5,
    };
  },
};
</script>

<style lang="less">
.jsonbox {
  text-align: left;
  position: relative;
  .label {
    color: #881391;
  }
  .arrow-wrapper {
    position: absolute;
    display: inline-block;
    width: 16px;
    height: 16px;
    top: -1px;
    left: 6px;
    cursor: pointer;
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
</style>
