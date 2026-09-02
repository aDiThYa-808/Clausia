local vals = redis.call('HMGET', KEYS[1], 'tokens', 'lastRefill')
local tokens = tonumber(vals[1])
local lastRefill = tonumber(vals[2])
local capacity = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

if tokens == nil then
    tokens = capacity
end

if lastRefill == nil then
    lastRefill = now
end

local elapsed = now - lastRefill
local tokensToRefill = math.floor((elapsed/1000)*refillRate)
tokens = tokens + tokensToRefill
if tokens > capacity then
    tokens = capacity
end

if tokens < 1 then
    tokens = 0
    redis.call('HSET',KEYS[1],'tokens',tokens,'lastRefill',now)
    redis.call('EXPIRE',KEYS[1],(capacity/refillRate))
    return 0
end

tokens = tokens - 1
redis.call('HSET',KEYS[1],'tokens',tokens,'lastRefill',now)
redis.call('EXPIRE',KEYS[1],(capacity/refillRate))
return 1