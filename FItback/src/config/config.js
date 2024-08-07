export const corsOptions = {
  origin: 'http://localhost:5173', // Update to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // This allows cookies to be sent from the frontend
  allowedHeaders: ['Content-Type', 'Authorization'],
};
