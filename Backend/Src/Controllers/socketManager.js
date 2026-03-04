import { Server } from "node:http";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
    const io = Server(server);
    io.on("connection", (socket) => {
        socket.on("join-call", (path) => {
            if (connections[path] === undefined) {
                connections[path] = [];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit(
                    "user-joined",
                    socket.id,
                    connections[path],
                );
            }
            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; a++) {
                    io.to(socket.id).emit(
                        "chat-messages",
                        messages[path][a]["data"],
                        messages[path][a]["sender"],
                        messages[path][a]["socket-id-sender"],
                    );
                }
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections).reduce(
                ([room, isFound], [roomKey, roomValue]) => {
                    if (!found && roomValue.include(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, found];
                },
                ["", false],
            );
            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = [];
                }
                messages[matchingRoom].push({
                    sender: sender,
                    data: data,
                    "socket-id-sender": socket.id,
                });
                console.log("message :", key, "sender", data);
                connections[matchingRoom].foreach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {
            var differTime = Math.abs(timeOnline[socket.id] - new Date());
            var key;

            for (const [v, k] of JSON.parse(
                JSON.stringify(Object.entries(connections)),
            )) {
                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key =k
                        for(let a=0;a<connections[key].length;++a){
                            io.to(connections[key][a].emit("user-left", socket.id));
                        }
                        var index = connections[key].indexOf(socket.id);
                        connections[key].splice(index, 1);
                        if (connections.length === 0) {
                            delete connections[key];
                        }
                    }
                }
            }
        });
    });
    return io;
};
