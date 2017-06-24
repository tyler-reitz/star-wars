// Dependencies
// ============================================================================
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

// Data
// ============================================================================
const characters = [
  {
    routeName: 'yoda',
    name: 'Yoda',
    role: 'Jedi Master',
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: 'darthMaul',
    name: 'Darth Maul',
    role: 'Sith Lord',
    age: 200,
    forcePoints: 1200
  },
  {
    routeName: 'chewie',
    name: 'Chubacca',
    role: 'Wookie',
    age: 32,
    forcePoints: 0
  }
]

// Routes
// ============================================================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view.html'))
})

app.get('/new', (req, res) => {
  res.sendFile(path.join(__dirname, 'add.html'))
})

app.get('/api/:characters?', (req, res) => {
  const chosen = req.params.characters

  if (chosen) {
    if (characters.some(char => char.routeName === chosen)) {
      return res.json(characters.find(char => char.routeName === chosen))
    }

    return res.send('No character found')
  }

  return res.json(characters)
})

app.post('/api/new', (req, res) => {
  const newCharacter = req.body
  console.log(newCharacter)

  newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLocaleLowerCase()
  console.log(newCharacter)

  characters.push(newCharacter)

  res.json(newCharacter)
})

// Listener
// ============================================================================
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`)
})
