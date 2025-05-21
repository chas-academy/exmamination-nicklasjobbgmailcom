// =============================================
// skapa två arrayer, en för income, en för expenses, för att lagra transaktioner.
// ARRAYER FÖR TRANSAKTIONER
// =============================================

const incomes = []; //Inkomster
const expenses = []; //Utgifter

// =============================================
// ELEMENT FRÅN HTML
// =============================================

const descInput = document.getElementById("desc"); // inputfält för beskrivning
const amountInput = document.getElementById("amount"); // inputfält för belopp
const incomeBtn = document.getElementById("incomeBtn"); // knapp för inkomst
const expenseBtn = document.getElementById("expenseBtn"); // knapp för utgift

const incomeList = document.getElementById("incomeList"); // lista för inkomster
const expenseList = document.getElementById("expenseList"); // lista för utgifter
const transactionList = document.getElementById("transactionList"); // lista för transaktioner
const balanceDisplay = document.getElementById("balance"); // element för saldo

// =======================================================
// FUNKTIONER FÖR ATT LÄGGA TILL TRANSAKTIONER
// =======================================================

function addTransaction(type) {
    const description = descInput.value.trim(); // hämta beskrivning
    const amount = parseFloat(amountInput.value); // hämta belopp

    // kontrollera om beskrivning och belopp är giltiga
    if (!description || isNaN(amount)) {
    alert("Fyll i både beskrivning och ett giltigt belopp.");
    return;
    }
    
    // skapa ett objekt för transaktionen
    const transaction = { 
        description, 
        amount, 
        type 
    };

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
    
    
    renderTransaction();
}

// ========================================
// LÄGGA TILL EN TRANSAKTION I LISTAN
// ========================================

function renderTransaction() {
    if (!incomeList || !expenseList || !transactionList) return; // avsluta om elementen inte finns

    transactionList.innerHTML = ""; // rensa transaction listan
    incomeList.innerHTML = ""; // rensa income listan
    expenseList.innerHTML = ""; // rensa expense listan

    // lägg till inkomster i listan
    for (let income of incomes) {
        const li = document.createElement("li"); // skapa ett nytt list element
        li.textContent = `${income.description}: ${income.amount} kr [Inkomst]`;
        incomeList.appendChild(li); // lägg till list elementet i income listan
        
        const liTotal = document.createElement("li"); // skapa ett nytt list element
        liTotal.textContent = `${income.description}: ${income.amount} kr [Inkomst]`;
        transactionList.appendChild(liTotal); // lägg till list elementet i transaktionslistan
    }
    
        // lägg till utgifter i listan
    for (let expense of expenses) {
        const li = document.createElement("li"); // skapa ett nytt list element
        li.textContent = `${expense.description}: ${expense.amount} kr [Utgift]`;
        expenseList.appendChild(li); // lägg till list elementet i expense listan
        
        const liTotal = document.createElement("li"); // skapa ett nytt list element
        liTotal.textContent = `${expense.description}: ${expense.amount} kr [Utgift]`;
        transactionList.appendChild(liTotal); // lägg till list elementet i transaktionslistan
    }

    updateBalance(); // uppdatera saldo

}
// =========================================
// RÄKNA UT OCH UPPDATERA SALDO
// =========================================

function updateBalance() {
    if (!balanceDisplay) return;
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