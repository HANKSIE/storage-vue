<template>
  <v-row>
    <v-col>
      <DropUploader @upload="dropUpload">
        <v-data-table
          show-select
          hide-default-footer
          fixed-header
          :headers="headers"
          :items="files"
          item-key="name"
          v-model="selected"
          height="300"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn class="mx-3" tile @click="mkdirToggle = true">
                <v-icon>mdi-plus</v-icon>
                新增資料夾
              </v-btn>
              <template v-if="selected.length === 1">
                <v-btn
                  class="mx-3"
                  text
                  v-for="item in [...optionsMultiple, ...optionsSingle]"
                  :key="item.text"
                  @click="item.action"
                >
                  <v-icon>mdi-{{ item.icon }}</v-icon>
                  {{ item.text }}
                </v-btn>
              </template>
              <template v-else-if="selected.length > 1">
                <v-btn
                  class="mx-3"
                  text
                  v-for="item in optionsMultiple"
                  :key="item.text"
                  @click="item.action"
                >
                  <v-icon>mdi-{{ item.icon }}</v-icon>
                  {{ item.text }}
                </v-btn>
              </template>

              <template v-else>
                <v-menu offset-y :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mx-3" text v-bind="attrs" v-on="on">
                      <v-icon>mdi-upload</v-icon>
                      上傳
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item>
                      <v-btn text plain small :ripple="false">
                        <Uploader
                          :config="{ type: 'folder', text: 'folder' }"
                          @upload="upload"
                        />
                      </v-btn>
                    </v-list-item>
                    <v-list-item>
                      <v-btn text plain small :ripple="false">
                        <Uploader
                          :config="{
                            type: 'file',
                            multiple: 'true',
                            text: 'file',
                          }"
                          @upload="upload"
                        />
                      </v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <template v-if="actionMemos.length > 0">
                  <v-badge color="red" offset-x="20" offset-y="10" dot>
                    <v-btn text @click="actionMemoToggle = true">
                      <v-icon> mdi-sync-alert </v-icon>
                    </v-btn>
                  </v-badge>
                </template>
              </template>
            </v-toolbar>
            <v-breadcrumbs :items="pwdBreadcrumbs">
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item>
                  <link-text @click="cd(item.path)">
                    {{ item.text }}
                  </link-text>
                </v-breadcrumbs-item>
              </template>
            </v-breadcrumbs>
          </template>
          <template v-slot:item.name="{ item }">
            <div class="d-inline-flex align-center">
              <v-img :src="icon(item.mimeType)" max-width="30" class="mr-3" />

              <template v-if="item.mimeType == 'directory'">
                <link-text @click="cd(concatPwdStr(item.name))">
                  {{ item.name }}
                </link-text>
              </template>
              <template v-else>
                {{ item.name }}
              </template>
            </div>
          </template>
        </v-data-table>
      </DropUploader>
    </v-col>
    <!-- rename dialog -->
    <v-dialog v-model="renameToggle" width="400">
      <v-card>
        <v-card-title class="text-h5"> 重新命名 </v-card-title>

        <v-card-text>
          <template v-if="selected.length === 1">
            <v-row>
              <v-col cols="9">
                <v-row>
                  <v-col>
                    <v-text-field
                      dense
                      :rules="[rules.renameUniqueFile]"
                      v-model="renameInput"
                    />
                  </v-col>
                  <template v-if="selected[0].mimeType !== 'directory'">
                    <v-col cols="3" class="d-flex align-center">
                      .{{ extension(selected[0].name) }}
                    </v-col>
                  </template>
                </v-row>
              </v-col>
              <v-col class="d-flex align-center justify-center">
                {{ selected[0].name }}
              </v-col>
            </v-row>
          </template>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="rename"> Rename </v-btn>
          <v-btn @click="renameToggle = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- rm dialog -->
    <v-dialog v-model="rmToggle" width="400">
      <v-card>
        <v-card-title class="text-h5"> 刪除? </v-card-title>

        <v-card-text> 確定要刪除嗎? </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="rmHandle"> Delete </v-btn>
          <v-btn @click="rmToggle = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- mkdir dialog -->
    <v-dialog v-model="mkdirToggle" width="400">
      <v-card>
        <v-card-title class="text-h5"> 新增資料夾 </v-card-title>

        <v-card-text>
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                required
                single-line
                v-model="mkdirName"
                :rules="[rules.uniqueFile]"
              ></v-text-field
            ></v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="mkdirHandle"> New </v-btn>
          <v-btn @click="mkdirToggle = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- copy/move dir navigation draw -->
    <v-navigation-drawer
      app
      right
      temporary
      v-model="drawerToggle"
      color="secondary"
    >
      <SubFileManager
        :type="type"
        :id="id"
        :toggle="drawerToggle"
        :action="sub.action"
        @runAction="runAction"
        @mkdir="sub_mkdir"
      />
    </v-navigation-drawer>
    <!-- move || copy exist navigation draw -->
    <v-navigation-drawer
      app
      right
      temporary
      v-model="actionMemoToggle"
      color="secondary"
      width="300"
    >
      <ActionMemoList
        :memosLength="actionMemos.length"
        @close="actionMemoToggle = false"
      >
        <template v-for="(memo, i) in actionMemos">
          <CopyMoveActionItem
            :key="i"
            v-if="memo.action === 'move' || memo.action === 'copy'"
            :memo="memo"
            @remove="removeActionMemo"
            @keepBoth="keepBoth"
            @replace="replace"
          />
          <UploadActionItem
            :key="i"
            v-if="memo.action === 'upload'"
            :memo="memo"
            @remove="removeActionMemo"
            @keepBoth="upload_keepBoth"
            @replace="upload_replace"
          />
        </template>
      </ActionMemoList>
    </v-navigation-drawer>
  </v-row>
