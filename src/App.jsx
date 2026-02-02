import { useState, useEffect } from 'react'
import Chat from './components/Chat'
import chatMan from './assets/img/man.png'
import chatMan2 from './assets/img/man2.png'

const chatA = [
  { id: 1, text: 'Привет. Как дела? Где ты изучаешь программирование?', fromMe: false, time: '12:21' },
  { id: 2, text: 'Привет. Нормально. Как у тебя дела? Я учусь в учебном центре PROWEB', fromMe: true, time: '12:41' },
]

const chatE = [
  { id: 1, text: 'Привет. Как дела? Где ты изучаешь программирование?', fromMe: true, time: '12:21' },
  { id: 2, text: 'Привет. Нормально. Как у тебя дела? Я учусь в учебном центре PROWEB', fromMe: false, time: '12:41' },
]

const users = [
  { id: 'A', name: 'Александр', avatarImport: chatMan },
  { id: 'E', name: 'Евгений', avatarImport: chatMan2 },
]

const App = () => {
  const [messagesById, setMessagesById] = useState({ A: chatA, E: chatE })

  const [modalVisible, setModalVisible] = useState(false)
  const [modalWhich, setModalWhich] = useState(null)
  const [modalUrl, setModalUrl] = useState('')
  const [modalComment, setModalComment] = useState('')

  const [values, setValues] = useState({ A: '', E: '' })

  const [listEls, setListEls] = useState({})
  const [fileEls, setFileEls] = useState({})

  const handleListRef = (el, which) => {
    if (!el) return
    setListEls(prev => {
      if (prev[which] === el) return prev
      return { ...prev, [which]: el }
    })
    el.scrollTop = el.scrollHeight
  }

  const handleFileRef = (el, which) => {
    if (!el) return
    setFileEls(prev => {
      if (prev[which] === el) return prev
      return { ...prev, [which]: el }
    })
  }

  const toLocaleGetDatestring = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const send = (userId, text, image) => {
    if (!text && !image) return
    const t = toLocaleGetDatestring()
    const id = Date.now()
    const other = userId === 'A' ? 'E' : 'A'
    const msgSender = { id, text: text || '', image: image || null, fromMe: true, time: t }
    const msgOther = { id: id + 1, text: text || '', image: image || null, fromMe: false, time: t }
    setMessagesById(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), msgSender],
      [other]: [...(prev[other] || []), msgOther]
    }))
  }

  const onKeyDown = (which, e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      send(which, values[which])
      setValues(prev => ({ ...prev, [which]: '' }))
    }
  }

  const onPhotoClick = (which) => {
    setModalWhich(which)
    setModalUrl('')
    setModalComment('')
    setModalVisible(true)
  }

  const onFileChange = (e, which) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    send(which, '', url)
    e.target.value = null
  }

  const closeModal = () => {
    setModalVisible(false)
    setModalWhich(null)
    setModalUrl('')
    setModalComment('')
  }

  const sendFromModal = () => {
    if (!modalUrl) return
    if (modalWhich) send(modalWhich, modalComment, modalUrl)
    closeModal()
  }
  useEffect(() => {
    Object.keys(listEls).forEach(k => {
      const el = listEls[k]
      const msgs = messagesById[k] || []
      if (el && msgs) el.scrollTop = el.scrollHeight
    })
  }, [messagesById, listEls])

  return (
    <div style={{ display: 'flex', gap: 16, padding: 16, minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }} className='chat'>
      {users.map(user => (
        <div key={user.id} style={{ width: 400 }}>
          <Chat
            name={user.name}
            avatar={user.avatarImport}
            messages={messagesById[user.id]}
            value={values[user.id]}
            setValue={(v) => setValues(prev => ({ ...prev, [user.id]: v }))}
            onKeyDown={(e) => onKeyDown(user.id, e)}
            onPhotoClick={() => onPhotoClick(user.id)}
            fileRef={(el) => handleFileRef(el, user.id)}
            onFileChange={(e) => onFileChange(e, user.id)}
            listRef={(el) => handleListRef(el, user.id)}
          />
        </div>
      ))}

      {modalVisible && (
        <div className="modal_block">
          <div className="modal_box">
            <h3 className="modal_box-title">Отправить картинку</h3>
            <div className="modal_box-open">
              <div className="modal_box-text">URL</div>
              <input className="modal_box-input" value={modalUrl} onChange={e => setModalUrl(e.target.value)} placeholder="URL" />
            </div>
            <div className="modal_box-open">
              <div className="modal_box-text">Комментарий</div>
              <input className="modal_box-input" value={modalComment} onChange={e => setModalComment(e.target.value)} placeholder="Комментарий" />
            </div>
            <div className="modal_actions">
              <button className="modal_btn modal_btn-cancel" onClick={closeModal}>ОТМЕНА</button>
              <button className="modal_btn modal_btn-send" onClick={sendFromModal}>ОТПРАВИТЬ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default App