import User from '#/data/postgreSQL/models/user.model';
import { AuthDto } from '#/domain/dtos';
import { Transaction } from 'sequelize';
import { UserMapper } from '../mappers';
import { AuthDataSource } from '#/domain';
import { sequelize } from '#/data/postgreSQL';
import { CustomError } from '#/domain/errors/custom.error';
import { JWTAdapter } from '#/domain/interfaces/adapters/jwt.adapter.interface';
import { UbcryptAdapter } from '#/domain/interfaces/adapters/bcrypt.adapter.interface';

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly jwtAdapter: JWTAdapter,
    private readonly bcryptAdapter: UbcryptAdapter
  ) {}

  async auth({ email, password }: AuthDto): Promise<string> {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const user = await User.findOne({
        where: {
          active: true,
          email: email.toLowerCase(),
        },
        attributes: {
          include: ['password'],
          exclude: ['lastAccess'],
        },
        transaction,
      });

      if (!user) throw CustomError.unauthorized('Error en la autenticación.');
      if (!user.emailValidate) throw CustomError.unauthorized('Error en la autenticación.');

      const compare = await this.bcryptAdapter.compare(password, user.password);
      if (!compare) throw CustomError.unauthorized('Error en la autenticación.');

      return this.jwtAdapter.generate({
        uid: user.uid,
        email: email.toLocaleLowerCase(),
      });
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal();
    }
  }

  async authWithToken({ email }: Record<string, unknown>) {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const user = await User.findOne({
        where: {
          active: true,
          email: email!,
        },
        attributes: {
          include: ['password'],
          exclude: ['lastAccess'],
        },
        transaction,
      });

      if (!user) throw CustomError.unauthorized('Error en la autenticación.');
      if (!user.emailValidate) throw CustomError.unauthorized('Error en la autenticación.');

      return UserMapper(user);
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internal();
    }
  }
}
