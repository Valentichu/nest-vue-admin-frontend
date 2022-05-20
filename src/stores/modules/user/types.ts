import { roleNames } from '@/config/const'

export interface UserState {
  name?: string
  roleName?: roleNames
  departmentId?: number
}
