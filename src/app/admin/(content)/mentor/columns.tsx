"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Mentor = {
  id: string
  name: string,
  departement: string,
}

export const columns: ColumnDef<Mentor>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "departement",
    header: "Departement",
  },
  // {
  //   accessorKey: "action",
  //   header: "Action"
  // }
]
