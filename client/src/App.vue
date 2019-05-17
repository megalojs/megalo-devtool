<template>
  <div id="app">
    <div class="head">
      <div class="versions">
        <span>Vue: {{ versions.vue }}</span>
        <span>Megalo: {{ versions.megalo }}</span>
      </div>

      <div class="toolbox">
        <div class="link">
          <router-link to="/components">Components</router-link>
        </div>
        <div class="link">
          <router-link to="/events">Events</router-link>
        </div>
        <div class="divider"></div>
        <PageSelector
          :list="pages"
        />
        <div class="divider"></div>
        <div
          class="button"
          @click="refresh">
          Refresh
        </div>
      </div>
    </div>
    <div class="body">
      <router-view/>
    </div>
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
  mounted() {
    setTimeout(() => {
      this.$emit('ssss', { x: 1 });
      this.$emit('ssss', { x: 1 });
      this.$emit('ssss', { x: 1 });
      this.$emit('ssss', { x: 1 });
    }, 1000);
  },
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
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.body {
  flex: 1;
  overflow: hidden;
}
.head {
  height: 50px;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
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
    height: 50px;
    justify-content: flex-start;
    align-items: center;
    .link {
      a {
        display: inline-block;
        padding: 0 6px;
        height: 50px;
        line-height: 50px;
        color: #333;
        font-weight: 500;
        text-decoration: none;
        // border-right: 1px solid #ddd;
        &:hover {
          background: #42b98322;
        }
        &.router-link-exact-active {
          color: #42b983;
          border-bottom: 2px solid #42b983;
        }
      }
    }
  }
  .divider {
    height: 50px;
    margin: 0 10px;
    border-right: 1px solid #ddd;
  }
}
</style>
