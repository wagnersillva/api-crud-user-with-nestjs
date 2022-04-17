import { User } from "src/entities/user.entity"

export interface UserInterfaceDTO {
    fullName: string, 
    email: string, 
    age: Date
}

export class UserDTO implements UserInterfaceDTO {
    public fullName: string 
    public firstName: string 
    public lastName: string 
    public email: string
    public age: Date

    constructor(user: User){
        const { age, email, firstName, lastName} = user
        this.age = age
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = `${firstName} ${lastName}`
    }
}