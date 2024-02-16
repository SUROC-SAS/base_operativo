export class AssignRoleEntity {
  id: number;
  userId: number;
  roleId: number;

  constructor(id: number, userId: number, roleId: number) {
    this.id = id;
    this.userId = userId;
    this.roleId = roleId;
  }
}