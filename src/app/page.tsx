"use client";

import { GlobeDemo } from "@/client/Globe";
import { WordEffect } from "@/client/Words";




export default function Home() {
  return (
    <div className="mt-10 ">

      
      <WordEffect/>
      <GlobeDemo />
    </div>
  );
}