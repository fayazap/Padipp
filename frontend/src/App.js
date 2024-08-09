import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import './App.css';

import React, { useState, useEffect } from 'react';

const App = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        const response = await fetch('http://localhost:5000/api/expenses');
        const data = await response.json();
        setExpenses(data);
    };

    const addExpense = async (expense) => {
        const response = await fetch('http://localhost:5000/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });
        const newExpense = await response.json();
        setExpenses([...expenses, newExpense]);
    };

    const deleteExpense = async (id) => {
        await fetch(`http://localhost:5000/api/expenses/${id}`, {
            method: 'DELETE',
        });
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    const updatePaymentStatus = async (expenseId, person, paidStatus) => {
        await fetch(`http://localhost:5000/api/expenses/${expenseId}/pay`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ person, paid: paidStatus }),
        });
        setExpenses(expenses.map(expense =>
            expense.id === expenseId
                ? {
                    ...expense,
                    shares: expense.shares.map(share =>
                        share.person === person ? { ...share, paid: paidStatus } : share
                    )
                }
                : expense
        ));
    };

    return (
        <div className="app-center">
            <h1>Padipurakcal Urban</h1>
            <ExpenseForm addExpense={addExpense} />
            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} updatePaymentStatus={updatePaymentStatus} />
        </div>
    );
};

export default App;
