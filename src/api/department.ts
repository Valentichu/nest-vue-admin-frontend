import axios from 'axios'

export interface Department {
  id: number
  name: string
  parentId: number | null
  children: Department[] | null
}

export function getDepartmentTree() {
  return axios.get<Department[]>('/department')
}

export function getDepartment(id: number) {
  return axios.get<Department>(`/department/${id}`)
}

export function updateDepartment(id: number, data: Department) {
  return axios.patch(`/department/${id}`, data)
}

export function addDepartment(department: Department) {
  return axios.post('/department', department)
}

export function deleteDepartment(id: number) {
  return axios.delete(`/department/${id}`)
}
