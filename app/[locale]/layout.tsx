import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import './globals.css';
import { cn } from '../../lib/utils';
import { DMSans,JNFont } from '../../lib/fonts';
import { SidebarContextProvider } from '@/contexts/SidebarContext';
import { AuthProvider } from '../Providers';
import { Toaster } from '@/components/ui/toaster';

type Props ={
  children:ReactNode,
  params:{locale:string}
}

const locales = ['en', 'jn'];

export function generateStaticParams(){
  return locales.map((locale)=>({locale}));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  // Wrap locale in an object with the locale key
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={cn(locale === 'jn' ? JNFont.variable : DMSans.variable, "text-black")}>
        {/* <AuthProvider> */}
          <NextIntlClientProvider messages={messages}>
            <SidebarContextProvider>
              <main>{children}</main>
              <Toaster />
            </SidebarContextProvider>
          </NextIntlClientProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
