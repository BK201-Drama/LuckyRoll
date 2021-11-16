import axios from 'axios'
import qs from 'qs'

export async function getLogin (info) {
  var resp = await axios.post('http://localhost:3000/home', qs.stringify({
    params: {
      username: info.username,
      password: info.password
    }},
    { indices: false }
  ))
  return resp
}