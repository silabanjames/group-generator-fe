"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/mentor')
    router.refresh()
  }, [])

  return (
    <div>Test Admin</div>
  )
}

export default page