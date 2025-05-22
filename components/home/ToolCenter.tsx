import Link from 'next/link'

interface ToolItem {
  id: string
  name: string
  description: string
  icon: string
  url: string
  category: string
}

interface ToolCenterProps {
  data?: ToolItem[]
}

export function ToolCenter({ data = [] }: ToolCenterProps) {
  if (!data || data.length === 0) {
    return (
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">工具中心</h2>
        <div className="text-center py-8">
          <p className="text-gray-600">暂无工具</p>
        </div>
      </section>
    );
  }

  const categories = [...new Set(data.map(item => item.category))];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6">工具中心</h2>
      {categories.map(category => (
        <div key={category} className="mb-12">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data
              .filter(item => item.category === category)
              .map(item => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img src={item.icon} alt={item.name} className="w-12 h-12" />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}