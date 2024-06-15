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
import { Department } from "@/var/Departement.enum"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import axiosInstance from "@/lib/axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { getDetailMemberAsync } from "@/redux/slices/memberSlice"
import Swal from "sweetalert2"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  departement: z.nativeEnum(Department, {
    errorMap: () => ({ message: "Departement is required" }),
  }),
  year: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  })
})

export default function ProfileForm({ params }: { params: { param: string[] } }) {
  const member = useSelector((state: RootState) => state.member.member)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
      dispatch(getDetailMemberAsync(params.param[0])).then((data) => {})
  }, [])

  useEffect(() => {
    console.log("member", member)
    form.setValue("name", member.name)
    form.setValue("departement", member.departement)
    form.setValue("year", member.year)
  }, [member])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      departement: member.departement,
      year: ""
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await axiosInstance
      .put(`/member/${member.id}`, values)
      .then(() => {
        router.push("/admin/member")
        router.refresh();

        Swal.fire({
          icon: "success",
          title: "Member has been updated",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Edit Member</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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
                <FormLabel>Departement</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
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
                  <Input placeholder="Year" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-row justify-between">
            <Button variant="destructive" type="button" onClick={() => router.back()}>Kembali</Button>
            <Button type="submit">Edit</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
