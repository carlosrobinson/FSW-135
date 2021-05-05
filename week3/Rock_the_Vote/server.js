const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
    'mongodb://localhost:27017/rock-the-votedb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    () => console.log('Connected to the DB')
  )

  app.use('/author', require("./routes/authRouter.js"))
  app.use('/user', require("./routes/userRouter.js"))
  app.use('/issue', require("./routes/issueRouter.js"))
  app.use('/comment', require("./routes/commentRouter.js"))

  // Error Handling
  app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
  })



app.get("/", (req,res) => {
    res.send("hello User")
})





app.listen(9000, () => {
    console.log('The server is running on Port 9000')
  }) 