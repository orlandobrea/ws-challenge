import { io } from 'socket.io-client';

// This should be an env variable or config file
const URL: string = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000';

export const socket = io(URL);
