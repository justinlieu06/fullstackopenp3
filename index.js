const express = require('express')
require('dotenv').config()
// cors mechanism is necessary to communicate w/ apps running on a different port/url
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan');

// const password = process.argv[2]
// console.log('password: ',password)

morgan.token('body', (req)=> JSON.stringify(req.body))

// app.use(morgan('tiny'));
app.use(morgan(':url :method :body'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

// function sendErr(errMsg, response, body){
//     console.log(errMsg);
//     response.status(400).send({error: errMsg});
// }

app.use(cors())
app.use(requestLogger) // request.body is undefined!
app.use(express.json())
app.use(express.static('dist'))

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
    // response.json(persons)
    Person.find({}).then(persons=> {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // const person = persons.find(person => person.id === id)

    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }
    Person.findById(request.params.id).then(person=> {
        if (person){
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})



app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    // const randomId = Math.floor(Math.random() * 100000);
    // person.id = randomId;

    // error handling
    // if (!person.name) {
    //     sendErr('No name provided', response, body)
    //     return;
    // }
    // if (!person.number) {
    //     sendErr('No number provided', response, body)
    //     return;
    // }
    let dupePerson = persons.find(p=> p.name===person.name)
    // update the entry if the same name is provided
    if (dupePerson) {
        // sendErr('Name already provided', response, body)
        Person.findByIdAndUpdate(request.params.id, person, { new: true })
            .then(updatedPerson => {
            response.json(updatedPerson)
            })
            .catch(error => next(error))
        return;
    }
    // persons = persons.concat(person)
    // response.json(person)

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    // const personId = Number(request.params.id)
    // persons = persons.filter(person => person.id !== personId)

    // // Upon a success, 204 is returned
    // // Apps either return 204 or 404 upon a fail. Let's just return 204 to keep it simple
    // response.status(204).end()

    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// update persons
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
        response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    var currentdate = new Date(); 
    var datetime = "Called on: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    Person.find({}).then(persons=> {
        let personsLength = persons.length
        response.send(`Phonebook has info for ${personsLength} people <br/> ${datetime}`)
    })
})

// handler of requests with unknown endpoint
app.use(unknownEndpoint)
// this has to be the last loaded middleware.
app.use(errorHandler)

// const PORT = process.env.PORT || 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})