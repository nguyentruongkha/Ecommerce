import express from 'express'
import  User  from '../models/User.js'
import auth from '../middleware/auth.js'
import Emailservice from '../services/email.service.js'
import tokenService from '../services/token.service.js'
import UserService from '../services/user.service.js'

const router = new express.Router()

router.put('/:id', auth.verifyUser, UserService.updateUser)
router.delete('/:id', auth.verifiAdmin, UserService.deleteUser)
router.get('/user', auth.verifiAdmin, UserService.getAllUser)

router.post('/verifyEmail' ,async(req,res)=>{
  const user = await User.findOne({email:req.body.email})
  const token = await tokenService.generateRefreshToken(user)
   if(user){
     Emailservice.Verification(process.env.MY_EMAIL,token)
     res.send("Send mail success")
   }else{
     res.status(500).json('Account not found')
     res.redirect('/login')
   }
 })

router.get("/stats", async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
        console.log(err);
      res.status(500).json(err);
    }
  });

export {
    router
}