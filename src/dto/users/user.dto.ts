import { User } from "src/entities/user.entity"

export interface UserInterfaceDTO {
    name: string, 
    email: string, 
    age: Date
}

export class UserDTO implements UserInterfaceDTO {
    public name: string 
    public email: string
    public age: Date

    constructor(user: User){
        const { age, email, firstName, lastName} = user
        this.age = age
        this.email = email
        this.name = `${firstName} ${lastName}`
    }
}