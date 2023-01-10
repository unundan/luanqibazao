'use strict';
const Koa = require('koa');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

async function run() {
  try {
    await app.prepare();

    const server = new Koa();
    // eslint-disable-next-line no-unused-vars
    server.use(async (ctx, _next) => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  } catch (e) {
    console.error(e.stack);
    process.exit(1);
  }
}
run();
