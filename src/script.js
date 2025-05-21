// skapa två arrayer, en för income, en för expenses, för att lagra transaktioner.
// === ARRAYER FÖR TRANSAKTIONER ===
const income = []; //Inkomster
const expenses = []; //Utgifter

// === ELEMENT FRÅN HTML ===
const descInput = document.getElementById("desc"); // inputfält för beskrivning
const amountInput = document.getElementById("amount"); // inputfält för belopp
const incomeBtn = document.getElementById("incomeBtn"); // knapp för inkomst
const expenseBtn = document.getElementById("expenseBtn"); // knapp för utgift

const incomeList = document.getElementById("incomeList"); // lista för inkomster
const expenseList = document.getElementById("expenseList"); // lista för utgifter
const transactionList = document.getElementById("transactionList"); // lista för transaktioner
const balanceDisplay = document.getElementById("balance"); // element för saldo


// === FUNKTIONER FÖR ATT LÄGGA TILL TRANSAKTIONER ===
function addTransaction(type) {
    // hämta värden från inputfält
    const description = descInput.value.trim(); // hämta beskrivning
    const amount = parseFloat(amountInput.value); // hämta belopp och konvertera till float

// skapa ett objekt för transaktionen
const transaction = {
    description: description,
    amount: amount,
    type: type
};

// lägg till transaktionen i rätt array beroende på typ
if (type === "income") {
    income.push(transaction); // lägg till i income array
    addToList(transaction, incomeList); // lägg till i inkomstlistan
}
else {
    expenses.push(transaction); // lägg till i expenses array
    addToList(transaction, expenseList); // lägg till i utgiftslistan
}

addToList(transaction, transactionList); // lägg till i transaktionslistan
updateBalance(); // uppdatera saldo
clearInputs(); // rensa inputfält
}

// === FUNKTIONER FÖR ATT LÄGGA TILL EN TRANSAKTION I LISTAN ===
function addToList(transaction, listElement) {
    const li = document.createElement("li"); // skapa list-element
    li.textContent = `${transaction.description}: ${transaction.amount} kr`; // textinnehåll
    listElement.appendChild(li); // lägg till i rätt lista
}

// === FUNKTION FÖR ATT RÄKNA UT OCH UPPDATERA SALDO ===
function updateBalance() {
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0); // summera inkomster
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0); // summera utgifter
    const balance = totalIncome - totalExpenses; // räkna ut saldo
    balanceDisplay.textContent = balance; // uppdatera saldo i HTML
}

// === FUNKTION FÖR ATT RÄNSA INPUTFÄLT ===
function clearInputs() {
    desc.value = ""; // rensa beskrivning
    amount.value = ""; // rensa belopp
}

// === EVENTLISTENERS FÖR KNAPPAR ===
incomeBtn.addEventListener("click", () => addTransaction("income")); // lägg till inkomst när knappen "Lägg till Inkomst" trycks
expenseBtn.addEventListener("click", () => addTransaction("expense")); // lägg till utgift när knappen "Lägg till Utgift" trycks