import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, deleteExpense, updatePaymentStatus }) => {
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            deleteExpense(id);
        }
    };

    const handleTogglePaid = (expenseId, person, currentStatus) => {
        updatePaymentStatus(expenseId, person, !currentStatus);
    };

    return (
        <div className='expense-list-container'>
            <h2>Expenses</h2>
            <div className='expense-list'>
                {expenses.map((expense) => (
                    <div key={expense.id} className="expense-item">
                        <h3>{expense.description} - Rs {expense.amount}</h3>
                        <button onClick={() => handleDelete(expense.id)} className="delete-button">
                            Delete
                        </button>
                        <ul className="expense-shares">
                            {expense.shares.map((share, index) => (
                                <li key={index}>
                                    {share.person}: Rs {share.shareAmount}
                                    <label className="paid-label">
                                        Paid:
                                        <input
                                            type="checkbox"
                                            checked={share.paid}
                                            onChange={() => handleTogglePaid(expense.id, share.person, share.paid)}
                                            className="paid-checkbox"
                                        />
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
