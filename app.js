const path = require('path');

const express = require('express');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch();
});

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .then(user => {
        if (!user){
            return User.create({name: "Daniel", email: "daniel@test.com"});
        }
        return user;
    })
    .then(user => {
        return User.findByPk(1);
    })
    .catch(err => {
        console.log(err);
    });



