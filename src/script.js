// =============================================
// skapa två arrayer, en för income, en för expenses, för att lagra transaktioner.
// ARRAYER FÖR TRANSAKTIONER
// =============================================

let incomes = []; //Inkomster
let expenses = []; //Utgifter

// =============================================
// ELEMENT FRÅN HTML
// =============================================

const descInput = document.getElementById("desc"); // inputfält för beskrivning
const amountInput = document.getElementById("amount"); // inputfält för belopp
const incomeList = document.getElementById("incomeList"); // lista för inkomster
const expenseList = document.getElementById("expenseList"); // lista för utgifter
const balanceDisplay = document.getElementById("balance"); // element för saldo

const transactionList = document.getElementById("transactionList"); // lista för transaktioner

// knappar
const incomeBtn = document.getElementById("incomeBtn"); // knapp för inkomst
const expenseBtn = document.getElementById("expenseBtn"); // knapp för utgift

// =======================================================
// FUNKTIONER FÖR ATT LÄGGA TILL TRANSAKTIONER
// =======================================================

function addTransaction(type) {
    const description = descInput.value; // hämta beskrivning
    const amount = Number(amountInput.value); // hämta belopp

    // skapa ett objekt för transaktionen
    const transaction = { 
        description: description, 
        amount: amount,
        type: type
    };

    // kontrollera om beskrivning och belopp är giltiga
    if (!description || isNaN(amount)) {
    alert("Fyll i både beskrivning och ett giltigt belopp.");
    return;
    }

    // lägg till transaktionen i rätt array beroende på typ
    if (type === "income") {
        incomes.push(transaction); // lägg till i income array
    }
    else {
        expenses.push(transaction); // lägg till i expenses array
    }
    
    // =========================================
    // RÄNSA INPUTFÄLT
    // =========================================
    descInput.value = ""; // rensa beskrivning
    amountInput.value = ""; // rensa belopp
    
    
    clearTransaction();
    updateBalance();
    updateTransactionList();
}

// ========================================
// LÄGGA TILL EN TRANSAKTION I LISTAN
// ========================================

function clearTransaction() {

    incomeList.innerHTML = ""; // rensa income listan
    expenseList.innerHTML = ""; // rensa expense listan
    
    // lägg till inkomster i listan
    for (const income of incomes) {
        const li = document.createElement("li"); // skapa ett nytt list element
        li.textContent = `${income.description} - ${income.amount} kr (Inkomst)`;
        incomeList.appendChild(li); // lägg till list elementet i income listan
    }
    
    // lägg till utgifter i listan
    for (const expense of expenses) {
        const li = document.createElement("li"); // skapa ett nytt list element
        li.textContent = `${expense.description} - ${expense.amount} kr (Utgift)`;
        expenseList.appendChild(li); // lägg till list elementet i expense listan
    }

}

function updateTransactionList() {
    if (!transactionList) return; // kolla om elementet finns
    transactionList.innerHTML = ""; // rensa transaktionslistan

    const allTransactions = [...incomes, ...expenses]; // kombinera inkomster och utgifter

    for (const trans of allTransactions) {
        const li = document.createElement("li"); // skapa ett nytt list element
        li.textContent = `${trans.description} - ${trans.amount} kr (${trans.type === "income" ? "Inkomst" : "Utgift"})`;
        transactionList.appendChild(li); // lägg till list elementet i transaktionslistan
    }
}

// =========================================
// RÄKNA UT OCH UPPDATERA SALDO
// =========================================

function updateBalance() {
    if (!balanceDisplay) return; // kolla om elementet finns
    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0); // summera inkomster
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0); // summera utgifter
    const balance = totalIncome - totalExpenses; // räkna ut saldo
    
    balanceDisplay.textContent = balance; // uppdatera saldo i HTML
}

// =============================================
// EVENTLISTENERS FÖR KNAPPAR
// =============================================

incomeBtn.addEventListener("click", () => addTransaction("income")); // lägg till inkomst när knappen "Lägg till Inkomst" trycks
expenseBtn.addEventListener("click", () => addTransaction("expense")); // lägg till utgift när knappen "Lägg till Utgift" trycks