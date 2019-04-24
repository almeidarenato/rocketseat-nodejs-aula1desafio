const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
app.use(express.urlencoded({ extended: false }))

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

const checaIdadeMiddleware = (request, response, next) => {
  let idade = request.body.idade
  console.log(idade)
  if (!idade) {
    return response.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (request, response) => {
  console.log(request)
  return response.render('formulario')
})
app.post('/check', checaIdadeMiddleware, (request, response) => {
  const idade = request.body.idade
  if (idade >= 18) return response.redirect(`/major?idade=${idade}`)
  else return response.redirect(`/minor?idade=${idade}`)
})

app.get('/major', (request, response) => {
  //  return response.render('major',{request.query.idade})
  let idade = request.query.idade
  // console.log(`major ${idade}`)
  return response.render('major', { idade })
})
app.get('/minor', (request, response) => {
  // return response.render('minor',{request.query.idade})
  let idade = request.query.idade
  // console.log(`minor ${idade}`)
  return response.render('minor', { idade })
})

app.listen(3001)
