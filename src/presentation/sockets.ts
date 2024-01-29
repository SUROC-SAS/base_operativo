import { Server, Socket } from 'socket.io';

export const subscribeChannel = (io: Server) => {
  console.log('**********************************************');

  io.on('connection', async (socket: Socket) => {
    console.log(`Socket ID: ${socket.id}`);
    socket.on('disconnect', (reason) => {
      console.log('Desconectado', reason);
    });
  });
};

