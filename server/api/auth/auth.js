import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function authenticate(req, res, next) {
    try {
        const token = req.header('auth-token');
        if(!token) {
            return res.status(401).json({message: 'Access Denied!'})
        } else {

            try {
                let extractId = jwt.verify(token, process.env.TOKEN_SECRET)
                // Check if the user ID and token combination exists
                User.findOne({ 
                    _id: extractId['_id'],
                    token: token
                }).then((result) => {
                    console.log("authenticated result -- ", result);
                    next();
                }).catch((err) => {
                    // case when user id and token are mismatched
                    res.status(403).json({message: 'Unauthorized Access!!'})
                })
    
            } catch(err){
                // verification failed
                res.status(401).json({message: 'Access Denied!'})
            }  
        }
    } catch(err) {
        // auth token was not passed in the headers -- client has not authenticated 
        res.status(401).json({ message: 'Access Denied!' })
    }
}

export default authenticate;