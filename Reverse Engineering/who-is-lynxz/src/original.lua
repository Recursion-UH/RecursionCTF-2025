UDF2.show()

local processList = getProcesslist()
local cheatEngineProcess = nil

for pid, name in pairs(processList) do
  if name:lower():find("cheatengine") then
    cheatEngineProcess = name
    break
  end
end

if cheatEngineProcess then
    openProcess(cheatEngineProcess)
    if getOpenedProcessID() ~= 0 then
      showMessage("Successfully attached to: " .. cheatEngineProcess)
    else
      showMessage("Failed to attach to " .. cheatEngineProcess)
    end
else
  showMessage("Cheat Engine process not found. Is it running?")
end

function randomString(length)
    local chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    local result = ""
    for i = 1, length do
      local randIndex = math.random(1, #chars)
      result = result .. chars:sub(randIndex, randIndex)
    end
    return result
end

function xorString(str, key)
  local encoded = ""
  for i = 1, #str do
    local c = str:byte(i)
    local k = key:byte(i % #key + 1)
    encoded = encoded .. string.char(bXor(c, k))
  end
  return encoded
end

math.randomseed(0x6b656e7a6d61)

function writeHexToMemory(address, hexString)
  local bytes = {}
  for hexByte in hexString:gmatch("%S%S") do
    table.insert(bytes, tonumber(hexByte, 16))
  end
  writeBytes(address, table.unpack(bytes))
end

if globalTimer then
  globalTimer.enabled = false
  globalTimer.destroy()
end

dynAddress = nil
password = nil

globalTimer = createTimer(nil, false)
globalTimer.interval = 5000
globalTimer.OnTimer = function()
  if not dynAddress then
    dynAddress = allocateMemory(100)
  else
    dynAddress = allocateMemory(100, dynAddress + math.random(100000, 999999))
  end

  writeQword(fakeAddress + 64, dynAddress)
  password = randomString(8)
  writeString(dynAddress, password)
end
globalTimer.enabled = true

local fake = "RECURSION{fake_flag}"

fakeAddress = allocateMemory(#fake+1)
writeString(fakeAddress, fake)
writeString(fakeAddress + 64, "hello")

local realFlag = "RECURSION{REDACTED}"
local xorKey = randomString(8)
local encFlag = "60 08 71 1b 28 15 79 17 7c 36 5e 37 14 3e 4a 07 45 79 41 11 1b 19 57 2a 02 3a 46 7e 0a 77 04 07 5a 2c 51 25 49 34 6f 3a 53 2e 59 11 0e 2e 03 36 4f"

flagAddr = allocateMemory(200, fakeAddress + math.random(128, 256))
writeHexToMemory(flagAddr, encFlag)
writeString(flagAddr + 96, xorKey)

function UDF2_CEButton1Click(sender)
  if UDF2.CEEdit1.Text == password then
    showMessage("Unlocked, find me on " .. string.format("0x%X", flagAddr) .. " and plus 96 from the starting address there will be an xor key.")
  else
    showMessage("Incorrect Password")
  end
end
