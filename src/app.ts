import express, { NextFunction, Request, Response } from "express";
import { Query } from "express-serve-static-core";
//import { User } from "./model/user.type";
import mongoose from "mongoose";
//const Product = require('./model/user.type.ts');
import Product from "./model/user.type";
import cors from 'cors';

// ระบุ Type
export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T;
}

const app = express();
const router = express.Router();

mongoose.connect('mongodb+srv://admin:1234@phunsup.kpcpbif.mongodb.net/?retryWrites=true&w=majority&appName=Phunsup')
    .then(() => console.log('connection DB successfully!'))
    .catch((err: any) => console.log(err))


app.use(express.json());
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.get("/", (req, res) => {
    res.json({ result: "ok 1234" })
})

app.get('/products', async (req: Request, res: Response, next: NextFunction) => {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            return next(err);
        });
});


app.get('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    Product.findById(req.params.id)
    .then(post => {
        res.json(post);
    })
    .catch(err => {
        next(err);
    });
});

// app.get("/login", (req: TypedRequestQuery<User>, res: Response) => {
//     res.json(req.query);
// });
app.get('/login', (req, res) => {
    res.send('This is the login page');
});

app.post('/products', async (req: Request, res: Response, next: NextFunction) => {
    Product.create(req.body)
        .then((post: any) => {
            res.json(post);
        })
        .catch((err: Error) => {
            next(err);
        });

});

app.put('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then((post: any) => {
            res.json(post);
        })
        .catch((err: Error) => {
            next(err);
        });

});


app.delete('/products/:id', (req: Request, res: Response, next: NextFunction) => {
    Product.findByIdAndDelete(req.params.id)
        .then((post: any) => {
            res.json(post);
        })
        .catch((err: Error) => {
            next(err);
        });

});


app.listen(3001, () => console.log("Server is runing..."));
module.exports = app;