import React, { useCallback, useEffect, useState } from 'react'
import './form.css'
import { useTelegram } from '../../hooks/useTelegram'

const Form = () => {
  const [message, setMessage] = useState('')
  const [level, setLevel] = useState('info')
  const { tg } = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      message,
      level,
    }
    tg.sendData(JSON.stringify(data))
  }, [message, level])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'SUBMIT'
    })
  }, [])

  useEffect(() => {
    if (!message || !message.trim() || !level) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
    }
  }, [message, level])

  const onChangeMessage = (e) => setMessage(e.target.value)
  const onChangeLevel = (e) => setLevel(e.target.value)

  return (
    <div className={"form"}>
      <h3>Bug Report</h3>
      <br />

      <h5>Message</h5>
      <input
        className={'input'}
        type="text"
        placeholder={'Enter Message...'}
        value={message}
        onChange={onChangeMessage}
      />
      <br />

      <h5>Error Severity Level</h5>
      <select value={level} onChange={onChangeLevel} className={'select'}>
        <option value={'info'}>Info</option>
        <option value={'warning'}>Warning</option>
        <option value={'error'}>Error</option>
        <option value={'fatal'}>Fatal</option>
      </select>
    </div>
  )
}

export default Form