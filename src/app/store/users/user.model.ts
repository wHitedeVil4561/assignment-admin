import { UserByCategoryI, UserListFilterI } from "../../data/user"

export type AccessRoleT = 'admin' | 'editor' | 'viewer'
export type StatusT = 0 | 1 |  -1
export interface UserI {
    id:string,
    name:string,
    email:string,
    role:AccessRoleT,
    status:StatusT
}

export interface UserListI{
    data:UserI[],
    count:number,
    filter:UserListFilterI,
    usersPieChart:UserByCategoryI
}