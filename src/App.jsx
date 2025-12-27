import { useState } from 'react'
import Chat from './components/Chat'
import chatMan from './assets/img/man.png'
import chatMan2 from './assets/img/man2.png'

const initialA = [
  { id: 1, text: 'Привет. Как дела? Где ты изучаешь программирование?', fromMe: false, time: '12:21' },
  { id: 2, text: 'Привет. Нормально. Как у тебя дела? Я учусь в учебном центре PROWEB', fromMe: true, time: '12:41' },
]

const initialE = [
  { id: 1, text: 'Привет. Как дела? Где ты изучаешь программирование?', fromMe: true, time: '12:21' },
  { id: 2, text: 'Привет. Нормально. Как у тебя дела? Я учусь в учебном центре PROWEB', fromMe: false, time: '12:41' },
]

const App = () => {
  const [messagesA, setMessagesA] = useState(initialA)
  const [messagesE, setMessagesE] = useState(initialE)

  const [valueA, setValueA] = useState('')
  const [valueE, setValueE] = useState('')

  const [listElA, setListElA] = useState(null)
  const [listElE, setListElE] = useState(null)
  const [fileElA, setFileElA] = useState(null)
  const [fileElE, setFileElE] = useState(null)

  const handleListRefA = (el) => {
    if (!el) return
    if (el !== listElA) setListElA(el)
    el.scrollTop = el.scrollHeight
  }

  const handleListRefE = (el) => {
    if (!el) return
    if (el !== listElE) setListElE(el)
    el.scrollTop = el.scrollHeight
  }

  const handleFileRefA = (el) => {
    if (!el) return
    if (el !== fileElA) setFileElA(el)
  }

  const handleFileRefE = (el) => {
    if (!el) return
    if (el !== fileElE) setFileElE(el)
  }

  const makeTime = () => {
    const time = new Date()
    const hh = String(time.getHours()).padStart(2, '0')
    const mm = String(time.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  }

  const sendA = (text, image) => {
    if (!text && !image) return
    const t = makeTime()
    const id = Date.now()
    const msgA = { id, text: text || '', image: image || null, fromMe: true, time: t }
    const msgE = { id: id + 1, text: text || '', image: image || null, fromMe: false, time: t }
    setMessagesA(prev => [...prev, msgA])
    setMessagesE(prev => [...prev, msgE])
  }

  const sendE = (text, image) => {
    if (!text && !image) return
    const t = makeTime()
    const id = Date.now()
    const msgE = { id, text: text || '', image: image || null, fromMe: true, time: t }
    const msgA = { id: id + 1, text: text || '', image: image || null, fromMe: false, time: t }
    setMessagesE(prev => [...prev, msgE])
    setMessagesA(prev => [...prev, msgA])
  }

  const onKeyDownA = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendA(valueA)
      setValueA('')
    }
  }

  const onKeyDownE = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendE(valueE)
      setValueE('')
    }
  }

  const onPhotoClickA = () => { if (fileElA) fileElA.click() }
  const onPhotoClickE = () => { if (fileElE) fileElE.click() }

  const onFileChangeA = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    sendA('', url)
    e.target.value = null
  }

  const onFileChangeE = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    sendE('', url)
    e.target.value = null
  }

  return (
    <div style={{ display: 'flex', gap: 16, padding: 16, minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 400 }}>
          <Chat
            name="Александр"
            avatar={chatMan}
            messages={messagesA}
            value={valueA}
            setValue={setValueA}
            onKeyDown={onKeyDownA}
            onPhotoClick={onPhotoClickA}
            fileRef={handleFileRefA}
            onFileChange={onFileChangeA}
            listRef={handleListRefA}
          />
        </div>
      <div style={{ width: 400 }}>
        <Chat
          name="Евгений"
          avatar={chatMan2}
          messages={messagesE}
          value={valueE}
          setValue={setValueE}
          onKeyDown={onKeyDownE}
          onPhotoClick={onPhotoClickE}
          fileRef={handleFileRefE}
          onFileChange={onFileChangeE}
          listRef={handleListRefE}
        />
      </div>
    </div>
  )
}

export default App