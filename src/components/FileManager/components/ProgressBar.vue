<template>
  <q-list>
    <q-item class="q-mb-xl">
      <q-item-section>
        <span class="text-h6">Progress</span>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple v-for="(group, i) in groups" :key="i">
      <q-item-section>
        <template v-if="isCopyMoveRecordGroup(group)">
          <div class="q-mb-lg">
            <copy-move-card :group="group" @removeGroup="removeGroup" />
          </div>
        </template>
        <template v-if="isUploadRecordGroup(group)">
          <div class="q-mb-lg">
            <upload-card :group="group" @removeGroup="removeGroup" />
          </div>
        </template>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import CopyMoveRecordGroup from "../type/ProgressRecord/CopyMove/RecordGroup";
import UploadRecordGroup from "../type/ProgressRecord/Upload/RecordGroup";
import CopyMoveCard from "./progress-record/CopyMoveCard.vue";
import UploadCard from "./progress-record/UploadCard.vue";

export default defineComponent({
  components: { CopyMoveCard, UploadCard },
  emits: ["removeGroup"],
  props: {
    groups: Object as PropType<(CopyMoveRecordGroup | UploadRecordGroup)[]>,
  },
  setup(props, { emit }) {
    const removeGroup = (
      group: CopyMoveRecordGroup | UploadRecordGroup
    ): void => emit("removeGroup", group);

    const isCopyMoveRecordGroup = (
      g: CopyMoveRecordGroup | UploadRecordGroup
    ) => g instanceof CopyMoveRecordGroup;
    const isUploadRecordGroup = (g: CopyMoveRecordGroup | UploadRecordGroup) =>
      g instanceof UploadRecordGroup;

    return {
      removeGroup,
      isCopyMoveRecordGroup,
      isUploadRecordGroup,
    };
  },
});
</script>