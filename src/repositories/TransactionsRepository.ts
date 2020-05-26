import { request } from 'express';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'income') {
        // eslint-disable-next-line no-param-reassign
        total += elemento.value;
      }
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, elemento) => {
      if (elemento.type === 'outcome') {
        // eslint-disable-next-line no-param-reassign
        total += elemento.value;
      }
      return total;
    }, 0);

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    this.getBalance();
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
