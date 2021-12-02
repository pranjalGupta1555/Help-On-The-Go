import React from 'react';
const TheirMessage=({lastMessage, message})=>{
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
    return(
        <div className="message-row">
            {
             (message?.attachments?.length>0)
                ?(
                    <img 
                        src={message.attachments[0].file}
                        alt="message-attachment"
                        className="message-image"
                    />
                ):(
                    <div className="message" style={{float:'left', backgroundColor: 'rgb(184, 212, 184)'}}>
                        {message.text}    
                    </div>
                )
            }
        </div>
    )
}
export default TheirMessage;