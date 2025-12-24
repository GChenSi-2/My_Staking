import ContextProvider from '../WagmiContextProvider';
import { cookies } from 'next/headers';

export default async function WagmiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const initialState = cookieStore.toString();

  return <ContextProvider cookies={initialState}>{children}</ContextProvider>;
}
