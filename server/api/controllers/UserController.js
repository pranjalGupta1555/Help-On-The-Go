import * as UserService from "../services/user.service.js";

// error and success handlers

const errorHandler = (message, res) => {
    res.status(400).json({ error: message });
}

const successHandler = (message, data, res) => {
    res.status(200).json({ message: message, data: data });
}

export const allUsers = async (req, res) => {
    try {

        const data = await UserService.allUsers();
        successHandler("success", data, res);

    } catch(err) {
        errorHandler(err.message, res);
    }
}

export const addUser = async (req, res) => {
    try {

        const result = await UserService.addUser(req);

        if(result === null) {
            successHandler("User already exists!", result, res);
        } else {
            successHandler("success", result, res);
        }

    } catch(err) {
        errorHandler(err.message, res);
    }
}

export const loginUser = async (req, res) => {
    try {

        const result = await UserService.existingUser({ ...req.body });

        if(result !== null) {

            try {
                const getUserWithToken = await UserService.configureToken(result);

                successHandler("success", getUserWithToken, res);

            } catch(err) {

                errorHandler(err.message, res);
            }

            

        } else {
            errorHandler("failed", res);
        }

    } catch(err) {

    }
}

export const getUserInfo = async(req,res)=>{
    try{
        const id = req.params.id;
        const result = await UserService.checkExistingUserID(id)
        successHandler("success",result, res)
    }
    catch(err){
        errorHandler(err.message, res);
    }
}

export const checkUserName = async (req, res) => {
    try {

        const result =  await UserService.checkUsername(req.params.username);

        if(result !== null) {
            successHandler("success", result, res);
        } else {
            errorHandler("failed", res);
        }
    } catch (err) {

        errorHandler(err.message, res);
    }
}

export const getSeekers = async (req, res) =>{

    try{

        let request_data = {...req.body};

        let result = await UserService.allUserHelpers();
        
        if(request_data.skill !== "") {
            result = await UserService.seekAndFilter(result, request_data );
            successHandler("success", result, res);
        } else {
            successHandler("success", result, res);
        }


    } catch(err){

        errorHandler(err.message, res)

    }

}
export const updateUserByID = async (req, res) => {
    try {
        
        const result = await UserService.updateUser(req);

        if(result !== null) {
            successHandler("success", result, res);
        } else {
            errorHandler("failed", res);
        }

    } catch(err) {
        errorHandler(err.message, res);
    }
}

export const getUserInfoById = async (userId) => {
    const seekerInfo = await UserService.checkExistingUserID(userId);
    return seekerInfo;
}