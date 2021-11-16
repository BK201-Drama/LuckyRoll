import axios from 'axios'

axios.post('http://localhost:3000/myRoll', qs.stringify({
  params: {
    ids: param,
    type: tp
  }},
  { indices: false }
))