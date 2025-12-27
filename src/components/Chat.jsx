import React from 'react'
import chatBg from '../assets/img/Bg.png'
import chatMan from '../assets/img/man.png'
import chatMan2 from '../assets/img/man2.png'
import photo from '../assets/img/photo.svg'

const Chat = ({
    name = 'Александр',
    avatar = chatMan,
    messages,
    value,
    setValue,
    onKeyDown,
    onPhotoClick,
    fileRef,
    onFileChange,
    listRef,
}) => {
    return (
        <div className="chat__root">
            <div className="chat__window">
                <div className="chat__header">
                    <div className="chat__header-left">
                        <img src={avatar} alt="avatar" className="chat__avatar" />
                        <div>
                            <div className="chat__name">{name}</div>
                            <div className="chat__status">Онлайн</div>
                        </div>
                    </div>
                </div>

                <div className="chat__body" ref={listRef} style={{ backgroundImage: `url(${chatBg})` }}>
                    <div className="messages">
                        {messages && messages.map(m => (
                            <div key={m.id} className={`message ${m.fromMe ? 'me' : 'them'}`}>
                                {m.fromMe ? (
                                    <><div className="time">{m.time}</div>
                                        {m.image ? (
                                            <div className="bubble">
                                                <img src={m.image} alt="attached" className="message-image" />
                                            </div>
                                        ) : (
                                            <div className="bubble">{m.text}</div>
                                        )}

                                    </>
                                ) : (
                                    <>
                                        {m.image ? (
                                            <div className="bubble">
                                                <img src={m.image} alt="attached" className="message-image" />
                                            </div>
                                        ) : (
                                            <div className="bubble">{m.text}</div>
                                        )}<div className="time">{m.time}</div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chat__input">
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Написать сообщение..."
                        className="input-field"
                    />
                    <button className="attach-btn" onClick={onPhotoClick}><img src={photo} alt="attach" /></button>
                    <input ref={fileRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
                </div>
            </div>
        </div>
    )
}

export default Chat