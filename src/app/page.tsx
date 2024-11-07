import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Head from "next/head";
import { Header } from "~/components/Header";
import { Content } from "~/components/Content";
import React from "react";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <Head>
        <title>NoteTaker</title>
        <meta name="description" content="NoteTaker" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <Header sessionData={session} />
        <Content sessionData={session}/>
      </main>
    </HydrateClient>
  );
}
