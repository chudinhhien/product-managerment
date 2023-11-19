const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
require('dotenv').config() //cấu hình cho biến bảo mật

const database = require('./config/database')

const systemConfig = require('./config/system')

const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')

database.connect()

const app = express()
const port = process.env.PORT

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

//Flash: Hiển thị thông báo cho bên front end
app.use(cookieParser('keyboard cat'));
app.use(session({
  cookie: {
    maxAge: 60000
  }
}));
app.use(flash());
//End Flash

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End TinyMCE

//Ghi đè phương thức để dùng được các phương thức ngoài POST,GET
app.use(methodOverride('_method'))

//Để lấy body trong request trả lên từ form 
app.use(bodyParser.urlencoded({
  extended: false
}))

//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static(`${__dirname}/public`))

//Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})