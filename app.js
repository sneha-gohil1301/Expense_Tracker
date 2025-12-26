const expenseform = document.querySelector("#expense-form");
// console.log(expenseform);
const expenstelist = document.querySelector("#expenste-list");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
// console.log(expenses);
let editIndex = -1;
function renderExpenses() {
  expenstelist.innerHTML = "";
  let total = 0;
  let rows = ""; // Accumulate rows before inserting
  expenses.forEach((expense, index) => {
    console.log(expense);
    total += parseFloat(expense.expenseamount);

    rows += `<tr>
        <td>${expense.expensename}</td>
        <td>${expense.expenseamount}</td>
        <td>${expense.expensedate}</td>
        <td>${expense.expensecategory}</td>
        <td>
          <button onclick="delteExpense(${index})">Delete</button>
          <button onclick="editExpense(${index})">Edit</button>
        </td>
    </tr>`;
  });
  expenstelist.innerHTML = rows; // Insert all rows at once

  //   console.log("Total Expenses:", total);
}
expenseform.addEventListener("submit", (e) => {
  e.preventDefault();

  const expensename = document.querySelector("#expense-name").value;
  const expenseamount = document.querySelector("#expense-amount").value;
  const expensedate = document.querySelector("#expense-date").value;
  const expensecategory = document.querySelector("#expense-category").value;

  const newExpense = {
    expensename,
    expenseamount,
    expensedate,
    expensecategory,
  };

  if (editIndex === -1) {
    expenses.push(newExpense);
  } else {
    expenses[editIndex] = newExpense;
    editIndex = -1;
  }
  // console.log(newExpense);
  // expenses = [...expenses, newExpense];
  // expenses = expenses.concat(newExpense);
  // expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  // expenses.push(newExpense);
  expenseform.reset();
  // localStorage.setItem("expenses", JSON.stringify(expenses)); // Store the entire array

  renderExpenses();

  //   console.log(newExpense);
});

function delteExpense(index) {
  console.log(index);
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function editExpense(idnex) {
  console.log(idnex);
  const expenseToEdit = expenses[idnex];
  document.querySelector("#expense-name").value = expenseToEdit.expensename;
  document.querySelector("#expense-amount").value = expenseToEdit.expenseamount;
  document.querySelector("#expense-date").value = expenseToEdit.expensedate;
  document.querySelector("#expense-category").value =
    expenseToEdit.expensecategory;
  editIndex = idnex;
  console.log(expenseToEdit);
}
renderExpenses();