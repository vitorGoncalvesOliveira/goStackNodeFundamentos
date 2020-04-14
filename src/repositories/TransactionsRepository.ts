import Transaction from '../models/Transaction';

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
    const incomeArray = this.transactions.filter(transaction => {
      if (transaction.type === 'income') {
        return transaction;
      }
    });

    const outcomeArray = this.transactions.filter(transaction => {
      if (transaction.type === 'outcome') {
        return transaction;
      }
    });
    const income = incomeArray.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);
    const outcome = outcomeArray.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);

    const total = income - outcome;
    if (total < 0) throw Error('Value outcome is negative');

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
