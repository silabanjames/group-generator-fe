import axiosInstance from "@/lib/axios"
import { Admin, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"

async function getData(): Promise<Admin[]> {
  return await axiosInstance.get("/admin").then((res) => res.data)
  
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">List Admin</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
