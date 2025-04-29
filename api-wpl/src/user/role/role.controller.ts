import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.roleService.createRole(name);
  }

  @Get()
  findAll() {
    return this.roleService.findAllRoles();
  }
}