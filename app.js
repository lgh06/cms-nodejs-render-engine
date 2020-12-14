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
  var str = `Name: {{name}}
    Bye: {{bye}}
  `;
  const parsedTemplate = Handlebars.parse(str);
  // ctx.body = parsedTemplate;
  var body = parsedTemplate.body.filter((v)=> {
    // fileter Mustache expression object from array
    if (v.type === 'MustacheStatement')
    return true;
  })
  var names = body.map(v => (v.path && v.path.original) || '');

  var data = {};
  names.forEach( (v,i) => data[v] = i + ' is ' + Math.random());

  // ctx.body = Handlebars.compile(parsedTemplate)(data);
  ctx.body = parsedTemplate;

})

// Handlebars AST parse test.
// object.aaa test  // TODO for each test
router.get('/hand3', (ctx) => {
  var str = `Name: {{page.name}}
    Bye: {{page.bye}}
  `;
  const parsedTemplate = Handlebars.parse(str);
  // ctx.body = parsedTemplate;
  var body = parsedTemplate.body.filter((v)=> {
    // fileter Mustache expression object from array
    if (v.type === 'MustacheStatement')
    return true;
  })
  var parts = body.map(v => (v.path && v.path.parts) || '');

  let data = {}
  parts.forEach((outerV, outerI) => {
    console.log(outerV,outerV[0],outerV[1]);
    
    if (!data[outerV[0]]) {
      data[outerV[0]] = {}
    }
    data[outerV[0]][outerV[1]] = Math.random();
  });
  console.log(data)
  ctx.body = Handlebars.compile(parsedTemplate)(data);

})


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);