import { User } from 'src/entities/user.entity'
import { ApiResponseDTO } from '../api/response.dto'
import { UserDTO } from './user.dto'

export interface UserResponseApiDTO extends ApiResponseDTO {
    data?: UserDTO | UserDTO[] 
}