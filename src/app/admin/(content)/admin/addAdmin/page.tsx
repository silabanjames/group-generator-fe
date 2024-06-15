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

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  role: z.nativeEnum(User, { errorMap: () => ({ message: "Invalid user" }) }),
})

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",  
      role: User.USER
    },
  })
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Add Admin</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Departement" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-row justify-between">
            <Button variant="destructive" type="button">Kembali</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
