"use client"

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
import { loginHelpers } from "@/helpers/helpers"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values)
    try {
    
    await loginHelpers(values.email, values.password)
    router.push("/admin/mentor")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    // <main className="flex min-h-screen flex-col items-center justify-center p-12 md:p-24">
    <main className="min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-2/3 sm:w-1/2 md:1/3 xl:w-1/4 border border-2 p-4 md:p-12 rounded-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-bold">Login</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  )
}

export default Login