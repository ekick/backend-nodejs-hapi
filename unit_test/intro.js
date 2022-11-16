const http = require('http')

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'text/html')
  response.setHeader('X-Powered-By', 'NodeJS') // res header atribut
  response.statusCode = 200

  const { method, url } = request
  if (url === '/') {
    if (method === 'GET') {
      response.end('<h1>Request dengan get</h1>')
    } else {
      response.statusCode = 400
      response.end('<h1>Tidak dapat diakses dengan request ini</h1>')
    }
  } else if (url === '/about') {
    if (method === 'POST') {
      let body = []
      request.on('data', (chunk) => {
        body.push(chunk)
      })
      request.on('end', () => {
        body = Buffer.concat(body).toString()
        const { name } = JSON.parse(body)
        response.end(`<h1>Request dengan ${name}</h1>`)
      })
    }
  } else {
    response.statusCode = 404
    response.end('<h1>Halaman not Found 404</h1>')
  }

  if (method === 'PUT') {
    response.end(JSON.stringify({
      message: 'request metode PUT!'
    }))
  }
  if (method === 'DELETE') {
    response.end(JSON.stringify({
      message: 'request metode DELETE!'
    }))
  }
}

const server = http.createServer(requestListener)

const port = 5000
const host = 'localhost'

server.listen(port, host, () => {
  console.log(`Server running http://${host}:${port}`)
})
