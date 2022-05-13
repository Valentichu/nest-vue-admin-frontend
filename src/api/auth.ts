import axios from 'axios'
import { UserState } from '@/stores/modules/user/types'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/auth/login', data)
}

export function getUserInfo() {
  return axios.get<UserState>('/auth/info')
}
