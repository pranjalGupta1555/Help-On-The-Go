import domainRouter from './domain.route.js';
import userRouter from './user.routes.js';
import orderRouter from './order.route.js';

export default (app) => {

    app.get('/', (req, res) => {
        res.status(200).send('<h1> Welcome to Help-On-The-Go! </h1>')
    })

    /* Skill Domain routes */
    app.use('/', [domainRouter, userRouter, orderRouter]);

}