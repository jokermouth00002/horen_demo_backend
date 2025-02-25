const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '52605851',
  database: 'playground',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

pool.getConnection()
  .then(connection => {
    console.log('MySQL connection')
    connection.release()
  })
  .catch(err => {
    console.error('MySQL connection failed:', err)
  })

module.exports = pool