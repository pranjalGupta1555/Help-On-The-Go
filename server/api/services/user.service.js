import User from '../models/User.js';
import jwt from "jsonwebtoken";
import * as orderService from './order.service.js';


export const allUsers = async() => {
    const data = await User.find().exec();
    return data;
}

export const allUserHelpers = async() => {
    const data = await User.find({ userType: 'helper' }).exec();

    return data;
}

export const existingUser = async(request_data) => {
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
        }).then(async(response) => {
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

export const addUser = async(req) => {
    const checkUser = await existingUser({...req.body });

    if (checkUser === null) {
        const newUser = await new User({
            ...req.body,
        });
        const data = await newUser.save();
        console.log(data, " :: ");
        return await configureToken(data);

    } else {
        return null;
    }

}

export const configureToken = async(data) => {
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

export const userInfo = async(id) => {
    const data = await User.findById(id)
    return data;
}

export const getUsersBySkill = async(data) => {
    const requiredSkill = data.skill;
    const users = allUsers();
    const responseList = [];
    (await users).forEach(user => {
        user.skillset.forEach(skill => {
            if (skill.skill == requiredSkill) {
                responseList.push(user)
            }
        })
    })
    return responseList;
}

// export const seekAndFilter = async(data) => {
//     const requiredSkill = data.skill;
//     const users = getUsersBySkill({
//         skill: requiredSkill
//     });
//     const priceMin = ('min' in data) ? data.min : 0;
//     const priceMax = ('max' in data) ? data.max : Number.MAX_SAFE_INTEGER;
//     let responseList = [];
//     (await users).forEach(user => {
//         if ('seekLoc' in data) {
//             const location = data.seekLoc;
//             user.skillset.forEach(skill => {
//                 if ((skill.skill == requiredSkill) && (skill.charge >= priceMin && skill.charge <= priceMax) && (location.includes(user.location))) {
//                     responseList.push(user)
//                 }
//             })
//         } else {
//             user.skillset.forEach(skill => {
//                 if ((skill.skill == requiredSkill) && (skill.charge > priceMin && skill.charge < priceMax)) {
//                     responseList.push(user)
//                 }
//             })
//         }
//     })
// }


export const seekAndFilter = async(users, data) => {

    let userList = [];
    const priceMin = ('min' in data) ? data.min : 0;
    const priceMax = ('max' in data) ? data.max : 100;

    console.log(Object.keys(data));

    await users.forEach(element => {
        if (Object.keys(data).includes("seekLocation")) {
            if (element.skillset.includes(data.skill) && (element.wage >= priceMin && element.wage <= priceMax) && data.seekLocation.includes(element.location)) {
                console.log(element.wage);
                userList.push(element);
            }
        } else {
            if (element.skillset.includes(data.skill) && (element.wage >= priceMin && element.wage <= priceMax)) {
                console.log(element.wage);
                userList.push(element);
            }
        }
    });

    return userList;
}

export const updateUser = async(req) => {
    const promise = await User.findByIdAndUpdate({ _id: req.params.id }, {...req.body }, {
        new: true
    });

    return promise;
}