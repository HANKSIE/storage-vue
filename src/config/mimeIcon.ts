
const config: Record<string, any> = {
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

  directory: "folder",
  default: "file",
};
  
  export default config;