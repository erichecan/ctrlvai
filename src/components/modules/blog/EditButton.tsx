'use client'

import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface EditButtonProps {
  postId: string
}

export function EditButton({ postId }: EditButtonProps) {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <Link
      href={`/blog/${postId}/edit`}
      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
    >
      <Pencil className="w-4 h-4" />
      Edit
    </Link>
  )
}