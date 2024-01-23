// should be able to run this script w/ node mongo.js <password>
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
// must update this url based on which cluster connecting to
const url = `mongodb+srv://justinlieu06:${password}@cluster0.i35aru0.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


// create schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Mongo Test2',
  number: '17459814820',
})

/* For creating a new person */
// node mongo.js <password>
// person.save().then(result => {
// //   console.log(result); // uninteresting for saving one obj
//   console.log('person saved!')
//   mongoose.connection.close()
// })

//node mongo.js <password> "Arto Vihavainen" 045-1232456
Person.find({}).then(result => {
    result.forEach(pereson => {
      console.log(person)
    })
    mongoose.connection.close()
  })

