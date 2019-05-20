<template>
<div>
  <div
    v-for="(mutation) in store.mutations" :key="mutation.timestamp"
    class="event"
    :class="{ selected: selected === mutation }"
    @click="onSelect(mutation)"
  >
    <div class="type">
      {{ mutation.mutation.type | mutationType }}
    </div>
    <div class="timestamp">{{ mutation.timestamp | time }}</div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selected: {},
    };
  },
  filters: {
    mutationType(t) {
      if (t === '__devtool__:init') {
        return 'Base State';
      }
      return t;
    },
  },
  methods: {
    onSelect(e) {
      this.selected = e;
      this.$store.dispatch('vuex/updateCurrentMutation', e);
    },
  },
};
</script>

<style lang="less" scoped>
.event {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  .type {
    font-weight: 500;
    color: #881391;
    .emitter {
      margin-left: 10px;
      font-size: 12px;
      font-weight: 400;
      color: #999;
      >b {
        color: #42B983;
      }
    }
  }
  .timestamp {
    font-size: 12px;
    color: #999;
  }
  &.selected {
    background: #f7e45dad;
  }
  &:hover {
    background: #f7e45d;
  }
}
</style>
