import axiosInstance from "@/lib/axios"
import { Member, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Member[]> {
  // Fetch data from your API here.
  return await axiosInstance.get("/member").then((res) => res.data)
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">List Member</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
