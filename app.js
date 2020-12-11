const Koa = require('koa');
var Router = require('@koa/router');
var db = require('./db');

const Mustache = require('mustache');

const app = new Koa();
const router = new Router();


router.get('/', async (ctx, next) => {
  // ctx.router available
  
  var view = {
    title: "Joe",
    calc: function () {
      return 2 + 4;
    }
  };
  
  var output = Mustache.render("{{title}} spends {{calc}}", view);
  ctx.body = output;
});

router.get('/db', async (ctx, next) => {
  var t = await db.select('*').from('pages');
  console.log(t);
  ctx.body = t
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);