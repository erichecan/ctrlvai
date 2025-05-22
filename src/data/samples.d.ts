declare module "@/data/samples.json" {
  const value: {
    samples: Array<{
      id: string;
      name: string;
      // 添加其他必要字段
    }>;
  };
  export default value;
}