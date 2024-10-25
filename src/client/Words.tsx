"use client";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

const words = `Welcome to Bunky text
`;

export function WordEffect() {
  return <TextGenerateEffect words={words} />;
}
