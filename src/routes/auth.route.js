import express from 'express'
import  User  from '../models/User.js'
import CryptoJS from 'crypto-js'
import tokenService from '../services/token.service.js'

const router = new express.Router()
const refreshTokens = {}

router.post('/register', async (req,res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
    
})


router.post('/login', async (req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        
        if(!user) return res.status(401).json('Wrong Email!') 

        const hash = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const Originalpassword = hash.toString(CryptoJS.enc.Utf8)

        if(Originalpassword !== req.body.password) return res.status(401).json('Wrong password') 

        const accessToken = await tokenService.generateToken(user)
        const refreshToken = await tokenService.generateRefreshToken(user)

        const {password, ...others} = user._doc
        const response = {  
            ...others,
            accessToken,
            refreshToken
        }
        refreshTokens[refreshToken] = user
         res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})



router.post('/refresh', async(req,res)=>{
    try { 
        const {refreshToken} = req.body
        if(refreshToken && (refreshToken in refreshTokens)) {
            const user = refreshTokens[refreshToken]
            const token = await tokenService.generateRefreshToken(user)

            res.status(200).send({user,token:token})
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


export {router}