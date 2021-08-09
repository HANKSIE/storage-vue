<template>
  <q-list class="flex-row">
    <q-item>
      <q-item-section>
        <span class="text-h6">Choose a destination</span>
      </q-item-section>
    </q-item>
    <q-item clickable class="q-mt-xl">
      <q-item-section>
        <!-- breadcrumbs -->
        <breadcrumbs-path-link
          :nodes="pwdBreadcrumbNodes"
          @changeDir="cdBreadcrumbs"
        />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple v-for="(fileInfo, i) in fileInfos" :key="i">
      <q-item-section class="row justify-start">
        <!-- folders -->
        <div class="row">
          <q-img
            :src="getMimeIcon(fileInfo.mime)"
            width="30px"
            class="q-mr-sm"
          />
          <div class="row text-left items-center">
            <link-text
              class="ellipsis"
              style="width: 100px"
              @click="cd(fileInfo.name)"
            >
              {{ fileInfo.name }}
            </link-text>
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="q-mt-lg">
      <q-item-section>
        <q-input dense label="資料夾名稱" outlined v-model="dirname">
          <template v-slot:prepend>
            <q-icon name="create_new_folder" />
          </template>
        </q-input>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section>
        <div class="row items-center">
          <div class="col-6">
            <q-btn @click="mkdir">New Folder</q-btn>
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable v-ripple>
      <q-item-section>
        <div class="row items-center">
          <div class="col-6">
            <q-btn @click="handle" color="primary">{{ actionText }}</q-btn>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from "vue";
import usePwd from "../../composition/pwd";
import list from "../../methods/list";
import changeDir from "../../methods/changeDir";
import useFileInfos from "../../composition/fileInfos";
import optionConfig from "../../config/options";
import getMimeIcon from "../../utils/getMimeIcon";

import LinkText from "../LinkText.vue";
import BreadcrumbsPathLink from "../BreadcrumbsPathLink.vue";
import PathHelper from "../../utils/path";

export default defineComponent({
  components: { LinkText, BreadcrumbsPathLink },
  emits: ["mkdir", "handle"],
  props: {
    type: {
      type: String,
      require: true,
    },
    id: {
      type: Number,
      require: true,
    },
    actionText: {
      type: String,
      default: "123",
    },
  },
  setup(props, { emit }) {
    const { type, id } = toRefs(props);
    const dirname = ref<string>("");
    const { pwd, pwdStr, pwdBreadcrumbNodes } = usePwd();
    const { fileInfos } = useFileInfos();
    const mkdir = () => {
      emit("mkdir", dirname.value);
      dirname.value = "";
    };
    const handle = () => emit("handle", pwdStr.value);

    onMounted(() => {
      list(fileInfos, {
        type: type.value!,
        id: id.value!,
        dir: pwdStr.value,
        options: optionConfig.LIST_DIR_ONLY,
      });
    });

    const cdBreadcrumbs = (dir: string): void => {
      changeDir(pwd, fileInfos, {
        type: type.value!,
        id: id.value!,
        dir,
        options: optionConfig.LIST_DIR_ONLY,
      });
    };

    const cd = (dirname: string): void => {
      const dir = PathHelper.concat(pwdStr.value!, dirname);
      changeDir(pwd, fileInfos, {
        type: type.value!,
        id: id.value!,
        dir,
        options: optionConfig.LIST_DIR_ONLY,
      });
    };

    return {
      fileInfos,
      pwdBreadcrumbNodes,
      dirname,
      mkdir,
      cd,
      cdBreadcrumbs,
      handle,
      getMimeIcon,
    };
  },
});
</script>