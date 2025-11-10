import { config } from './config/config';
import express from 'express';
import router from './router/router';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello TypeScript + Express!',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

app.listen(config.port, async () => {
  console.log(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
});