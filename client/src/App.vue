<template>
  <div id="app">
    <div class="head">
      <div class="versions">
        <span>Vue: {{ versions.vue }}</span>
        <span>Megalo: {{ versions.megalo }}</span>
      </div>

      <div class="toolbox">
        <PageSelector
          :list="pages"
        />
        <div
          class="button"
          @click="refresh">
          Refresh
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import './styles/common.less';
import PageSelector from './components/PageSelector.vue';

export default {
  components: {
    PageSelector,
  },
  computed: {
    ...mapState([
      'pages',
      'versions',
    ]),
  },
  mounted() {},
  methods: {
    async refresh() {
      const { versions, pages } = await this.$ioclient.manualRefresh();
      this.$store.dispatch('refreshPages', pages);
      this.$store.dispatch('syncVersions', versions);
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
  box-shadow: 0 0 8px rgba(0,0,0,0.15);
  .versions {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    text-align: left;
  }
  .toolbox {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    >div {
      margin-left: 20px;
    }
  }
}
</style>
