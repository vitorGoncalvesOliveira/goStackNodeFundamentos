import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (type !== 'income' && type !== 'outcome')
      throw Error(`tipe ${type} not permited`);

    if (type === 'outcome') {
      const transactionIncomingValue = this.transactionsRepository.getBalance();
      if (transactionIncomingValue.total - value < 0)
        throw Error('Value is higher than income.');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
