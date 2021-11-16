import axios from 'axios'

export default function add (tp, param) {
  var res = axios.post('http://localhost:3000/myRoll', qs.stringify({
    params: {
      ids: param,
      type: tp
    }},
    { indices: false }
  ))
  return res
}