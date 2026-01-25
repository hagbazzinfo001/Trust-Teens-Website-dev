"use client";

import dynamic from "next/dynamic";

const DecapCMS = dynamic(
  () => import("decap-cms-app"),
  { ssr: false }
);

export default function AdminPage() {
  return <DecapCMS />;
}
