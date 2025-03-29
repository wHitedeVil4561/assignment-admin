import { AccessRoleT } from "../store/users/user.model"

export interface RoleI {
    id:AccessRoleT,
    name:string
}
export const roleList:RoleI[]=[
    {
        id:'admin',
        name:'Admin'
    },
    {
        id:'editor',
        name:'Editor'
    },
    {
        id:'viewer',
        name:'Viewer'
    }
]