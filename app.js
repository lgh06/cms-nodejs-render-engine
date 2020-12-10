const Koa = require('koa');
const Mustache = require('mustache');
const app = new Koa();

app.use(async ctx => {

  var view = {
    title: "Joe",
    calc: function () {
      return 2 + 4;
    }
  };
  
  var output = Mustache.render("{{title}} spends {{calc}}", view);
  ctx.body = output;
});

app.listen(3000);