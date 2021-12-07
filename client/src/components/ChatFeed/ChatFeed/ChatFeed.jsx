import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import MessageForm from '../MessageForm/MessageForm'
import MyMessage from '../MyMessage/MyMessage';
import TheirMessage from '../TheirMessage/TheirMessage';
import '../ChatFeed.scss'

const ChatFeed = (props)=>{
    const { chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];

    const renderMessages = () =>{
        const keys=Object.keys(messages);
        return keys.map((key,index)=>{
            const message=messages[key];
            const lastMessageKey = index===0 ? null: keys[index -1];
            const isMyMessage = userName === message.sender.username;
            return(
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="messageBlock">
                        {
                            isMyMessage
                            ? <MyMessage message={message} />
                            : <TheirMessage message={message}/>
                        }
                    </div>
                </div>
            )
        })
    }
    
    if(!chat) return 'Loading...';
    return(
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat?.title}</div>
            </div>
            {renderMessages()}
            <div style={{height:'100px'}}/>
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat}/>
            </div>
        </div>
    );
}
export default ChatFeed;