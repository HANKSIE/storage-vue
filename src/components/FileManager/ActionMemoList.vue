<template>
  <v-row class="flex-column">
    <v-col>
      <div class="d-flex justify-end">
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-col>

    <v-col>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <span class="text-h5">Progress</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-if="memosLength === 0">
          <v-list-item>
            <v-list-item-content>
              There are no operations which require your attention.
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <slot></slot>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["memosLength"],
};
</script>
