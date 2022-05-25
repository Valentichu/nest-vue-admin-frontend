import { ListData, Pagination } from '@/types/global'
import axios from 'axios'

export interface User {
  name: string
  username: string
  phone: string
  level: string
  age: number | null
  employmentDate: string | null
  appointmentDate: string | null
  promotionDate: string | null
  education: string | null
  professionalTitle: string
  roleName: string | null
  departmentId: number | null
  departmentName?: string
  kpi: boolean
}

export interface QueryParams extends Pagination {
  name?: string
  departmentId: number
}

export function getUserList(params: QueryParams) {
  return axios.get<ListData<User>>('/user', { params })
}

export function getUser(id: number) {
  return axios.get<User>(`/user/${id}`)
}

export function updateUser(id: number, data: User) {
  return axios.patch(`/user/${id}`, data)
}

export function addUser(user: User) {
  return axios.post('/user', user)
}

export function deleteUser(id: number) {
  return axios.delete(`/user/${id}`)
}
