"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const PORT = parseInt(process.env.PORT || "3000", 10);

const Home = () => {
  const [cells, setCells] = useState<string[][]>(
    Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => "#ffffff"),
    ),
  );

  useEffect(() => {
    const socket = io(`https://x-place-iota.vercel.app`, {
      path: "/api/canvasSocket",
      addTrailingSlash: false,
    });

    socket.on("connect", () => {
      console.log("Connected to socket server", socket);

      // for (let i = 0; i < 10; i++) {
      //   for (let j = 0; j < 10; j++) {
      //     console.log("i", i, "j", j);
      //     socket.emit("colorChange", {
      //       rowIndex: i,
      //       colIndex: j,
      //       newColor: "#ff0000",
      //     });
      //   }
      // }

      socket.emit("getState");
    });

    socket.on("stateInfo", (data: any) => {
      console.log("data", data);
      setCells(data);
    });

    socket.on("welcome", (event) => {
      console.log(event);
    });

    return () => {
      socket.close();
    };
  }, [setCells]);

  return (
    <section id="canvas" className="mt-60 flex flex-col items-center">
      <h1 className="text-3xl font-bold tracking-tighter text-slate-800 sm:text-5xl xl:text-6xl/none">
        The Canvas
      </h1>
      <p
        className="animate-fade-up mt-6 w-[40rem] text-center text-gray-500 [text-wrap:balance] md:text-xl"
        style={{
          animationDelay: "0.25s",
          animationFillMode: "forwards",
        }}
      >
        The canvas is a 10x10 grid of pixels. Each pixel can be colored by
        anyone who owns it. You can own a pixel by purchasing it from the
        marketplace.
      </p>
      <div className="relative col-span-1 mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-md md:col-span-2">
        <div className="mx-auto max-w-md text-center"></div>
        <div className="flex items-center justify-center">
          <div className="overflow-hidden rounded-[1rem] border-4 border-gray-200">
            {cells.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex" }}>
                {row.map((color, colIndex) => (
                  <div
                    className="border-2 border-gray-900"
                    key={colIndex}
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Card title="Canvas" description=""></Card> */}
    </section>
  );
};

export default Home;
