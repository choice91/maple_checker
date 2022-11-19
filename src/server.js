import 'dotenv/config';
import './db.js';
import app from './app.js';

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
