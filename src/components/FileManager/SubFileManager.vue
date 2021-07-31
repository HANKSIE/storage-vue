<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-subheader> Place </v-subheader>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-action>
        <v-breadcrumbs :items="pwdBreadcrumbs">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item>
              <link-text @click="ls(item.path, 1)">
                {{ item.text }}
              </link-text>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-subheader> Choose a destination </v-subheader>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item v-for="item in files" :key="item.name">
      <v-list-item-avatar size="30">
        <img :src="folderImage" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          <link-text @click="ls(concatPwdStr(item.name), 1)">
            {{ item.name }}
          </link-text>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <template v-if="mkdirToggle">
      <v-list-item>
        <v-list-item-action>
          <v-row>
            <v-col cols="9">
              <v-text-field
                required
                single-line
                v-model="mkdirName"
                :rules="[rules.uniqueFile]"
              />
            </v-col>
            <v-col cols="3">
              <v-btn @click="subMkdirHandle">ok</v-btn>
            </v-col>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </template>
    <v-list-item>
      <v-list-item-action>
        <v-btn text @click="mkdirToggle = !mkdirToggle">new folder</v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-action>
        <v-btn color="primary" @click="runAction">{{ action }} here</v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import LinkText from "@/components/LinkText";
import fileManagerMixin from "./mixin";

export default {
  props: ["toggle", "action"],
  mixins: [fileManagerMixin],
  data() {
    return {
      folderImage: require("@/assets/file/folder.png"),
    };
  },
  methods: {
    runAction() {
      this.$emit("runAction", this.pwdStr);
    },
    async subMkdirHandle() {
      if (await this.mkdirHandle()) {
        this.$emit("mkdir", this.pwdStr, this.files[0]);
      }
    },
  },
  watch: {
    toggle(isOpen) {
      if (isOpen) {
        this.ls(this.pwdStr, 1);
      } else {
        this.pwd = [];
      }
    },
  },
  components: { LinkText },
};
</script>