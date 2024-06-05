import { Mentor, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Mentor[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "James",
      departement: "Informatika",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">List Mentor</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
