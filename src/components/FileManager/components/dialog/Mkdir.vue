<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <span class="text-h6">新增資料夾</span>
      </q-card-section>
      <q-card-section class="row justify-center items-center">
        <q-input
          filled
          v-model="dirname"
          label="資料夾名稱"
          :rules="[filenameRule]"
        >
          <template v-slot:prepend>
            <q-icon name="create_new_folder" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn label="Cancel" outline @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { useDialogPluginComponent } from "quasar";
import { defineComponent, ref } from "vue";
import filenameRule from "../../validate/rules/filename";
import validate from "../../validate/validate";

export default defineComponent({
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const dirname = ref<string>("");

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const onOKClick = (): void => {
      const dir = dirname.value;

      if (validate(filenameRule(dir))) {
        onDialogOK(dir);
        dirname.value = "";
      }
    };

    return {
      dirname,
      dialogRef,
      onDialogHide,
      onOKClick,
      onCancelClick: onDialogCancel,
      filenameRule,
    };
  },
});
</script>
