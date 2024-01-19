// should be able to run this script w/ node mongo.js <password>
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
// must update this url based on which cluster connecting to
const url = `mongodb+srv://testUser:${password}>@cluster0.zjvlpvz.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

// create schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Mongo Test',
  number: '17459814820',
})

// save to schema
person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})

