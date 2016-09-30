var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
var nav = [{
    link: '/books',
    text: 'Book'
}, {
    link: '/authors',
    text: 'Author'
}];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
// executes before any request and looks for static files
// in this folder. if it doesnt find anything in 'public'
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
// pulls the passport and executes it
require('./src/config/passport')(app);

// app.use(express.static('src/views')); --> serve static HTML
app.set('views', './src/views'); // --> sets where the views are
// app.set('view engine', 'jade'); // uses JADE engine to compile the HTML
app.set('view engine', 'ejs'); // uses EJS engine to compile the HTML

// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));
// app.set('view engine', '.hbs'); // uses HandleBars engine to compile the HTML

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'hello from render',
        nav: [{
            link: '/books',
            text: 'Books'
        }, {
            link: '/authors',
            text: 'Authors'
        }]
    });
});

// app.get('/books', function (req, res) {
//   res.send('hello books');
// });

app.listen(port, function() {
    console.log('running the server on port ' + port);
});