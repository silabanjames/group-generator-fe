import axiosInstance from "@/lib/axios"
import { Mentor, columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getData(): Promise<Mentor[]> {
  // Fetch data from your API here.
  return await axiosInstance.get("/mentor").then((res) => res.data)
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-8">List Mentor</h1>
        <Button className="mr-2 bg-teal-500">
          <Link href="/admin/mentor/addMentor">Tambah Mentor</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
