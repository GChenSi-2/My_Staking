'use client';

export default function TailwindTest() {
  return (
    <div className="p-8 bg-blue-500 text-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Tailwind Test</h1>
      <p className="text-lg">
        如果你能看到这个蓝色背景、白色文字、圆角和阴影，说明 Tailwind CSS
        工作正常！
      </p>
      <button className="mt-4 bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
        测试按钮
      </button>
    </div>
  );
}
