const elements = {

    incomeOption: document.querySelector('#income'),
    expenseOption: document.querySelector('#expense'),
    addingBtn: document.querySelector('#adding-button'),

    balance: document.querySelector('#balanceOutput'),
    totalIncome: document.querySelector('#total-income'),
    totalExpense: document.querySelector('#total-expense')

}

/// display date and time////

function displayDateandTime() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    const dateandtime = `${day}/${month}/${year} ${hour}:${minute}`;
    return dateandtime;

}


/// create account object/////////

const personalAccount = {

    incomes: [],
    expenses: [],

    addIncome(description, income) {
        this.incomes.push({ description, income });
        console.log(this.incomes);
        let incomeString = JSON.stringify(this.incomes);
        localStorage.setItem("income", incomeString);
    },

    addExpense(description, expense) {
        this.expenses.push({ description, expense });
        let expenseString = JSON.stringify(this.expenses);
        localStorage.setItem("expense", expenseString);
    },

    incomeSum() {
        const sum = this.incomes.reduce((acc, curr) => {
            return acc + curr.income;
        }, 0);
        return sum;
    },

    expenseSum() {
        const sum = this.expenses.reduce((acc, curr) => {
            return acc + curr.expense;
        }, 0);
        return sum;
    },

    accountBalance() {
        const balance = this.incomeSum() - this.expenseSum();
        return balance;
    },


};

const incomesDisplay = () => {


    let incomeObj = JSON.parse(localStorage.getItem("income"));
    return incomeObj.map(transaction => {

        return `<p><span>${transaction.description}</span>: <span>${transaction.income}</span> $ on  ${displayDateandTime()}</p>`;
    }).join("  ");
};

const expensesDisplay = () => {
    let expenseObj = JSON.parse(localStorage.getItem("expense"));
    return expenseObj.map(transaction => {
        return `<p><span>${transaction.description}</span>: <span>${transaction.expense}</span> $ on ${displayDateandTime()}</p>`;
    }).join(" ");
};


balanceDisplay = () => {
    let balance = parseInt(personalAccount.accountBalance());
    return elements.balance.innerHTML = `${balance}`;
};


incomesumDisplay = () => {
    let incomeSum = parseInt(personalAccount.incomeSum());
    return elements.totalIncome.innerHTML = `Total Income: ${incomeSum}`;
};

expensesumDisplay = () => {
    let expenseSum = parseInt(personalAccount.expenseSum());
    return elements.totalExpense.innerHTML = `Total Expense: ${expenseSum}`;

};


elements.addingBtn.addEventListener('click', function () {
    const description = document.querySelector('#description').value;
    const amount = parseInt(document.querySelector('#amount').value);
    const incomeOutput = document.querySelector('#incomeOutput');
    const expenseOutput = document.querySelector('#expenseOutput');


    if (elements.incomeOption.selected == true) {
        personalAccount.addIncome(description, amount);
        let incomeData = document.createElement('div');
        incomeOutput.innerHTML = '';
        incomeData.innerHTML = incomesDisplay();
        incomeOutput.appendChild(incomeData);

    } else if (elements.expenseOption.selected == true) {
        personalAccount.addExpense(description, amount);
        let expenseData = document.createElement('div');
        expenseOutput.innerHTML = '';
        expenseData.innerHTML = expensesDisplay();
        expenseOutput.appendChild(expenseData);
    }
    balanceDisplay();
    incomesumDisplay();
    expensesumDisplay();
}
);
