const express = require('express')
const app = express()
const port = 3000

// express configuration
app.use(express.json({type: '*/*'}));

// Set your routes
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', function (req, res) {
    
    res.send(`Received object. ${JSON.stringify(req.body)}`);

});

let r = (Math.random() + 1).toString(36).substring(7);
console.log("random", r);
let objects = []

app.post('/share', function (req, res) {
    const code = r;
    const obj = {
      id: code,
      body: req.body
    }
    
 objects = objects.concat(obj);

 return res.status(200).json({
        success: true, 
        link: `http://localhost:${port}/${code}`  
     })
});

app.get('/:id', (request, response) => {
  const id = request.params.id
  const index = objects.findIndex(o => {
    return o.id === id;
  });
  if (index >= 0) {
    const bod = objects[index].body
    objects.splice(index, 1)
    return response.json(bod)
  } else {
    return response.status(404).json({
      success: false,
      error: 404,
      message: "Not Found"
    })
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
