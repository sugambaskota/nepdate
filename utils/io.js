let ioUsers = {};

const io = function (io) {
  io.on("connection", (socket) => {
    socket.on("online", (user_id) => {
      console.log(`${user_id} is online!`);
      socket.user = user_id;
      ioUsers[socket.user] = socket;
      console.log(`users online are ${Object.keys(ioUsers)}!`);
    });

    socket.on("disconnect", () => {
      if (!socket.user) return;
      console.log(`user ${socket.user} is offline!`);
      delete ioUsers[socket.user];
      if (Object.keys(ioUsers).length > 0) {
        console.log(`users online are ${Object.keys(ioUsers)}`);
      } else {
        console.log(`no users are online!`);
      }
    });
  });
};

module.exports = {
  ioUsers,
  io,
};
