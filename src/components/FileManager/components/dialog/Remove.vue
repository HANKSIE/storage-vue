<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row justify-center items-center">
        <q-icon class="q-mr-sm" size="sm" name="warning" />
        <span class="text-h6">確定刪除這些檔案?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn flat label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { useDialogPluginComponent } from "quasar";
import { defineComponent } from "vue";

export default defineComponent({
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const onOKClick = (): void => {
      onDialogOK();
    };

    return {
      dialogRef,
      onDialogHide,
      onOKClick,
      onCancelClick: onDialogCancel,
    };
  },
});
</script>
