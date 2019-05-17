<template>
<div>
  <div
    v-for="(event) in events" :key="event.timestamp"
    class="event"
    :class="{ selected: selected === event }"
    @click="onSelect(event)"
  >
    <div class="type">
      {{ event.type }}
      <span class="emitter">
        $emit by
        &lt;
          <b>{{ event.emitterName }}</b>
        &gt;
      </span>
    </div>
    <div class="timestamp">{{ event.timestamp | time }}</div>
  </div>
</div>
</template>

<script>
import * as moment from 'moment';

export default {
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: {},
    };
  },
  filters: {
    time(n) {
      return moment(n).format('HH:mm:ss SSS');
    },
  },
  methods: {
    onSelect(e) {
      this.selected = e;
      this.$store.dispatch('events/updateCurrentEvent', e);
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
