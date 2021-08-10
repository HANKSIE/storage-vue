<template>
  <q-list>
    <q-item class="q-mb-xl">
      <q-item-section>
        <span class="text-h6">Progress</span>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple v-for="(group, i) in groups" :key="i">
      <q-item-section>
        <copy-move-card :group="group" @removeGroup="removeGroup" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import CopyMoveRecordGroup from "../type/ProgressRecord/CopyMove/RecordGroup";
import CopyMoveCard from "./progress-record/CopyMoveCard.vue";

export default defineComponent({
  components: { CopyMoveCard },
  emits: ["removeGroup"],
  props: {
    groups: Object as PropType<CopyMoveRecordGroup[]>,
  },
  setup(props, { emit }) {
    const removeGroup = (group: CopyMoveRecordGroup): void =>
      emit("removeGroup", group);
    return {
      removeGroup,
    };
  },
});
</script>