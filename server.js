const { createServer } = require('node:http')
const { readFileSync } = require('node:fs')
const { join } = require('node:path')

const STATIC_FILES = {
  '/favicon.svg': { content: readFileSync(join(__dirname, 'favicon.svg')), type: 'image/svg+xml' },
  '/og.png': { content: readFileSync(join(__dirname, 'og.png')), type: 'image/png' },
}

const html = readFileSync(join(__dirname, 'index.html'))

const server = createServer((req, res) => {
  const file = STATIC_FILES[req.url]
  if (file) {
    res.writeHead(200, { 'Content-Type': file.type })
    res.end(file.content)
    return
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end(html)
}).listen(3000, () => console.log('Listening on :3000'))

process.on('SIGTERM', () => server.close(() => process.exit(0)))
