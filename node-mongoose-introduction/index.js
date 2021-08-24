const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/library';

// const book = {
//   title: 'The Secret Life of Planets',
//   author: 'Paul Murdin',
//   pages: 280,
//   condition: 'used',
//   genres: ['education', 'science'],
//   isbn: '24545634562',
//   available: true
// };

// Book Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 140,
    required: true // This is not a validator
  },
  author: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    min: 1,
    max: 10000,
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'used'],
    required: true
  },
  genres: [
    {
      type: String,
      enum: ['science', 'education', 'romance', 'drama', 'fantasy']
    }
  ],
  isbn: {
    type: String,
    minlength: 10,
    maxlength: 13,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

let helperBooks;

// CRUD
// Create
// Read
// Update
// Delete

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection has been established.');
    // To create one single document, call create static method and pass it single object
    // To create multiple documents, pass an array of objects
    // Alternatively, to create multiple documents you have a static method called "insertMany"
    return Book.create({
      title: 'The Secret Life of Planets',
      author: 'Paul Murdin',
      pages: 280,
      condition: 'used',
      genres: ['education', 'science'],
      isbn: '24545634562',
      available: true
    });
  })
  .then((book) => {
    console.log('Book has been added to the library database.');
    console.log(book);
    return Book.findById('6125368cb78abb49e8b6c2da');
  })
  .then((book) => {
    console.log('Book was loaded from the books collection.');
    console.log(book);
    return Book.find({ pages: { $gte: 250 } }).limit(3);
  })
  .then((books) => {
    console.log('Books have been loaded from the books collection.');
    console.log(books);
    // helperBooks = books;
    return Book.findOne({ title: { $regex: 'World' } });
  })
  .then((book) => {
    // console.log(helperBooks);
    console.log('Single book has been loaded from the books collection.');
    // If there's a document that matches the filter passed to findOne,
    // it will be present in the parameter book, otherwise, that value will be null
    console.log(book);
    // findByIdAndUpdate resolves with the document as it was before it is updated
    // We can also use findOneAndUpdate to update a single document
    return Book.findByIdAndUpdate(
      '612538b829b0fb4aca2e0fc9',
      {
        author: 'Clive Thompson'
      },
      { new: true }
    );
  })
  .then((book) => {
    console.log('Single book was updated');
    console.log(book);
    // You can also use findByIdAndDelete if you know the document's id
    return Book.findOneAndDelete({ condition: 'used' });
  })
  .then(() => {
    console.log('Single book was deleted');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Connection has been destroyed');
  })
  .catch((error) => {
    console.log('There was an error dealing with MongoDB.');
  });
