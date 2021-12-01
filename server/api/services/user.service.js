import User from '../models/User.js';
import jwt from "jsonwebtoken";

export const allUsers = async () => {
    const data = await User.find().exec();

    return data;
}

export const existingUser = async (request_data) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: request_data.username,
            password: request_data.password
        }).then((response) => {
            console.log(response);
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const checkExistingUserID = async(extractedID) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            _id: extractedID,
        }).then((response) => {
            console.log(response);
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const checkUsername = async(username) => {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: username
        }).then((response) => {
            console.log(response);
            resolve(response);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const addUser = async (req) => {
    const checkUser = await existingUser({ ...req.body });

    if (checkUser === null) {
        const newUser = await new User({
            ...req.body,
        });
        const data = await newUser.save();
        console.log(data , " :: ");
        return await configureToken(data);
        
    } else {
        return null;
    }

}

export const configureToken = async (data) => {
    console.log("CAME to CONFIGURE TOKEN");
    const jwttoken = await jwt.sign({ _id: data._id }, process.env.TOKEN_SECRET);
    const promise = await User.findByIdAndUpdate({ _id: data._id }, {
        token: jwttoken
    }, {
        new: true
    }).exec();

    console.log("FINISHED NOW", promise);
    return promise;

}

export const userInfo = async(id) =>{
    const data = await User.findById(id)
    return data;
}

export const seekAndFilter = async(data)=>{
    const users = allUsers();
    const location = data.location;
    const requiredSkill = data.skill;
    const priceMin = data.priceMin;
    const priceMax = data.priceMax;
    let responseList=[];
    (await users).forEach(user=>{
        console.log(user.username)
        if(location.includes(user.location) && location){
            user.skillSet.forEach(skill=>{
                if((skill.skill==requiredSkill) && (price>priceMin && price<priceMax)){
                    responseList.push(user)
                }
            })
        }
    })
    return responseList;
}