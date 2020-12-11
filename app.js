const Koa = require('koa');
var Router = require('@koa/router');
var db = require('./db');

const Handlebars = require("handlebars");

const app = new Koa();
const router = new Router();


router.get('/', async (ctx, next) => {
  // ctx.router available
  
  ctx.body = 'Hello World';
});

router.get('/db', async (ctx, next) => {
  var t = await db.select('*').from('pages');
  console.log(t);
  ctx.body = t
});

router.get('/hand', (ctx) => {
  const template = Handlebars.compile("Name: {{name}}");
  ctx.body = (template({ name: "Nils" }));
})

// Handlebars AST parse test.
router.get('/hand2', (ctx) => {
  const template = Handlebars.parse(`Name: {{name}}
    {{bye}}
  `);
  ctx.body = template;
  var body = template.body.filter((v)=> {
    // fileter Mustache expression object from array
    if (v.type === 'MustacheStatement')
    return true;
  })
  console.log(body.map(v => (v.path && v.path.original) || ''))
})
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);