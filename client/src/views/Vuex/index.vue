<template>
  <div class="events">
    <div class="wrap panel">
      <div>
        <MutationsBox
          v-if="currentStore"
          :store="currentStore"
        />
      </div>
      <div style="padding:10px">
        <MutationDetails
          label="mutation"
          :mutation="currentMutation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MutationsBox from './MutationsBox.vue';
import MutationDetails from './MutationDetails.vue';

export default {
  name: 'Vuex',
  components: {
    MutationsBox,
    MutationDetails,
  },
  computed: {
    ...mapState('vuex', [
      'stores',
      'currentStore',
      'currentMutation',
    ]),
  },
  data() {
    return {
    };
  },
  methods: {
  },
};

</script>

<style lang="less" scoped>
.events {
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
      overflow: auto;
      flex: 1;
    }
    >div:not(:last-child) {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
