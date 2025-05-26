import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

// PartialType: champs optionnels
export class UpdateUserDto extends PartialType(CreateUserDto) {

}