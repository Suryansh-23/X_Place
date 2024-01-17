import Github from "@/components/shared/icons/github";
import Twitter from "@/components/shared/icons/twitter";
import { Backpack, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <a
        href="https://twitter.com/steventey/status/1613928948915920896"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
      >
        <Twitter className="h-5 w-5 text-[#1d9bf0]" />
        <p className="text-sm font-semibold text-[#1d9bf0]">
          Introducing X/Place
        </p>
      </a>
      <h1
        className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem] p-2"
        style={{
          animationDelay: "0.15s",
          animationFillMode: "forwards",
        }}
      >
        Unleash Your Creativity on the Blockchain
      </h1>
      <p
        className="mt-6 animate-fade-up text-center text-gray-500 [text-wrap:balance] md:text-xl"
        style={{
          animationDelay: "0.25s",
          animationFillMode: "forwards",
        }}
      >
        Join the global art movement with Solana xNFTs. Each pixel you own
        contributes to a collective masterpiece.
      </p>
      <div
        className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5"
        style={{
          animationDelay: "0.3s",
          animationFillMode: "forwards",
        }}
      >
        <a
          className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
          href="#canvas"
        >
          <Sparkles />
          <p>See the Magic</p>
        </a>
        <Link
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <Backpack />
          <p>Get Me One</p>
        </Link>
      </div>
    </div>
  );
}
