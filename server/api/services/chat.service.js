import Chat from "../models/Chat.js";
import fetch from 'node-fetch'

export const getChatId=async (userId1, userId2)=>{
    const chatIds = await Chat.find({"users":[userId1,userId2]});
    return(chatIds.length===0?createNewChat(userId1,userId2):chatIds[0].chatId);
}

export const createNewChat=async(username1, username2)=>{
    let chatId=null;
    await fetch("https://api.chatengine.io/chats/", {
        method: 'POST',
        headers:{'PRIVATE-KEY':'6e604667-7878-480b-b9d0-cc41b6eff929','Content-type': 'application/json'},
        body: JSON.stringify({
            "title": `${username1} ${username2}`,
            "is_direct_chat": false
        })
    }).then((response) => response.json())
        .then((data) => {
            chatId = data.id;
            fetch(`https://api.chatengine.io/chats/${chatId}/people/`,{
                method: 'POST',
                headers:{'PRIVATE-KEY':'6e604667-7878-480b-b9d0-cc41b6eff929','Content-type': 'application/json'},
                body: JSON.stringify({
                    "username":username1
                })
            });
            fetch(`https://api.chatengine.io/chats/${chatId}/people/`,{
                method: 'POST',
                headers:{'PRIVATE-KEY':'6e604667-7878-480b-b9d0-cc41b6eff929','Content-type': 'application/json'},
                body: JSON.stringify({
                    "username":username2
                })
            })
            addNewChat({
                "chatId":chatId,
                "users":[username1,username2]
            })
            
        })
        return String(chatId);
}

export const addNewChat=async(request)=>{
    const newChat = new Chat(request)
    return newChat.save();
}