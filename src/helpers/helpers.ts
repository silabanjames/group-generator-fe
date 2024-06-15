
"use server"

import axiosInstance from '@/lib/axios'
import * as jose from 'jose'
import { cookies } from "next/headers"


const secretKey = 'test1234'
const key = new TextEncoder().encode(secretKey);

export async function decrypt(input: string) {
    const decode = await jose.jwtVerify(input, key)
    console.log("hasil decode", decode)
    return decode.payload
}

export async function loginHelpers(email: string, password: string) {
  try {
    const user =  await axiosInstance
    .post("/auth/login", {
      email,
      password
    })
    .then((res) => {
      return {
        message: res.data.message,
        user: res.data.user,
        token: res.data.token
      }
    }) 

    if(user) {
      const expires = new Date(Date.now() + 100 * 1000);
      cookies().set("session", user.token, { expires })
    }
    return user
  } catch (error) {
    console.log(error)
  }
}

export async function logoutHelpers() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = await cookies().get("session")?.value
  // console.log("Nilai dari token adalah =", session)
  if(!session) return null

  return session
}