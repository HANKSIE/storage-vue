<template>
  <div class="row justify-between q-mb-md">
    <span class="text-subtitle1 row items-center">
      {{ total }}
      {{ total > 1 ? "items weren't" : "item wasn't" }}
      {{ group.actionText }}.
    </span>
    <div class="col-2">
      <q-btn @click="removeGroup(group)" icon="close" round />
    </div>
  </div>

  <div v-for="(record, i) in group.existRecords" :key="i" class="q-mb-lg">
    <div class="row justify-start full-width no-wrap">
      <q-img
        :src="getMimeIcon(record.fileInfo.mime)"
        width="30px"
        class="q-mr-sm"
      />
      <div class="row text-left items-center">
        <span class="ellipsis" style="width: 100px">
          {{ record.fileInfo.name }}
        </span>
      </div>
    </div>
    <div>
      A file with this name already exists. Would you like to replace the
      existing one, or rename it and keep them both?
    </div>
    <div class="q-mt-md row justify-between">
      <q-btn @click="keepBoth(group, record)" outline>Keep Both</q-btn>
      <template v-if="record.fromDir !== record.toDir">
        <q-btn @click="replace(group, record)" outline>Replace</q-btn>
      </template>
    </div>
  </div>

  <div v-for="(record, i) in group.selfRecords" :key="i" class="q-mb-lg">
    <div class="row justify-start full-width no-wrap">
      <q-img
        :src="getMimeIcon(record.fileInfo.mime)"
        width="30px"
        class="q-mr-sm"
      />
      <div class="row text-left items-center">
        <span class="ellipsis" style="width: 100px">
          {{ record.fileInfo.name }}
        </span>
      </div>
    </div>
    <div>The destination folder is the same as the source folder.</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import getMimeIcon from "../../utils/getMimeIcon";
import CopyMoveRecordGroup from "../../type/ProgressRecord/CopyMove/RecordGroup";
import ExistRecord from "../../type/ProgressRecord/CopyMove/ExistRecord";

export default defineComponent({
  emits: ["removeGroup"],
  props: {
    group: Object as PropType<CopyMoveRecordGroup>,
  },
  setup(props, { emit }) {
    const group = props.group as CopyMoveRecordGroup;
    const { existRecords, selfRecords } = group;
    const total = computed(() => existRecords.length + selfRecords.length);

    const keepBoth = (g: CopyMoveRecordGroup, r: ExistRecord) => {
      const { fromDir, toDir, fileInfo } = r;
      group.keepBoth(g, r, fromDir, toDir, fileInfo.name);
    };

    const replace = (g: CopyMoveRecordGroup, r: ExistRecord) => {
      const { fromDir, toDir, fileInfo } = r;
      group.replace(g, r, fromDir, toDir, fileInfo.name);
    };

    const removeGroup = (group: CopyMoveRecordGroup): void =>
      emit("removeGroup", group);

    return {
      getMimeIcon,
      total,
      keepBoth,
      replace,
      removeGroup,
    };
  },
});
</script>