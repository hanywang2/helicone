import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { useState } from "react";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { NotificationProvider } from "../components/shared/notification/NotificationContext";
import Notification from "../components/shared/notification/Notification";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  if (typeof window !== "undefined") {
    document.documentElement.classList.add("dark");
  }

  return (
    <>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <NotificationProvider>
          <Component {...pageProps} />
          <Notification />
        </NotificationProvider>
      </SessionContextProvider>
      <Analytics />
    </>
  );
}
