import { NextRequest} from "next/server";
import { Redis } from "@upstash/redis"
import fs from "fs"
import path from "path"

const redis = Redis.fromEnv()

const luaScript = fs.readFileSync(
    path.join(process.cwd(),'src','lib','rate-limiter','rateLimiter.lua'),
    'utf-8'
)

const capacity = 10;
const refillPerSecond = 2;

export async function rateLimiter(req: NextRequest): Promise<boolean> {
    let forwardedFor = req.headers.get('x-forwarded-for')
    let clientId = (forwardedFor)? forwardedFor.split(",")[0].trim() : 'unknown'

    if(clientId == 'unknown'){
        console.log("bad request")
        return false
    }

    let res = await redis.eval(luaScript,[`bucket:${clientId}`],[capacity,refillPerSecond,Date.now()])

    if(res == 0){
        return false  
    }

    return true
}