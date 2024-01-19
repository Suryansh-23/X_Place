"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Socket } from "socket.io";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userData } from "@/userData";


function selectRandomUser(): any | undefined {
  if (userData.length === 0) {
    return undefined; // Return undefined if the array is empty
  }

  const randomIndex = Math.floor(Math.random() * userData.length);
  const randomUser = userData[randomIndex];

  return randomUser;
}


const randomUser = selectRandomUser();

const PORT = parseInt(process.env.PORT || "3000", 10);
const socket = io(`localhost:${PORT + 1}`, {
  path: "/api/canvasSocket",
  addTrailingSlash: false,
});

socket.on("connect", () => {
  console.log("Connected to socket server", socket);
});

export default function Xnft() {
  const [userColor, setUserColor] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  // const [index, setIndex] = useState<number>(-1);

  const [cells, setCells] = useState<string[][]>(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => "#ffffff"),
    ),
  );

  const getMessage = () => {
    window.addEventListener("message", (e) => {
      console.log(e.data);
    });
  };

  const isValidHexColor = (inputColor: string): boolean =>
    /^#([0-9A-Fa-f]{3}){1,2}$/.test(inputColor);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const inputColor = event.target.value;
    if (isValidHexColor(inputColor)) {
      setUserColor(inputColor);
    } else {
      // Optionally handle invalid input (e.g., display an error message)
    }
  };

  const handleSubmit = (): void => {
    setBackgroundColor(userColor);
    socket.emit("colorChange", {
      colIndex: Math.floor(randomUser.ndex / 100),
      rowIndex: (randomUser.Index) % 100,
      newColor: userColor,
    });
   ;
  };

  return (
    <main>
      <div className="flex flex-row space-x-12">
        <Badge className="bg-[#87CEEB]">{`${randomUser.Index}`}</Badge>
        <h1 className="text-center font-bold">Welcome {randomUser.Name} to Your personal Pixel</h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{randomUser.Name}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex  items-center justify-center ">
        <div
          className={`relative col-span-1 mt-12 h-[350px] w-[350px] rounded-xl border border-gray-200 p-6 shadow-md md:col-span-2`}
          style={{ backgroundColor }}
        ></div>
        <div className="absolute bottom-0 flex w-full items-center justify-center space-x-2 p-6 ">
          <Input
            className="w-full rounded-full border bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white "
            placeholder="Type here..."
            type="text"
            onChange={handleInputChange}
          />
          <Button
            onClick={handleSubmit}
            className="rounded-full bg-black px-4 py-2 text-white hover:bg-gradient-to-r hover:from-red-500 hover:via-yellow-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
