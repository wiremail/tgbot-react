import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'
import express from 'express'
import cors from 'cors'

const token = process.env.TOKEN
const webAppUrl = 'https://492d-37-214-51-154.ngrok.io'

const bot = new TelegramBot(token, { polling: true })
const app = express()

app.use(express.json())
app.use(cors())

bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const text = msg.text

  if (text === '/start') {
    await bot.sendMessage(chatId, 'Use the form to submit a bug report', {
      reply_markup: {
        keyboard: [
          [{ text: 'Fill the Bug Report form', web_app: { url: `${webAppUrl}/form` } }]
        ]
      }
    })

    await bot.sendMessage(chatId, 'Welcome to Internet Shop', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Start Shopping...', web_app: { url: webAppUrl } }]
        ]
      }
    })
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      await bot.sendMessage(chatId, 'Message: ' + data?.message)
      await bot.sendMessage(chatId, 'Error Severity Level: ' + data?.level)

      setTimeout(async () => {
        await bot.sendMessage(chatId, 'Information sent successfully!')
      }, 2000)
    } catch (e) {
      console.log(e)
    }
  }
})

app.post('/order', async (req, res) => {
  console.log(req.body)
  const { queryId, products = [], totalPrice } = req.body
  try {
    await bot.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Successful Purchase',
      input_message_content: {
        message_text: `Congratulations!\nYou have purchased an item(s) worth $${totalPrice},\n(items: ${products.map(item => item.title).join(', ')})`
      }
    })
    return res.status(200).send()
  } catch (e) {
    return res.status(500).send()
  }
})

const port = process.env.PORT

app.listen(port, () => console.log('Server started on port ' + port))