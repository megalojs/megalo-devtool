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
        <div class="link">
          <router-link to="/Vuex">Vuex</router-link>
        </div>
        <div class="divider"></div>
        <Selector
          label="Page:"
          :list="pages"
          @change="onPageChange"
        >
          <template v-slot="{ option }">
            {{ option.pageInfo.path }} [{{ option.pageInfo.id }}]
          </template>
        </Selector>
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
import Selector from './components/Selector.vue';

export default {
  components: {
    Selector,
  },
  computed: {
    ...mapState([
      'pages',
      'versions',
    ]),
  },
  async mounted() {
    await this.refresh();
  },
  methods: {
    async refresh() {
      const { versions, pages, stores } = await this.$ioclient.manualRefresh();
      this.$store.dispatch('refreshPages', pages);
      this.$store.dispatch('syncVersions', versions);
      stores.forEach((store) => {
        this.$store.dispatch('vuex/addStore', store);
      });
    },
    onPageChange(e) {
      this.$store.dispatch('updateCurrentPage', e.item);
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
