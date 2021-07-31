<template>
  <v-list-item-group
    v-if="memo.exists.length > 0 || memo.action_selfs.length > 0"
    class="mt-5"
  >
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-subheader>
            {{ memo.exists.length + memo.action_selfs.length }} items weren't
            {{ memo.action }}
          </v-subheader>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="$emit('remove', memo)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item v-for="(file, i) in memo.exists" :key="i">
      <v-list-item-content>
        <v-list-item-title class="d-flex">
          <v-img :src="icon(file.mimeType)" max-width="30" class="mr-3" />
          <span class="text-subtitle-1">{{ file.name }}</span>
        </v-list-item-title>
        <div class="text-body-2">
          A file with this name already exists. Would you like to replace the
          existing one, or rename it and keep them both?
        </div>
        <v-row class="mt-3">
          <v-col cols="6">
            <v-btn outlined tile @click="$emit('keepBoth', memo, file.name)">
              keep both
            </v-btn>
          </v-col>
          <template v-if="file.mimeType !== 'directory'">
            <v-col cols="6">
              <v-btn outlined tile @click="$emit('replace', memo, file.name)">
                replace
              </v-btn>
            </v-col>
          </template>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="(file, i) in memo.action_selfs" :key="-(i + 1)">
      <v-list-item-content>
        <v-list-item-title class="d-flex">
          <v-img :src="icon(file.mimeType)" max-width="30" class="mr-3" />
          <span class="text-subtitle-1">{{ file.name }}</span>
        </v-list-item-title>
        <div class="text-body-2">
          The destination folder is the same as the source folder.
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-list-item-group>
</template>
<script>
import mixin from "./mixin.js";

export default {
  mixins: [mixin],
};
</script>
