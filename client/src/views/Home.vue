<template>
  <div class="home">
    <div class="head">
      <PageSelector
        :list="$store.state.pages"
      />
      <div
        class="button"
        @click="refresh">
        refresh
      </div>
    </div>
    <div class="panel wrap">
      <div style="width:400px;">
        <VMBox
          :vm="$store.state.currentRootVM"
        />
      </div>

      <div>
        <VMDetails
          :vm="$store.state.currentVM"
        />
      </div>

      <div style="width:400px;">
        <VNodeBox
          :vnode="$store.state.currentVM && $store.state.currentVM.vnode"
        />
      </div>

      <div>
        <VNodeDetails
          :vnode="$store.state.currentVNode"
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
    if (!this.$store.state.pages.length) {
      await this.refresh();
    }
  },
  methods: {
    async refresh() {
      const pages = await this.$ioclient.manualRefresh();
      this.$store.dispatch('refreshPages', pages);
    },
  },
};

</script>

<style lang="less" scoped>
.head {
  height: 50px;
  display: flex;
  justify-content: space-between;
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
