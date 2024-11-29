import { Inter } from 'next/font/google';
import './globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Viewport } from 'next';
import { headers } from 'next/headers';
import ReduxProvider from '@/redux/redux-provider';

const PATH_MAXIMUM_SCALE_1_1 = ['/'];

const inter = Inter({ subsets: ['latin'] });

export const viewport = (): Viewport => {
  const headerList = headers();
  const pathname = headerList.get('x-current-path');
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: PATH_MAXIMUM_SCALE_1_1.includes(pathname || '') ? 1.1 : 1,
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>CMI Test</title>
        <meta name="description" content="CMI Test" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Toaster />
        <AntdRegistry>
          <ReduxProvider>{children}</ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
