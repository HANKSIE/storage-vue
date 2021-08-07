import { Column } from "@/type/quasar/table";

export const columns: Column[] = [
    {
      name: "name",
      label: "Name",
      field: "name",
      sortable: true,
    },
    {
      name: "lastModified",
      label: "Modified",
      field: "lastModified",
      sortable: true,
    },
    {
      name: "size",
      label: "File size",
      field: "size",
      sortable: true,
    },
];