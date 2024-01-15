const express = require('express')
const app = express()

app.use(express.json())

const morgan = require('morgan');
morgan('tiny');

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    // const maxId = persons.length > 0
    // ? Math.max(...persons.map(p => p.id)) 
    // : 0
    const randomId = Math.floor(Math.random() * 100000);

    const person = request.body
    person.id = randomId;
    // person.id = maxId + 1

    // error handling
    if (!person.name) response.status(400).send({error: 'No name provided'});
    if (!person.number) response.status(400).send({error: 'No number provided'});
    let dupePerson = persons.find(p=> p.name===person.name);
    if (dupePerson) response.status(400).send({error: 'Name already provided'});
    persons = persons.concat(person);
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    // Upon a success, 204 is returned
    // Apps either return 204 or 404 upon a fail. Let's just return 204 to keep it simple
    response.status(204).end()
})

app.get('/info', (request, response) => {
    var currentdate = new Date(); 
    var datetime = "Called on: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    response.send(`Phonebook has info for ${persons.length} people <br/> ${datetime}`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})