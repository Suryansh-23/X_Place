"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Xnft() {
    const [userColor, setUserColor] = useState<string>('');
    const [backgroundColor, setBackgroundColor] = useState<string>('');
  
    const isValidHexColor = (inputColor: string): boolean => /^#([0-9A-Fa-f]{3}){1,2}$/.test(inputColor);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const inputColor = event.target.value;
      if (isValidHexColor(inputColor)) {
        setUserColor(inputColor);
      } else {
        // Optionally handle invalid input (e.g., display an error message)
      }
    };
  
    const handleSubmit = (): void => {
      setBackgroundColor(userColor);
    };

  return (
    <main>
      <div className="flex h-screen w-screen flex-row items-center justify-center ">
        <div className={`relative col-span-1 mt-12 h-[350px] w-[350px] rounded-xl border border-gray-200 p-6 shadow-md md:col-span-2`} style={{ backgroundColor }}></div>
        <div className="absolute bottom-0 flex w-full items-center justify-center space-x-2 p-6 ">
          <Input
            className="w-full rounded-full border bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white "
            placeholder="Type here..."
            type="text"
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit} className="rounded-full bg-black px-4 py-2 text-white hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white">
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
