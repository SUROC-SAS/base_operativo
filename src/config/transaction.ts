import { Sequelize, Transaction } from 'sequelize';

interface TransactionMethods {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export class TransactionAdapter {
  _transaction: Transaction | null = null;
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  get transaction(): Transaction {
    return this._transaction!;
  }

  async startTransaction(): Promise<Transaction> {
    this._transaction = await this.sequelize.transaction();
    return this.transaction;
  }

  async commit(transaction: TransactionMethods): Promise<void> {
    await transaction.commit();
  }

  async rollback(transaction: TransactionMethods): Promise<void> {
    await transaction.rollback();
  }
}