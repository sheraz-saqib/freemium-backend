const router = require('express').Router()


router.get('/', (req,res)=>{
    res.send('WELCOME FREEMIUM')
})


router.post('/login', (req,res)=>{
    res.send('Login page')
})


router.post('/signup', (req,res)=>{
    res.send('signup page')
})


router.post('/logout', (req,res)=>{
    res.send('logout page')
})

module.exports = router