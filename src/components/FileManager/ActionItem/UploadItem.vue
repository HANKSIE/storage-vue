<template>
  <v-list-item-group v-if="Object.keys(memo.rootItems).length > 0" class="mt-5">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <v-subheader>
            {{ Object.keys(memo.rootItems).length }} items weren't upload
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
    <v-list-item
      v-for="([rootItemName, item], i) in Object.entries(memo.rootItems)"
      :key="i"
    >
      <v-list-item-content>
        <v-list-item-title class="d-flex">
          <v-img
            :src="
              item.files.length > 1
                ? icon('directory')
                : icon(item.files[0].type)
            "
            max-width="30"
            class="mr-3"
          />
          <span class="text-subtitle-1">{{ rootItemName }}</span>
        </v-list-item-title>
        <div class="text-body-2">
          A file with this name already exists. Would you like to replace the
          existing one, or rename it and keep them both?
        </div>
        <v-row class="mt-3">
          <v-col cols="6">
            <v-btn outlined tile @click="$emit('keepBoth', memo, rootItemName)">
              keep both
            </v-btn>
          </v-col>
          <template v-if="item.files.length === 1">
            <v-col cols="6">
              <v-btn
                outlined
                tile
                @click="$emit('replace', memo, rootItemName)"
              >
                replace
              </v-btn>
            </v-col>
          </template>
        </v-row>
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