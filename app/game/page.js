"use client"
import dynamic from "next/dynamic";

const OneShot = dynamic(() => import("./OneShot/OneShot"), { ssr: false });

export default function OneShotPage() {
  return <OneShot />;
}
