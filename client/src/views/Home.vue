<template>
  <div class="home">
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
          :vnode="$store.state.selectedVM.vnode"
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
import VMBox from '../components/VMBox.vue';
import VNodeBox from '../components/VNodeBox.vue';
import VMDetails from '../components/VMDetails.vue';
import VNodeDetails from '../components/VNodeDetails.vue';

const socket = io('http://localhost:12222');

export default {
  name: 'home',
  components: {
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
      if (data.type === 'vm') {
        this.$store.dispatch('updateVM', data.data);
      }
    });

    socket.on('allpage', (allPages) => {
      console.log('allpage', allPages);

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
      overflow: auto;
    }
    >div:not(:last-child) {
      height: 100%;
      padding: 10px;
      border-right: 1px solid #ddd;
    }
  }
}
</style>
