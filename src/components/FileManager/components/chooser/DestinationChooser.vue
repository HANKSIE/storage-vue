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
        <breadcrumbs-path-link :nodes="pwdBreadcrumbNodes" @changeDir="cd" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple v-for="(fileInfo, i) in fileInfos" :key="i">
      <q-item-section class="row justify-start">
        <!-- folders -->
        <div class="row no-wrap">
          <q-img
            :src="getMimeIcon(fileInfo.mime)"
            width="30px"
            class="q-mr-sm"
          />
          <div class="row text-left items-center">
            <link-text
              class="ellipsis"
              style="width: 100px"
              @click="cdLink(fileInfo.name)"
            >
              {{ fileInfo.name }}
            </link-text>
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item class="q-mt-lg">
      <q-item-section>
        <q-input
          dense
          label="資料夾名稱"
          outlined
          v-model="dirname"
          :rules="[filenameRule]"
        >
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
import { defineComponent, PropType, ref, watchEffect } from "vue";
import usePwd from "../../composition/pwd";

import useFileInfos from "../../composition/fileInfos";
import optionConfig from "../../config/options";
import getMimeIcon from "../../utils/getMimeIcon";

import LinkText from "../LinkText.vue";
import BreadcrumbsPathLink from "../BreadcrumbsPathLink.vue";
import PathHelper from "../../utils/path";

import Api from "../../type/api";

import filenameRule from "../../validate/rules/filename";
import validate from "../../validate/validate";

export default defineComponent({
  components: { LinkText, BreadcrumbsPathLink },
  emits: ["mkdirHook", "handle"],
  props: {
    api: {
      type: Object as PropType<Api>,
    },
    actionText: {
      type: String,
      default: "123",
    },
    toggle: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const api = props.api as Api;

    const dirname = ref<string>("");
    const { pwdStr, pwdBreadcrumbNodes, setPwdByPath } = usePwd();
    const { fileInfos, setFileInfos, addFileInfos } = useFileInfos();

    const mkdir = async (): Promise<void> => {
      if (!validate(filenameRule(dirname.value))) {
        return;
      }

      try {
        const res = await api.mkdir({
          dir: pwdStr.value,
          filename: dirname.value,
        });
        const { fileInfo, isSuccess, exist } = res.data;

        if (fileInfo) {
          addFileInfos([fileInfo]);
          emit("mkdirHook", pwdStr.value, fileInfo);
          dirname.value = "";
        } else if (!isSuccess) {
          console.log("創建失敗");
        } else if (exist) {
          console.log("檔案已存在: ", exist);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const handle = () => emit("handle", pwdStr.value);

    const list = async (dir: string): Promise<void> => {
      try {
        const res = await api.list({
          dir,
          options: optionConfig.LIST_DIR_ONLY,
        });
        const { fileInfos } = res.data;
        setFileInfos(fileInfos);
      } catch (err) {
        console.error(err);
      }
    };

    const cd = async (dir: string): Promise<void> => {
      try {
        await list(dir);
        setPwdByPath(dir);
      } catch (err) {
        console.error(err);
      }
    };

    const cdLink = (dirname: string): void => {
      const dir = PathHelper.concat(pwdStr.value, dirname);
      cd(dir);
    };

    watchEffect(() => {
      if (!props.toggle) {
        setPwdByPath("");
        list(pwdStr.value);
      } else {
        list(pwdStr.value);
      }
    });

    return {
      fileInfos,
      pwdBreadcrumbNodes,
      dirname,
      mkdir,
      cd,
      cdLink,
      handle,
      getMimeIcon,
      filenameRule,
    };
  },
});
</script>