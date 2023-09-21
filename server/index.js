const PORT = process.env.PORT ?? 8000 //this uses a port variable if it exists (e.g. if deployed on a service), otherwise port 8000
const express = require('express')
const { v4: uuidv4} = require('uuid')  //from documentation used for giving unique id.
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcryptjs')   //used to hash passwords
const jwt = require('jsonwebtoken') //used to generate a web authentication token for use in cookie creation

app.use(cors())  //to fix cors error locally
app.use(express.json())   //to give our app the ability to post json

//Express test to check routing is working
app.get('/', (req, res) => {
    res.send("hello!")
})


// get all books
app.get('/books/:userEmail', async (req, res) => {

    const { userEmail } = req.params  //uses destructuring to grab the email from the url
    //console.log(userEmail)

    try {
        //const books = await pool.query('SELECT * FROM books') //this returns all books
        const books = await pool.query('SELECT * FROM books WHERE user_email = $1', [userEmail])
        res.json(books.rows)

    } catch (err) {
        console.error(err)
        
    }
})

//create a new book
app.post('/books', async (req, res) => {
    const { user_email, title, progress, date} = req.body
    const id = uuidv4()
    //const user_email = "Ann@test.com"
    //console.log(req.body)
    try {
        const newBook = await pool.query('INSERT INTO books(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)',
        [id, user_email, title, progress, date])

        

        res.json(newBook)
        
    } catch (err) {
        console.error(err)
        
    }
})



//edit a book
app.put('/books/:id', async (req, res) => {
    const { id } = req.params
    const { user_email, title, progress, date} = req.body
    try {
        const editBook = await pool.query('UPDATE books SET user_email = $1, title = $2, progress = $3, date =$4 WHERE id = $5;',
        [user_email, title, progress, date, id])

        res.json(editBook)
        
    } catch (err) {
        console.error(err)
        
    }
})


//delete a book
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params   //destructuring used to access param as req.params is an object.
    try {
        const deleteBook = await pool.query('DELETE FROM books WHERE id = $1', [id])
        res.json(deleteBook)
    } catch (err) {
        console.error(err)
        
    }
})


//sign up

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
        
    try {

        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, hashedPassword])

        const token = jwt.sign({ email }, 'secret' , {expiresIn: '1hr'})

        res.json({email, token})
        
      
    } catch (err) {
        console.error(err)
        if(err){
            res.json({detail: err.detail})
        }
        
    }
})

//login

app.post('/login', async (req, res) => {
    const { email, password} = req.body

    try {
        const users = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])

        if (!users.rows.length) return res.json({ detail: 'User does not exist!'})

        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const token = jwt.sign({ email }, 'secret' , {expiresIn: '1hr'})

        if(success){
            res.json({'email': users.rows[0].email, token})
        } else{
            res.json({detail: 'Login failed!'})
        }
        
    } catch (err) {
        console.error(err)
        
    }
})

app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))