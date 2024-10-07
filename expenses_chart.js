/* Input elements */
let expenseNameInput = document.querySelector('#expense-name')
let expenseAmountInput = document.querySelector('#expense-amount')
let addExpenseButton = document.querySelector('#add-expense')

/* Get chart canvas and contex  */
let chartCanvas = document.querySelector('#expenses-doughnut-chart')
let ctx = chartCanvas.getContext('2d')


// TODO create chart object 

//chart with empty arrays for data to be added later

let expensesChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: [],
            data: [],
            backgroundColor: [],
        }]
    },
    options: {} //data will be added later
})


// TODO (optional) replace with colors of your choice. The array can have as many or as few colors as you like 
let chartColors = [ 'purple', 'orange', 'dodgerblue', 'mediumseagreen', 'slateblue', 'violet' ]


function addExpenseToChart(name, amount) {

    // TODO add expense to chart 
    expensesChart.data.labels.push(name)
    expensesChart.data.datasets[0].data.push(amount)
    
    //cycling through the color chart array above
    let colorCount = expensesChart.data.datasets[0].backgroundColor.length
    let color = chartColors[colorCount % chartColors.length]
    
    expensesChart.data.datasets[0].backgroundColor.push(color)
    expensesChart.update()

}


addExpenseButton.addEventListener('click', function() {

    let errors = []

    let expenseName = expenseNameInput.value
    let expenseAmount = expenseAmountInput.value

    // Validate both fields are filled in, and the amount is a positive number
    if (expenseName.length == 0) {
        errors.push('Enter a type of expense')
    }

    if (expenseAmount.length == 0 || expenseAmountInput < 0) {
        errors.push('Enter a positive amount for the expense')
    }

    // If any errors, alert and return - do not procede to add to chart 
    if (errors.length > 0) {
        alert( errors.join('\n') )
        return
    }

    // TODO call function to update chart
    
    addExpenseToChart(expenseName, expenseAmount) //update chart as user inputs data


    // Clear inputs, ready for next expense name and amount.
    expenseNameInput.value = ''
    expenseAmountInput.value = ''

})


// TODO add event listener to click the Add Expense button when the enter key is pressed
window.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') { //event.keycode no longer works - add key user will push for event
        let inputElements = [expenseNameInput, expenseAmountInput, addExpenseButton]
        if (inputElements.includes(document.activeElement)) {
            addExpenseButton.click()
            expenseNameInput.focus()
        }
    }
});