import { envs } from './config';
import { initModels } from './data/postgreSQL';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  initModels();
  new Server({
    port: envs.PORT,
  }).start();
}
