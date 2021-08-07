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
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from "@vue/runtime-core";
import getMimeIcon from "./utils/getMimeIcon";
import { columns } from "./config/widget";
import useFileInfos from "./composition/fileInfos";
import useSelected from "./composition/selected";
import list from "./methods/list";
import usePwd from "./composition/pwd";

export default defineComponent({
  props: {
    type: {
      type: String,
      require: true,
    },
    id: {
      type: Number,
      require: true,
    },
  },
  setup(props) {
    const { type, id } = toRefs(props);
    const { fileInfos } = useFileInfos();
    const { selected } = useSelected();
    const { pwdStr } = usePwd();

    onMounted(() => {
      list(fileInfos, type.value!, id.value!, pwdStr.value);
    });

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