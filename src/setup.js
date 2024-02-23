import { query } from './lib/db.js';
require('dotenv').config();


async function main() {
  const games = await query('select * from games');

  console.log(games);
}

main().catch((e) => console.error(e));
