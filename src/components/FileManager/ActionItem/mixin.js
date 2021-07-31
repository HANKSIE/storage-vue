import fileIcon from "@/utils/fileIcon";

export default {
  props: ['memo'],
  methods: {
    icon(mimeType) {
      return fileIcon.icon(mimeType);
    },
  },
};