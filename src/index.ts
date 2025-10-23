import { testConnection } from './config/db';
import { config } from './config/config';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello TypeScript + Express!',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

app.listen(config.port, async () => {
  await testConnection();
  console.log(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
});