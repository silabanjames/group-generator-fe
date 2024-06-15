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
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { getDetailMentorAsync } from "@/redux/slices/mentorSlice"
import { Department } from "@/var/Departement.enum"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import axiosInstance from "@/lib/axios"
import Swal from "sweetalert2"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  departement: z.nativeEnum(Department, {
    errorMap: () => ({ message: "Departement is required" })
  })
})

export default function ProfileForm({ params }: { params: { param: string[] } }) {
  const mentor = useSelector((state: RootState) => state.mentor.mentor)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();


  useEffect(() => {
      dispatch(getDetailMentorAsync(params.param[0])).then(() => {})
  }, [])

  useEffect(() => {
    form.setValue("name", mentor.name)
    form.setValue("departement", mentor.departement)
  }, [mentor])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      departement: Department.TEKNIK_INFORMATIKA,
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await axiosInstance
      .put(`/mentor/${params.param[0]}`, values)
      .then((res) => {
        router.push("/admin/mentor");
        router.refresh();

        Swal.fire({
          icon: "success",
          title: "Mentor has been updated",
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Edit Mentor</h1>
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

          <div className="w-full flex flex-row justify-between">
            <Button 
              variant="destructive" 
              type="button" 
              onClick={() => router.back()}
            >
              Kembali
            </Button>
            <Button type="submit">Edit</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
