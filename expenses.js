const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expenses-list');
const totalAmountSpan = document.getElementById('total-amount');

if (expenseForm) {
    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const description = document.getElementById('expense-desc').value;
        const amount = document.getElementById('expense-amount').value;
        const category = document.getElementById('expense-category').value;
        const tripNumber = document.getElementById('expense-trip-id').value;

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
            alert('Please login to add expenses');
            return;
        }

        try {
            const res = await fetch(`${window.API_URL}/api/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.token}`
                },
                body: JSON.stringify({ description, amount, category, tripNumber })
            });

            if (res.ok) {
                fetchExpenses();
                expenseForm.reset();
            } else {
                alert('Failed to add expense');
            }
        } catch (error) {
            console.error(error);
        }
    });
}

async function fetchExpenses() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.token) return;

    try {
        const res = await fetch(`${window.API_URL}/api/expenses`, {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        });
        const expenses = await res.json();

        if (expenseList) {
            expenseList.innerHTML = expenses.map(expense => `
                <div class="expense-item">
                    <div class="expense-info">
                        <h4>${expense.description} <small>(Trip #${expense.tripNumber || '?'})</small></h4>
                        <span>${expense.category}</span>
                        <span>${new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                    <div class="expense-actions">
                        <span class="expense-amount">$${expense.amount}</span>
                        <i class="fas fa-trash delete-expense" onclick="deleteExpense('${expense._id}')"></i>
                    </div>
                </div>
            `).join('');

            const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
            if (totalAmountSpan) {
                totalAmountSpan.textContent = `$${total.toFixed(2)}`;
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function deleteExpense(id) {
    if (!confirm('Are you sure?')) return;

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
        await fetch(`${window.API_URL}/api/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        });
        fetchExpenses();
    } catch (error) {
        console.error(error);
    }
}

// Initial fetch if logged in
document.addEventListener('DOMContentLoaded', fetchExpenses);
