import * as chatServices from '../services/chat.service.js'

const errorHandler = (message, res) => {
    res.status(400).json({ error: message });
}

// this function sets the response from the data passed to it
const successHandler = (message, data, res) => {
    res.status(200).json({ message: message, data: data });
}

export const getChatId=async(request,response)=>{
    try{
        let chatId = await chatServices.getChatId(request.params.username1, request.params.username2);
        const responseBody = {"chatId":chatId}
        successHandler("success", responseBody, response);
    }
    catch(e){
        errorHandler(e.message,response)
    }
}

export const putNewChat=async(request,response)=>{
    try{
        
        const responseBody = await chatServices.addNewChat({...request.body});
        // const responseBody = {"chatId":chatId}
        successHandler("success", responseBody, response);
    }
    catch(e){
        errorHandler(e.message,response)
    }
}

