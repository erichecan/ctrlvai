import Link from 'next/link'

interface LearningItem {
  id: string
  title: string
  description: string
  icon: string
  url: string
}

interface LearningCenterProps {
  data?: LearningItem[]
}

export function LearningCenter({ data = [] }: LearningCenterProps) {
  if (!data || data.length === 0) {
    return (
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">学习中心</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">暂无学习内容</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6">学习中心</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Link 
            key={item.id}
            href={item.url}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <img src={item.icon} alt={item.title} className="w-12 h-12" />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}