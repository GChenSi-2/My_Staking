import { useState } from 'react';
import { cn } from '../lib/cn';

export function MySwitch() {
  const [isOn, setIsOn] = useState(false);
  return (
    <div
      className="w-48 h-20 bg-purple-600 rounded-xl"
      onClick={() => setIsOn(!isOn)}
    >
      <div className="size-full flex items-center cursor-pointer px-6">
        <div
          className={cn(
            'size-12 bg-white rounded-full shadow-md transform duration-300 ease-in-out',
            isOn ? 'translate-x-24' : 'translate-x-0'
          )}
        ></div>
      </div>
    </div>
  );
}
