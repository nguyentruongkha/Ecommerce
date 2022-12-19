import { Strategy, ExtractJwt } from "passport-jwt";
import User from '../models/User.js'

const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const verify = async (payload,done) =>{
    try {
        const user = User.findById(payload.id)
    if(!user) {
        return done(null,false)
    }
    done(null,user)
    } catch (error) {
        done(error,false)
    }
}

const jwtStrategy = new Strategy(options,verify)

export {jwtStrategy}