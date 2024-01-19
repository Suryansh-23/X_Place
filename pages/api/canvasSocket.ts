import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";
import { Server } from "socket.io";

const PORT = parseInt(process.env.PORT || "3000", 10);

// Define the canvas size
const CANVAS_WIDTH = 100;
const CANVAS_HEIGHT = 100;

// Initialize the canvas state
const canvas: string[][] = [];

for (let i = 0; i < CANVAS_HEIGHT; i++) {
    canvas[i] = [];
    for (let j = 0; j < CANVAS_WIDTH; j++) {
        canvas[i][j] = "#000000"; // Default color is black
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

interface SocketServer extends HTTPServer {
    io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO;
}
export default function SocketHandler(
    _req: NextApiRequest,
    res: NextApiResponseWithSocket
) {
    if (res.socket.server.io) {
        res.status(200).json({
            success: true,
            message: "Socket is already running",
            socket: `:${PORT + 1}`,
        });
        return;
    }

    console.log("Starting Socket.IO server on port:", PORT + 1);
    const io = new Server({
        path: "/api/canvasSocket",
        addTrailingSlash: false,
        cors: { origin: "*" },
    }).listen(PORT + 1);

    // io.on("connect", (socket) => {
    //     const _socket = socket;
    //     console.log("socket connect", socket.id);
    //     _socket.broadcast.emit("welcome", `Welcome ${_socket.id}`);
    //     socket.on("disconnect", async () => {
    //         console.log("socket disconnect");
    //     });
    // });

    io.on("connect", (socket) => {
        const _socket = socket;
        console.log("socket connect", socket.id);

        _socket.broadcast.emit("welcome", `Welcome ${_socket.id}`);

        _socket.on(
            "colorChange",
            (data: {
                rowIndex: number;
                colIndex: number;
                newColor: string;
            }) => {
                const { rowIndex, colIndex, newColor } = data;
                if (
                    rowIndex >= 0 &&
                    rowIndex < CANVAS_WIDTH &&
                    colIndex >= 0 &&
                    colIndex < CANVAS_HEIGHT
                ) {
                    canvas[colIndex][rowIndex] = newColor;
                    io.emit("stateInfo", canvas);
                    console.log(
                        "color change received",
                        canvas[colIndex][rowIndex]
                    );
                }
            }
        );

        _socket.on("getState", () => {
            console.log("getState received");
            io.to(socket.id).emit("stateInfo", canvas);
        });

        socket.on("disconnect", async () => {
            console.log("socket disconnect");
        });
    });

    res.socket.server.io = io;
    res.status(201).json({
        success: true,
        message: "Socket is started",
        socket: `:${PORT + 1}`,
    });
}