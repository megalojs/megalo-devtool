<template>
<div class="detailbox">
  <div class="detailbox-head">
    <span style="color:#ccc;">&lt;</span>
    <span style="color:#42b983">
      <slot name="head"></slot>
    </span>
    <span style="color:#ccc;">&gt;</span>
  </div>

  <div style="padding:8px;">
    <slot name="body">
        <span style="color:#42b983">empty</span>
    </slot>
  </div>
</div>
</template>

<script>
import '../styles/common.less';

export default {
};
</script>

<style lang="less" scoped>
.detailbox {
  min-width: 300px;
  &-head {
    padding: 6px;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
  }
}
</style>
