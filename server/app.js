const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use(cors())


app.get('/users/repositories', (req, res) => {
  // hit api menggunakan axios
  axios.get('https://api.github.com/user/repos', {
    headers: {
      'Authorization': 'token ba8088d61640377a79c9716f130501e865ee87d2'
    }
  })
  .then(response => {
    console.log(response)

    res.status(200).json(response.data)
  })
  .catch(err => {
    console.log(err)

    res.status(500).json({err: err.message})
  })
})

// membuat repository baru dari aplikasi kita

app.post('/users/repositories', (req, res) => {
  axios.post('https://api.github.com/user/repos', 
  { 
    "name": req.body.repoName, 
    "auto_init": true, 
    "private": true, 
    "gitignore_template": "nanoc" 
  }, {
    headers: {
      'Authorization': 'token ba8088d61640377a79c9716f130501e865ee87d2'
    }
  })
  .then(({ data }) => {
    res.status(201).json(data)
  })
  .catch(err => {
    console.log(err)

    res.status(500).json({ err: err.message})
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});