import { Server } from "node:http"


export const connectToSocket = (server)=>{
    const io = Server(server)

    return io
}

