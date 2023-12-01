// redirect the user to the login page if they are not logged in
export {default} from 'next-auth/middleware'

export const config = {
    matcher:[
       '/Issues/new',
       '/issues/[id]/edit/:id+'
    ]
}