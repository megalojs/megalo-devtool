<template>
  <div class="home">
    <div class="head">
      <PageSelector
        :list="$store.state.pages"
      />
      <button @click="onRefresh">refresh</button>
    </div>
    <div class="panel wrap">
      <div style="width:400px;">
        <VMBox
          :vm="$store.state.currentRootVM"
        />
      </div>

      <div>
        <VMDetails
          :vm="$store.state.selectedVM"
        />
      </div>

      <div style="width:400px;">
        <VNodeBox
          :vnode="$store.state.selectedVM && $store.state.selectedVM.vnode"
        />
      </div>

      <div>
        <VNodeDetails
          :vnode="$store.state.selectedVNode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PageSelector from '../components/PageSelector.vue';
import VMBox from '../components/VMBox.vue';
import VNodeBox from '../components/VNodeBox.vue';
import VMDetails from '../components/VMDetails.vue';
import VNodeDetails from '../components/VNodeDetails.vue';

export default {
  name: 'home',
  components: {
    PageSelector,
    VMBox,
    VNodeBox,
    VMDetails,
    VNodeDetails,
  },
  data() {
    return {
      pages: [],
      currentVM: {},
    };
  },
  async created() {
    const res = await this.$ioclient.manualRefresh(100);
    console.log(res);
  },
  methods: {
    onRefresh() {
      this.$ioclient.manualRefresh();
    },
  },
};

</script>

<style lang="less" scoped>
.head {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.home {
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
