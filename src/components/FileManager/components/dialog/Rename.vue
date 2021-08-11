<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center">
        <span class="text-h6">重新命名</span>
      </q-card-section>
      <q-card-section class="column justify-center items-center">
        <div>
          <q-input
            filled
            v-model="filename"
            label="檔案名稱"
            :rules="[filenameRule]"
          >
            <template v-slot:prepend>
              <q-icon name="drive_file_rename_outline" />
            </template>
            <template v-slot:append>
              <span class="text-body1 self-end q-mb-sm">.{{ ext }}</span>
            </template>
          </q-input>
        </div>
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
import { defineComponent, ref } from "vue";
import filenameRule from "../../validate/rules/filename";
import validate from "../../validate/validate";

export default defineComponent({
  emits: [...useDialogPluginComponent.emits],
  props: {
    ext: String,
  },
  setup(props) {
    const filename = ref<string>("");

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const onOKClick = (): void => {
      const name = filename.value;
      if (validate(filenameRule(name))) {
        const extension = props.ext ? "." + props.ext : "";
        onDialogOK(`${filename.value}${extension}`);
        filename.value = "";
      }
    };

    return {
      filename,
      dialogRef,
      onDialogHide,
      onOKClick,
      onCancelClick: onDialogCancel,
      filenameRule,
    };
  },
});
</script>
