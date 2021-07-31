<template>
  <div id="drop_zone" @drop="dropHandler" @dragover="dragOverHandler">
    <slot></slot>
  </div>
</template>
<script>
//以 https://stackoverflow.com/a/53058574 解決方案修改
export default {
  methods: {
    dragOverHandler(e) {
      e.preventDefault();
    },

    // Drop handler function to get all files
    async dropHandler(e) {
      e.preventDefault();
      const dataTransferItemList = e.dataTransfer.items;
      const files = [],
        filePaths = [];
      // Use BFS to traverse entire directory/file structure
      const queue = [];
      // Unfortunately dataTransferItemList is not iterable i.e. no forEach
      for (let i = 0; i < dataTransferItemList.length; i++) {
        queue.push(dataTransferItemList[i].webkitGetAsEntry());
      }
      while (queue.length > 0) {
        const entry = queue.shift();
        if (entry.isFile) {
          files.push(await this.getFile(entry));
          filePaths.push(entry.fullPath);
        } else if (entry.isDirectory) {
          queue.push(
            ...(await this.readAllDirectoryEntries(entry.createReader()))
          );
        }
      }

      // console.log(filePaths);
      this.$emit("upload", filePaths, files);
    },

    getFile(entry) {
      return new Promise((resolve) => {
        entry.file((file) => {
          resolve(file);
        });
      });
    },

    // Get all the entries (files or sub-directories) in a directory
    // by calling readEntries until it returns empty array
    async readAllDirectoryEntries(directoryReader) {
      const entries = [];
      let readEntries = await this.readEntriesPromise(directoryReader);
      while (readEntries.length > 0) {
        entries.push(...readEntries);
        readEntries = await this.readEntriesPromise(directoryReader);
      }
      return entries;
    },

    // Wrap readEntries in a promise to make working with readEntries easier
    // readEntries will return only some of the entries in a directory
    // e.g. Chrome returns at most 100 entries at a time
    async readEntriesPromise(directoryReader) {
      try {
        return await new Promise((resolve, reject) => {
          directoryReader.readEntries(resolve, reject);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>