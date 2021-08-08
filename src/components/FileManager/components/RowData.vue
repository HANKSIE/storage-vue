<template>
  <q-tr :props="props">
    <q-td>
      <q-checkbox v-model="props.selected" />
    </q-td>
    <q-td key="name" :props="props">
      <div class="row justify-start full-width">
        <q-img
          :src="getMimeIcon(props.row.mime)"
          width="30px"
          class="q-mr-sm"
        />
        <div class="row text-left items-center">
          <template v-if="props.row.mime == 'directory'">
            <link-text
              class="ellipsis"
              style="width: 50px"
              @click="cd(props.row.name)"
            >
              {{ props.row.name }}
            </link-text>
          </template>
          <template v-else>
            <link-text class="ellipsis" style="width: 100px">
              {{ props.row.name }}
            </link-text>
          </template>
        </div>
      </div>
    </q-td>
    <q-td key="lastModified" :props="props"> {{ props.row.lastModified }}</q-td>
    <q-td key="size" :props="props"> {{ props.row.size }}</q-td>
  </q-tr>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import pathHelper from "../utils/path";
import getMimeIcon from "../utils/getMimeIcon";
import LinkText from "./LinkText.vue";

export default defineComponent({
  components: { LinkText },
  emits: ["changeDir"],
  props: {
    properties: {
      type: Object,
      require: true,
    },
    pwdStr: {
      type: String,
      require: true,
    },
  },
  setup(props, { emit }) {
    const { properties, pwdStr } = toRefs(props);
    const cd = (dirname: string): void => {
      const dir = pathHelper.concat(pwdStr.value!, dirname);
      emit("changeDir", dir);
    };
    return {
      props: properties,
      cd,
      getMimeIcon,
      pathHelper,
    };
  },
});
</script>