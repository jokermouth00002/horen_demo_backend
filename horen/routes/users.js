const express = require('express')
const router = express.Router()
const pool = require('../config/database')

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

router.get('/users', asyncHandler(async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users')
  res.json(rows)
}))

router.post('/create_users', asyncHandler(async (req, res) => {
  const { name, email, age, account, password } = req.body
  const [result] = await pool.query(
    'INSERT INTO users (name, money, age, account, password) VALUES (?, ?, ?, ?, ?)',
    [name, email, age, account, password]
  )
  res.status(201).json({ id: result.insertId })
}))

router.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

module.exports = router
