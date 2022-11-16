const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Homepage'
    }
  },
  {
    method: '*',
    path: '/',
    handler: (request, h) => {
      return 'Tidak dapat merequest dengan method tersebut'
    }
  },
  {
    method: 'GET',
    path: '/about',
    handler: (request, h) => {
      return 'About Page'
    }
  },
  {
    method: '*',
    path: '/about',
    handler: (request, h) => {
      return 'Tidak dapat merequest /about dengan method tersebut'
    }
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return 'Request tidak ditemukan'
    }
  },
  {
    method: 'GET',
    path: '/hello/{name?}',
    handler: (request, h) => {
      const { name = 'stranger' } = request.params // request route url
      const { lang } = request.query
      if (lang === 'id') {
        return `Hai, ${name}!`
      } // request dalam method get ? key name=value
      return `Hello, ${name}!`
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      const { username, password } = request.payload // harus dikirim lewat body/payload
      return `Welcome ${username}`
    }
  },
  {
    method: 'POST',
    path: '/register',
    handler: (request, h) => {
      const { username, password } = request.payload // harus dikirim lewat body/payload
      return h.response('success')
        .type('text/plain')
        .header('X-Custom', 'some-value')
    }
  }
]

module.exports = routes
