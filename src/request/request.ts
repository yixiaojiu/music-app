import axios from 'axios'

export const getIP = axios.create({
  baseURL: 'https://api.ipify.org/',
  params: {
    format: 'json'
  }
})

export const music = axios.create({
  baseURL: 'https://netease-cloud-music-api-psi-gray.vercel.app/',
  withCredentials: true
})
