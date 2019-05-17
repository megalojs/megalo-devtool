<template>
  <div class="events">
    <div class="wrap panel">
      <div>
        <EventBox
          :events="currentEvents"
        />
      </div>
      <div style="padding:10px">
        <JSONBox
          label="event"
          :data="currentEvent.event"
        ></JSONBox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBox from './EventBox.vue';
import JSONBox from '../../components/JSONBox.vue';

export default {
  name: 'Events',
  components: {
    EventBox,
    JSONBox,
  },
  computed: {
    ...mapState('events', [
      'currentEvents',
      'currentEvent',
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
