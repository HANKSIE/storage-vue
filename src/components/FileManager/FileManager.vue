<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="fileInfos"
      :columns="columns"
      row-key="name"
      selection="multiple"
      v-model:selected="selected"
    >
      <template v-slot:top>
        <!-- 工具列 -->
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td key="name" :props="props">
            <div>
              <q-img
                :src="getMimeIcon(props.row.mime)"
                width="30px"
                class="q-mr-xs"
              />
              {{ props.row.name }}
            </div>
          </q-td>
          <q-td key="lastModified" :props="props">
            {{ props.row.lastModified }}</q-td
          >
          <q-td key="size" :props="props"> {{ props.row.size }}</q-td>
        </q-tr>
        <!-- 工具列 -->
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import getMimeIcon from "./utils/getMimeIcon";
import { columns } from "./config";
import useFileInfos from "./composition/fileInfos";
import useSelected from "./composition/selected";

export default defineComponent({
  setup() {
    const { fileInfos } = useFileInfos();

    const { selected } = useSelected();

    return {
      columns,
      fileInfos,
      selected,
      getMimeIcon,
    };
  },
});
</script>

<style>
</style>