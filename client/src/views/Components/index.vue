<template>
  <div class="components">
    <div class="panel wrap">
      <div style="width:400px;padding-top:8px;">
        <ComponentBox
          :component="currentRootComponent"
        />
      </div>

      <div style="">
        <ComponentDetails
          :component="currentComponent"
        />
      </div>

      <div style="width:400px;padding-top:8px;">
        <VNodeBox
          :vnode="currentComponent && currentComponent.vnode"
        />
      </div>

      <div>
        <VNodeDetails
          :vnode="currentVNode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ComponentBox from './ComponentBox.vue';
import VNodeBox from './VNodeBox.vue';
import ComponentDetails from './ComponentDetails.vue';
import VNodeDetails from './VNodeDetails.vue';

export default {
  name: 'Components',
  components: {
    ComponentBox,
    VNodeBox,
    ComponentDetails,
    VNodeDetails,
  },
  computed: {
    ...mapState('components', [
      'currentRootComponent',
      'currentComponent',
      'currentVNode',
    ]),
  },
  data() {
    return {
    };
  },
};

</script>

<style lang="less" scoped>
.components {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
}
.wrap {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: flex-start;
  &.panel {
    >div {
      box-sizing: border-box;
      // padding: 10px;
      overflow: auto;
      flex: 1;
    }
    >div:not(:last-child) {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
