# cms-nodejs-render-engine  

尝试用最简单的sqlite数据库、handlebars模板引擎、koa、knex做出来一套CMS.  
（sqlite后期可更换为MySQL。 目前仅作为可行性验证使用的数据库。）


Plans:  

- SQLite    
- Knex   

Then, 
- Save template to DB.  
- Read template from DB.  
- Inject data to page.  
- *Lazy load data to page. 


提示：  

安装sqlite3需要配置node_pre_gyp的mirror，否则需要VPN。  

所以，请用下面的命令npm install:    

```


npm install --sqlite3_binary_host_mirror=https://npm.taobao.org/mirrors/sqlite3/

```


数据库文件， cms.db3 ， 放在项目根路径下：  

链接: https://pan.baidu.com/s/1O7ssc1nyLso5J9GrS7kyUA 提取码: u88p