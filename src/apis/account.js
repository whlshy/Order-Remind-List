import api from '../lib/api'

export const getAccount = async () => {
  const response = await api({
    method: "GET",
    cmd: "api/Member"
  })
  return response
}

export const logoutAccount = async () => {
  const response = await api({
    method: "GET",
    cmd: "api/Auth/logout"
  })
  return response
}

export const getGoogleSheet = async () => {
  const response = await api({
    method: "GET",
    cmd_url: `https://sheets.googleapis.com/v4/spreadsheets/1qqSXwQV3gjnG2Oxe3_5pi8UmzCwbU4HE9I2XFYng3gg/values/B2?alt=json&key=AIzaSyDlSUHT26risr5nnPNBKQ7vG-ec0mbdwpw`
  })
  return response
}