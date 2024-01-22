import { RolesCodes } from '#/domain';
import { GENERATOR, Validator } from '#/config/validator';

interface Constructor {
  roles: RolesCodes[];
}

export class CreateAssignedRoleDto {
  roles: Constructor['roles'];

  private constructor({
    roles,

  }: Constructor) {
    this.roles = roles;
  }

  static create(object: Record<string, unknown>): [string?, CreateAssignedRoleDto?] {
    const [error, response] = Validator.validateObject<CreateAssignedRoleDto>(this.getSchema(), object);
    if (error) {
      return [error];
    }

    const { roles } = response!;
    const dto = new CreateAssignedRoleDto({ roles });

    return [undefined, dto];
  }

  static getSchema(): Record<string, unknown> {
    return { roles: GENERATOR.array(GENERATOR.string().oneOf(Object.values(RolesCodes))) }
  }
}