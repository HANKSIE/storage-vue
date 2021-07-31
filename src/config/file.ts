
const config: Record<string, any> = {
  icon: {
    mime: {
      application: {
        "vnd.openxmlformats-officedocument.wordprocessingml.document": "word",
        "msword": "word",
        "vnd.ms-excel": "excel",
        "vnd.openxmlformats-officedocument.spreadsheetml.sheet": "excel",
        "vnd.ms-powerpoint": "ppt",
        "vnd.openxmlformats-officedocument.presentationml.presentation": "ppt",
        "pdf": "pdf",
        "zip": "archive",
      },
      text: {
        plain: "txt",
      },
      image: "image",
      audio: "audio",
      video: "video",
    },

    directory: "folder",
    default: "file",
  },

  ls: {
    BOTH: 0,
    DIR_ONLY: 1,
    FILE_ONLY: 2,
  },
  
  cp_mv: {
    OVERRIDE_NONE: 0,
    OVERRIDE_KEEPBOTH: 1,
    OVERRIDE_REPLACE: 2,
  },
};

export default config;