const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const User = require('./models/user');

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5d22bd59f717a8fb9ae830aa')
        .then(user => {
            req.user = user;
            next();
        })
        .catch();
});

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect('mongodb+srv://daniel:QopffRQRVQnirkTv@cluster0-bfpob.mongodb.net/shop?retryWrites=true')
    .then(result => {
        User.findOne()
            .then(user => {
  
                if (!user) {
                    const user = new User({ name: 'Daniel', email: 'daniel@email.com', car: { items: [] } });
                    user.save();
                }
            });
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });



