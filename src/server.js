import 'dotenv/config';
import './db';
import app from './app';

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
