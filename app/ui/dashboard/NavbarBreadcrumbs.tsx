import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

// 如果你的当前路径是 /A/B/C/D/E，那么 pathArr 会是 ['A', 'B', 'C', 'D', 'E']。

// breadcrumbs 变量会是一个长度为 5 的数组，内容如下：

// 第 0 项：<Link href="/A">A</Link>
// 第 1 项：<Link href="/A/B">B</Link>
// 第 2 项：<Link href="/A/B/C">C</Link>
// 第 3 项：<Link href="/A/B/C/D">D</Link>
// 第 4 项：<Typography>E</Typography>（最后一个用 Typography，不可点）
// 再加上前面的 Home 链接，最终 items 是：

// <Link href="/">Home</Link>
// <Link href="/A">A</Link>
// <Link href="/A/B">B</Link>
// <Link href="/A/B/C">C</Link>
// <Link href="/A/B/C/D">D</Link>
// <Typography>E</Typography>
// 效果：Home / A / B / C / D / E

export default function NavbarBreadcrumbs() {
  const pathname = usePathname();
  // 拆分路径并过滤空字符串
  const pathArr = pathname.split('/').filter(Boolean);

  // 构造面包屑数据
  const breadcrumbs = pathArr.map((segment, idx) => {
    // 累加路径
    const href = '/' + pathArr.slice(0, idx + 1).join('/');
    // 首字母大写
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    // 最后一个用 Typography，其余用 Link
    return idx === pathArr.length - 1 ? (
      <Typography key={href} variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {label}
      </Typography>
    ) : (
      <Link key={href} href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="body1">{label}</Typography>
      </Link>
    );
  });

  // 可选：在最前面加一个 Home
  const items = [
    <Link key="/" href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Typography variant="body1">Home</Typography>
    </Link>,
    ...breadcrumbs,
  ];

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {items}
    </StyledBreadcrumbs>
  );
}
