const path = require('path');

const express = require('express');
const mongoConnect = require('./util/database');


const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch();
});

// app.use('/admin', adminRoutes.routes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(client => {
    console.log(client);
    app.listen(3000);
});



