const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/addTwoNumbers', (req, res) => {
    calculateTwoNumbers(req, res, "add")
})

app.get('/subtractTwoNumbers', (req, res) => {
    calculateTwoNumbers(req, res, "subtract")
})

app.get('/divideTwoNumbers', (req, res) => {
    calculateTwoNumbers(req, res, "divide")
})

app.get('/multiplyTwoNumbers', (req, res) => {
    calculateTwoNumbers(req, res, "multiply")
})

function calculateTwoNumbers(req, res, type) {
    let responseData = { data: null, message: '', statusCode: 200 };

    try {
        const number1 = Number(req.query.number1)
        const number2 = Number(req.query.number2)
        if (!number1 || !number2) {
            responseData.message = "Both number1 and number2 must be provided."
            responseData.statusCode = 400
            throw new Error(responseData.message)
        }

        switch(type) {
            case "add":
                responseData.data = number1 + number2
                break
            case "subtract":
                responseData.data = number1 - number2
                break
            case "divide": 
                responseData.data = number1 / number2
                break
            case "multiply":
                responseData.data = number1 * number2
                break
            default:
                responseData.data = null
        }
        responseData.message = 'success'
    } catch(error) {
        responseData.data = error.message
        responseData.message = "error"
        responseData.statusCode = 500
    }
    res.status(responseData.statusCode).json(responseData)
}

app.listen(port, () => {
  console.log(`Express server started. App listening on port ${port}`)
})