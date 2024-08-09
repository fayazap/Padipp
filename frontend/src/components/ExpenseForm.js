import React, { useState } from 'react';

import './ExpenseForm.css'

const ExpenseForm = ({ addExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [shareAmounts, setShareAmounts] = useState({});
    const [paidStatus, setPaidStatus] = useState({});

    const people = ['Fayaz', 'Johnson', 'Punnoos', 'Namboothiri', 'Ananthu', 'Chakki', 'Kashi'];

    const handleSubmit = (e) => {
        e.preventDefault();

        const shares = selectedPeople.map(person => ({
            person,
            shareAmount: parseFloat(shareAmounts[person] || 0),
            paid: paidStatus[person] || false
        }));

        const expense = {
            description,
            amount: parseFloat(amount),
            shares
        };

        addExpense(expense);

        setDescription('');
        setAmount('');
        setSelectedPeople([]);
        setShareAmounts({});
        setPaidStatus({});
    };

    const handleShareChange = (person, value) => {
        setShareAmounts({
            ...shareAmounts,
            [person]: value
        });
    };

    const handlePaidChange = (person) => {
        setPaidStatus({
            ...paidStatus,
            [person]: !paidStatus[person]
        });
    };

    const handlePeopleSelection = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedPeople([...new Set([...selectedPeople, ...selected])]);
    };

    return (
        <div className='form-container'>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div >
                <label>Share With:</label>
                <select className='list-height'
                    multiple
                    onChange={handlePeopleSelection}
                >
                    {people.map(person => (
                        <option key={person} value={person} className='names'>
                            {person}
                        </option>
                    ))}
                </select>
            </div>
            {selectedPeople.map(person => (
                <div key={person} style={{ marginTop: '10px' }}>
                    <label>{person}'s Share:</label>
                    <input
                        type="number"
                        value={shareAmounts[person] || ''}
                        onChange={(e) => handleShareChange(person, e.target.value)}
                        placeholder={`Enter ${person}'s share`}
                        required
                    />
                    <label style={{ marginLeft: '10px' }}>
                        Paid:
                        <input
                            type="checkbox"
                            checked={paidStatus[person] || false}
                            onChange={() => handlePaidChange(person)}
                            style={{ marginLeft: '5px' }}
                        />
                    </label>
                </div>
            ))}
            <button type="submit" style={{ marginTop: '20px' }}>Add Expense</button>
        </form>
        </div>
    );
};

export default ExpenseForm;
