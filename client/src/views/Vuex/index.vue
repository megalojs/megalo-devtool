<template>
  <div class="vuex">
    <div class="wrap panel">
      <div>
        <div class="select">
          <Selector
            label="Store:"
            :list="stores"
            @change="onStoreChange"
          >
            <template v-slot="{ option }">
              store [{{ option.storeId }}]
            </template>
          </Selector>
        </div>
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
import Selector from '../../components/Selector.vue';
import MutationsBox from './MutationsBox.vue';
import MutationDetails from './MutationDetails.vue';

export default {
  name: 'Vuex',
  components: {
    Selector,
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
  methods: {
    onStoreChange(e) {
      this.$store.dispatch('vuex/updateCurrentStore', e.item);
    },
  },
};

</script>

<style lang="less" scoped>
.vuex {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  text-align: left;
  .select {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
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
