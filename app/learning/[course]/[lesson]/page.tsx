// Define VideoCardProps inline to avoid import issues
interface VideoCardProps {
  title?: string;
  thumbnail?: string;
  duration?: string;
  youtubeUrl?: string;
  description?: string;
}

import VideoCard from '@/components/VideoCard';
import courseData from '@/data/samples.json'

export default function LessonPage({ params }: { params: { course: string; lesson: string } }) {
  // Ensure courseData.samples is correctly typed and accessed
  const course = courseData.samples.find(sample => sample.id === params.course) || { lessons: [] };
  const lesson = 'lessons' in course ? course.lessons.find(lesson => lesson.id === params.lesson) || { videos: [] } : { videos: [] };

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{lesson.settings?.title || 'Untitled Lesson'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lesson.videos.map((video, index) => (
          <VideoCard
            key={index}
            {...(video as VideoCardProps)}
          />
        ))}
      </div>

      {lesson.settings?.content && (
        <div className="mt-8 prose max-w-none">
          {lesson.settings.content}
        </div>
      )}
    </div>
  )
}
