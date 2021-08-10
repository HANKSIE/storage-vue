<template>
  <div class="row justify-between q-mb-md">
    <span class="text-subtitle1 row items-center">
      {{ group.records.length }}
      {{ group.records.length > 1 ? "items weren't" : "item wasn't" }}
      {{ group.actionText }}.
    </span>
    <div class="col-2">
      <q-btn @click="removeGroup(group)" icon="close" round />
    </div>
  </div>

  <div v-for="(record, i) in group.records" :key="i" class="q-mb-lg">
    <div class="row justify-start full-width no-wrap">
      <q-img
        :src="
          getMimeIcon(
            record.files.length === 1 ? record.files[0].type : 'directory'
          )
        "
        width="30px"
        class="q-mr-sm"
      />
      <div class="row text-left items-center">
        <span class="ellipsis" style="width: 100px">
          {{ record.rootFileName }}
        </span>
      </div>
    </div>
    <div>
      A file with this name already exists. Would you like to replace the
      existing one, or rename it and keep them both?
    </div>
    <div class="q-mt-md row justify-between">
      <q-btn @click="keepBoth(group, record)" outline>Keep Both</q-btn>
      <q-btn @click="replace(group, record)" outline>Replace</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import getMimeIcon from "../../utils/getMimeIcon";
import UploadRecordGroup from "../../type/ProgressRecord/Upload/RecordGroup";
import UploadRecord from "../../type/ProgressRecord/Upload/UploadRecord";

export default defineComponent({
  emits: ["removeGroup"],
  props: {
    group: Object as PropType<UploadRecordGroup>,
  },
  setup(props, { emit }) {
    const group = props.group as UploadRecordGroup;

    const keepBoth = (g: UploadRecordGroup, r: UploadRecord) => {
      const { dir, filePaths, files } = r;
      group.keepBoth(g, r, dir, filePaths, files);
    };

    const replace = (g: UploadRecordGroup, r: UploadRecord) => {
      const { dir, filePaths, files } = r;
      group.replace(g, r, dir, filePaths, files);
    };

    const removeGroup = (group: UploadRecordGroup): void =>
      emit("removeGroup", group);

    return {
      getMimeIcon,
      keepBoth,
      replace,
      removeGroup,
    };
  },
});
</script>