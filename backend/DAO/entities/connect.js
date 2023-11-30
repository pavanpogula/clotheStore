const express = require('express');
const multer = require('multer');
const { MongoClient, GridFSBucket } = require('mongodb');
const { Readable } = require('stream');

const app = express();
const upload = multer({ dest: 'uploads/' });

const url = 'mongodb://localhost:27017';
const dbName = 'your-db-name';

let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.post('/upload', upload.single('productImage'), (req, res) => {
  const bucket = new GridFSBucket(db, {
    bucketName: 'uploads'
  });

  const readableStream = new Readable();
  console.log(req.file.buffer)
  readableStream.push(req.file.buffer);
  readableStream.push(null);

  const uploadStream = bucket.openUploadStream(req.file.originalname);
  readableStream.pipe(uploadStream)
    .on('error', (error) => {
      res.status(500).json({ error: 'Error uploading file' });
    })
    .on('finish', () => {
      res.status(200).json({ message: 'File uploaded successfully' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
