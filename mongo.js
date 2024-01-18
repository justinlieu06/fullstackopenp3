const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://justinlieu06:${password}>@cluster0.zjvlpvz.mongodb.net/?/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Mongo Test',
  number: '17459814820',
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})