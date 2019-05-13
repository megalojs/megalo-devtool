<template>
  <div class="home">
    <div class="head">
      <PageSelector
        :list="$store.state.pages"
      />
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
// @ is an alias to /src
// import axios from 'axios';
import io from 'socket.io-client';
import PageSelector from '../components/PageSelector.vue';
import VMBox from '../components/VMBox.vue';
import VNodeBox from '../components/VNodeBox.vue';
import VMDetails from '../components/VMDetails.vue';
import VNodeDetails from '../components/VNodeDetails.vue';

const socket = io(`http://${window.location.host}`);

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
  created() {
    socket.on('connect', () => {
      console.log('connect');
    });

    socket.on('broadcast', (data) => {
      console.log('broadcast', data);
      if (data.type === 'vm') {
        this.$store.dispatch('updateVM', data.data);
      } else if (data.lifecycle === 'launch') {
        this.$store.dispatch('refreshPages', []);
      } else if (data.lifecycle === 'mounted' && data.type === 'page') {
        this.$store.dispatch('addPage', data.data);
      } else if (data.lifecycle === 'beforeDestroy' && data.type === 'page') {
        this.$store.dispatch('removePage', data.data);
      }
    });

    socket.on('allpage', (allPages) => {
      const pages = Object.keys(allPages)
        .map(id => allPages[id]);

      this.$store.dispatch('refreshPages', pages);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
    // axios.get('/test')
    //   .then((e) => {
    //     console.log(e);
    //   });
  },
};

</script>

<style lang="less">
.head {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
}
.home {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.wrap {
  display: flex;
  height: 100%;
  align-items: stretch;
  justify-content: flex-start;
  &.panel {
    >div {
      box-sizing: border-box;
      padding: 10px;
      overflow: auto;
    }
    >div:not(:last-child) {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
