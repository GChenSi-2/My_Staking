

import { useColorScheme } from '@mui/material/styles';

export default function ShowScheme() {
  const { mode, setMode } = useColorScheme();
//   setMode('dark');
  if (!mode) {
    return <div>主题不支持颜色切换</div>; // 会显示这个
  }
  
  return <div>当前模式: {mode}</div>;
}