</template>

<script>
import fileIcon from "@/utils/fileIcon";
import LinkText from "@/components/LinkText";
import fileManagerMixin from "./mixin";
import SubFileManager from "./SubFileManager.vue";
import ActionMemoList from "./ActionMemoList.vue";
import fileConfig from "@/config/file";
import Uploader from "./Uploader.vue";
import DropUploader from "./DropUploader.vue";
import pathHelper from "@/utils/helper/path";

import uploadMiscellaneous from "./UploadMiscellaneous.js";

import CopyMoveActionItem from "./ActionItem/CopyMoveItem";
import UploadActionItem from "./ActionItem/UploadItem";

const ACTION = {
  COPY: "copy",
  MOVE: "move",
  UPLOAD: "upload",
};

export default {
  props: ["type", "id"],
  mixins: [fileManagerMixin],
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        {
          text: "Modified",
          value: "last_modified",
        },
        {
          text: "File size",
          value: "size",
        },
      ],
      optionsMultiple: [
        {
          icon: "download",
          text: "下載",
          action: () => {
            this.download();
          },
        },
        {
          icon: "delete",
          text: "刪除",
          action: () => {
            this.rmToggle = true;
            this.rmFiles = this.selected.slice();
          },
        },
        {
          icon: "folder-move",
          text: "移動",
          action: () => {
            this.drawerToggle = true;
            this.sub.action = ACTION.MOVE;
          },
        },
        {
          icon: "file-multiple",
          text: "複製",
          action: () => {
            this.drawerToggle = true;
            this.sub.action = ACTION.COPY;
          },
        },
      ],
      optionsSingle: [
        {
          icon: "form-textbox",
          text: "重新命名",
          action: () => {
            this.renameToggle = true;
          },
        },
      ],

      pwd: [],

      renameToggle: false,
      renameInput: "",
      rmToggle: false,
      rmFiles: [],

      drawerToggle: false,

      rules: {
        renameUniqueFile: (value) => {
          const ext = this.extension(this.selected[0].name);
          return (
            this.files.filter((file) =>
              ext.length === 0 //is dir
                ? file.name === value
                : file.name === `${value}.${ext}`
            ).length === 0 || "該路徑已有該檔案或資料夾"
          );
        },
      },

      sub: {
        action: "",
        pwdStr: "",
      },

      actionMemoToggle: false,
      /* format
      {
        fromDir: "",
        toDir: "",
        exists: [files],
        action: "",
      },
       */
      actionMemos: [],
    };
  },
  methods: {
    sub_mkdir(subPwdStr, file) {
      if (subPwdStr === this.pwdStr) {
        this.files.unshift(file);
      }
    },
    icon(mimeType) {
      return fileIcon.icon(mimeType);
    },

    download() {
      const files = this.selected.map((f) => {
        return f.name;
      });

      this.$api.fileManager
        .download(this.type, this.id, this.pwdStr, files)
        .then((res) => {
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(res.data);
          a.href = url;
          a.download = decodeURIComponent(res.headers["content-disposition"]);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((err) => console.error(err));
    },

    async remove() {
      await this.$api.fileManager
        .remove(
          this.type,
          this.id,
          this.pwdStr,
          this.selected.map((f) => f.name)
        )
        .then(() => {
          this.files = this.files.filter(
            (f) => !this.selected.find((s) => s.name === f.name)
          );
        })
        .catch((err) => console.error(err));
    },

    async rmHandle() {
      await this.remove();
      this.rmToggle = false;
      this.selected = [];
    },

    async cd(dir) {
      await this.ls(dir);
      this.selected = [];
    },

    async move() {
      const fromDir = this.pwdStr;
      const toDir = this.sub.pwdStr;

      await this.$api.fileManager
        .move(
          this.type,
          this.id,
          fromDir,
          toDir,
          this.selected.map((f) => f.name)
        )
        .then((res) => {
          const { exists } = res.data;
          const action_selfs = res.data.action_selfs
            ? res.data.action_selfs
            : [];

          this.addCopyMoveMemo(
            fromDir,
            toDir,
            exists,
            action_selfs,
            ACTION.MOVE
          );

          const hasMove = this.selected.filter(
            (f) => !exists.includes(f.name) && !action_selfs.includes(f.name)
          );

          this.files = this.files.filter((f) => !hasMove.includes(f));
        })
        .catch((err) => console.error(err));
    },

    async copy() {
      const fromDir = this.pwdStr;
      const toDir = this.sub.pwdStr;
      await this.$api.fileManager
        .copy(
          this.type,
          this.id,
          fromDir,
          toDir,
          this.selected.map((f) => f.name)
        )
        .then((res) => {
          const { exists } = res.data;
          const action_selfs = res.data.action_selfs
            ? res.data.action_selfs
            : [];
          this.addCopyMoveMemo(
            fromDir,
            toDir,
            exists,
            action_selfs,
            ACTION.COPY
          );
        })
        .catch((err) => console.error(err));
    },

    addCopyMoveMemo(fromDir, toDir, exists, action_selfs, action) {
      if (exists.length > 0 || action_selfs.length > 0) {
        const existFiles = exists.map((e) =>
          this.files.find((f) => f.name === e)
        );

        const action_selfs_files = action_selfs.map((e) =>
          this.files.find((f) => f.name === e)
        );
        this.actionMemos.unshift({
          fromDir,
          toDir,
          exists: existFiles,
          action_selfs: action_selfs_files,
          action,
        });
      }
    },

    async runAction(pwdStr) {
      this.sub.pwdStr = pwdStr;
      await this[this.sub.action]();
      this.drawerToggle = false;
      this.selected = [];
      this.sub.action = "";
      this.sub.pwdStr = "";
    },

    async keepBoth_replace(actionMemo, file, override_flag) {
      const { fromDir, toDir, action } = actionMemo;

      await this.$api.fileManager[action](
        this.type,
        this.id,
        fromDir,
        toDir,
        [file],
        override_flag
      )
        .then((res) => {
          const newfile = res.data.files[0];

          if (newfile) {
            if (
              (action === ACTION.MOVE && fromDir === this.pwdStr) ||
              (override_flag == fileConfig.cp_mv.OVERRIDE_REPLACE &&
                toDir === this.pwdStr)
            ) {
              this.files = this.files.filter((f) => f.name !== file);
            }

            if (toDir === this.pwdStr) {
              this.files.unshift(newfile);
            }
          }
        })
        .catch((err) => console.error(err));

      actionMemo.exists = actionMemo.exists.filter((f) => f.name !== file);
      if (
        actionMemo.exists.length === 0 &&
        actionMemo.action_selfs.length === 0
      ) {
        this.actionMemos = this.actionMemos.filter(
          (action) => action !== actionMemo
        );
      }
    },

    keepBoth(actionMemo, file) {
      this.keepBoth_replace(
        actionMemo,
        file,
        fileConfig.cp_mv.OVERRIDE_KEEPBOTH
      );
    },

    replace(actionMemo, file) {
      this.keepBoth_replace(
        actionMemo,
        file,
        fileConfig.cp_mv.OVERRIDE_REPLACE
      );
    },

    async rename() {
      const file = this.selected[0];
      const renameFile =
        file.mimeType === "directory"
          ? this.renameInput
          : this.renameInput + `.${this.extension(file.name)}`;
      await this.$api.fileManager
        .rename(this.type, this.id, this.pwdStr, file.name, renameFile)
        .then((res) => {
          const newFile = res.data.file;
          const exist = res.data.exist;
          if (exist) {
            return;
          }
          this.files.splice(this.files.indexOf(file), 1, newFile);
          this.renameToggle = false;
          this.selected = [];
        })
        .catch((err) => console.error(err));
    },

    removeActionMemo(fail) {
      this.actionMemos = this.actionMemos.filter((f) => f !== fail);
    },

    extension(value) {
      return pathHelper.extension(value);
    },

    upload(files) {
      const paths = Array.from(files).map((f) =>
        f.webkitRelativePath.length === 0 ? f.name : f.webkitRelativePath
      );
      this.uploadHandle(paths, files);
    },

    dropUpload(paths, files) {
      this.uploadHandle(paths, files);
    },

    uploadHandle(paths, files) {
      const formData = uploadMiscellaneous.getUploadFormData(paths, files);
      formData.append("dir", this.pwdStr);
      this.$api.fileManager
        .upload(this.type, this.id, formData)
        .then((res) => {
          const { exists, upload_files } = res.data;
          upload_files.forEach((f) => {
            this.files.unshift(f);
          });
          if (exists.length > 0) {
            this.addUploadActionMemo(exists, paths, files, this.pwdStr);
          }
        })
        .catch((err) => console.error(err));
    },

    addUploadActionMemo(exists, paths, files, dir) {
      const group = uploadMiscellaneous.uploadExistGroup(exists, paths, files);
      this.actionMemos.unshift({
        rootItems: group,
        action: "upload",
        dir,
      });
    },

    async upload_keepBoth_replace(actionMemo, rootItemName, override_flag) {
      const { paths, files } = actionMemo.rootItems[rootItemName];

      const formData = uploadMiscellaneous.getUploadFormData(paths, files);
      formData.append("dir", this.pwdStr);
      formData.append("override_flag", override_flag);
      await this.$api.fileManager
        .upload(this.type, this.id, formData)
        .then((res) => {
          const { upload_files } = res.data;
          const newfile = upload_files[0];

          if (newfile) {
            if (override_flag == fileConfig.cp_mv.OVERRIDE_REPLACE) {
              this.files = this.files.filter((f) => f.name !== rootItemName);
            }
            if (actionMemo.dir === this.pwdStr) {
              this.files.unshift(newfile);
            }
          }
        })
        .catch((err) => console.error(err));

      Reflect.deleteProperty(actionMemo.rootItems, rootItemName);
      this.actionMemos = [...this.actionMemos];
      if (Object.keys(actionMemo.rootItems).length === 0) {
        this.actionMemos = this.actionMemos.filter(
          (action) => action !== actionMemo
        );
      }
    },

    upload_keepBoth(actionMemo, rootItemName) {
      this.upload_keepBoth_replace(
        actionMemo,
        rootItemName,
        fileConfig.cp_mv.OVERRIDE_KEEPBOTH
      );
    },

    upload_replace(actionMemo, rootItemName) {
      this.upload_keepBoth_replace(
        actionMemo,
        rootItemName,
        fileConfig.cp_mv.OVERRIDE_REPLACE
      );
    },
  },
  created() {
    this.ls(this.pwdStr);
  },
  watch: {
    renameToggle(val) {
      if (!val) {
        this.renameInput = "";
      }
    },
  },
  components: {
    LinkText,
    SubFileManager,
    ActionMemoList,
    Uploader,
    DropUploader,
    CopyMoveActionItem,
    UploadActionItem,
  },
};
</script>