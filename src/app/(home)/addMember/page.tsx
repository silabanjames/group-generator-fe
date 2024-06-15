"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Department } from "@/var/Departement.enum"
import axiosInstance from "@/lib/axios"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  departement: z.nativeEnum(Department, { errorMap: () => ({ message: "Departement is required" }) }),
  year: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  })
})

export default function AddPerson() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // departement: Department.TEKNIK_INFORMATIKA,
      year: ""
    },
  })

  const router = useRouter()

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await axiosInstance
      .post("/member", values)
      .then((res) => {
        router.push("/")
        router.refresh();
        
        Swal.fire({
          icon: "success",
          title: "Member has been updated",
          showConfirmButton: false,
          timer: 1500
        });
      }).catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className="flex flex-col items-center flex-grow">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold my-8 text-center">Tambahkan Peserta</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-2/3 xl:w-1/2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Nama" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="departement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- Select Department -" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        Object.entries(Department).map(([key, value]) => (
                          <SelectItem key={key} value={value}>
                            {value}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun</FormLabel>
                <FormControl>
                  <Input placeholder="Tahun" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="inline-block">Submit</Button>
        </form>
      </Form>
    </div>
  )
}