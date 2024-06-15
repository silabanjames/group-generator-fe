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
import { User } from "@/var/User.enum"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { getDetailAdminAsync } from "@/redux/slices/adminSlice"
import axiosInstance from "@/lib/axios"
import Swal from "sweetalert2"

const formSchema = z.object({
  email: z.string().email("Email must be a valid email"),
  role: z.nativeEnum(User, { required_error: "Role is required" }),
})

export default function ProfileForm({ params }: { params: { param: string[] } }) {
  const admin = useSelector((state: RootState) => state.admin.admin)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();

  useEffect(() => {
    dispatch(getDetailAdminAsync(params.param[0])).then(() => {})
  }, [])

  useEffect(() => {
    form.setValue("email", admin.email)
    form.setValue("role", admin.role)
  }, [admin])
  

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: User.USER
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await axiosInstance
      .put(`/admin/${params.param[0]}`, values)
      .then((res) => {
        // console.log(res.data)
        router.push("/admin/admin");
        router.refresh();

        Swal.fire({
          icon: "success",
          title: "Admin has been updated",
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
      <h1 className="text-2xl font-bold mb-8">Edit Admin</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- Select Department -" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        Object.entries(User).map(([key, value]) => (
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
            <Button variant="destructive" type="button">Kembali</Button>
            <Button type="submit">Edit</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
