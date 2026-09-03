import { NextRequest} from "next/server";
import { Redis } from "@upstash/redis"
import fs from "fs"
import path from "path"

const redis = Redis.fromEnv()

const luaScript = fs.readFileSync(
    path.join(process.cwd(),'src','lib','rate-limiter','rateLimiter.lua'),
    'utf-8'
)

const capacity = 5;
const refillPerSecond = 1/600;

export async function rateLimiter(userId: string): Promise<boolean> {

    let clientId = userId

    let res = await redis.eval(luaScript,[`bucket:${clientId}`],[capacity,refillPerSecond,Date.now()])

    if(res == 0){
        return false  
    }

    return true
}