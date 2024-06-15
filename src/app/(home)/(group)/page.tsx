"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { getGroupAsync } from "@/redux/slices/groupSlice"
import { useEffect } from "react"

export default function Group() {
  const groups = useSelector((state: RootState) => state.group.groups)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getGroupAsync())
  }, [])

  // console.log(groups)

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold my-8 text-center">Pembagian Kelompok</h1>
      <div className="flex flex-row flex-grow flex-wrap gap-8 justify-center items-center p-2">
        {
          groups.map((group, index) => ( (group.members!.length > 0) ? 
            <Card className="w-[350px] border-teal-500 border-4" key={group.id}>
              <CardHeader className="border-b-2">
                <CardTitle>{index + 1}. {group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="ps-5 mt-2 space-y-1 list-disc">
                  {group.members!.map(
                    (member) => (<li key={member.id}>{member.name} <span>({member.departement} {member.year})</span></li>))
                  }
                </ul>
              </CardContent>
            </Card> : <></>
            )
          )
        }

        {/* <Card className="w-[350px] border-teal-500 border-4">
          <CardHeader>
            <CardTitle>James Silaban</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="ps-5 mt-2 space-y-1 list-disc">
              <li>Jessica Jeselyn <span>(Elektro 20)</span></li>
              <li>Januar Akbar <span>(Elektro 20)</span></li>
              <li>James Maranata Silaban Sitio <span>(Elektro 20)</span></li>
            </ul>
          </CardContent>
        </Card> */}
        
      </div>
    </div>
  )
}
