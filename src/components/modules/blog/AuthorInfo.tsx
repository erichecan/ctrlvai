import Image from 'next/image'
import type { Author } from '@/types'

interface AuthorInfoProps {
  author: Author
  date: string
  category: string
}

export function AuthorInfo({ author, date, category }: AuthorInfoProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {author.image && (
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={author.image}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div>
        <div className="flex items-center gap-3">
          <p className="font-medium">{author.name}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
        
        <div className="mt-1">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
            {category}
          </span>
        </div>
      </div>
    </div>
  )
}