import axios from 'axios'

export default {
  getPosts() {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data)
  },

  getMyPosts(page = 1, limit = 10) {
    return axios
      .get(`http://localhost:8080/posts`, {
        params: { page, limit }, // Passing query parameters
      })
      .then(res => res.data)
  },
}
