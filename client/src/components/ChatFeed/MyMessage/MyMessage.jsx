import React from 'react';
const MyMessage=({message})=>{
    if(message?.attachments?.length>0){
        return(
            <img 
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                // style={{float:'right'}}   
            />
        )
    }
    return(
        <div className="mymessage-row">
            <div className="message" style={{ float: 'right', backgroundColor: 'rgb(184, 212, 184)' }}>
                {message.text}
            </div>
        </div>
    )
}
export default MyMessage;