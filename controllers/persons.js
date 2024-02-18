const personsRouter = require('express').Router()
const Person = require('../models/person')

app.get('/', (request, response) => {
    // response.json(persons)
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // const person = persons.find(person => person.id === id)

    // if (person) {
    //     response.json(person)
    // } else {
    //     response.status(404).end()
    // }
    Person.findById(request.params.id).then(person => {
        response.json(person)
    }).catch(error => next(error))
})

app.post('/', (request, response, next) => {
    const { name, number } = request.body
    if (!name) {
        return response.status(400).json({ error: 'name missing' })
    }
    const person = new Person({
        name: name,
        number: number
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

    // let dupePerson = persons.find(p=> p.name===person.name)
    // update the entry if the same name is provided
    // if (dupePerson) {
    //     // sendErr('Name already provided', response, body)
    //     // updatePerson(request, person.name, person.number)
    //     Person.findByIdAndUpdate(request.params.id, {name, number}, { new: true, runValidators: true, context: 'query' })
    //     .then(updatedPerson => {
    //     response.json(updatedPerson)
    //     })
    //     .catch(error => next(error))
    //     return;
    // }
    // // persons = persons.concat(person)
    // // response.json(person)

    person.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))
})

app.delete('/:id', (request, response, next) => {
    // const personId = Number(request.params.id)
    // persons = persons.filter(person => person.id !== personId)

    // // Upon a success, 204 is returned
    // // Apps either return 204 or 404 upon a fail. Let's just return 204 to keep it simple
    // response.status(204).end()

    Person.findByIdAndDelete(request.params.id).then(result => {
        console.log(result)
        response.status(204).end()
    }).catch(error => next(error))
})

// update persons
app.put('/:id', (request, response, next) => {
    const { name, number } = request.body

    // updatePerson(request, person.name, person.number)
    Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        }).catch(error => next(error))
})

app.get('/info', (request, response) => {
    var currentdate = new Date()
    var datetime = 'Called on: ' + currentdate.getDate() + '/'
    + (currentdate.getMonth()+1)  + '/'
    + currentdate.getFullYear() + ' @ '
    + currentdate.getHours() + ':'
    + currentdate.getMinutes() + ':'
    + currentdate.getSeconds()
    Person.find({}).then(persons => {
        let personsLength = persons.length
        response.send(`Phonebook has info for ${personsLength} people <br/> ${datetime}`)
    })
})

module.exports = personsRouter