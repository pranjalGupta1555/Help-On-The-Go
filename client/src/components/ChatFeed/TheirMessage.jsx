import React from 'react';
const TheirMessage=({lastMessage, message})=>{
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
    return(
        <div className="message-row">
            {isFirstMessageByUser && (
                <div 
                    className="message-avatar"
                />
            )}
            {
             (message?.attachments?.length>0)
                ?(
                    <img 
                        src={message.attachments[0].file}
                        alt="message-attachment"
                        className="message-image"
                    />
                ):(
                    <div className="message" >
                        {message.text}    
                    </div>
                )
            }
        </div>
    )
}
export default TheirMessage;