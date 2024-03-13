const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/addTwoNumbers', (req, res) => {
    calculateTwoNumbers(res, req, "add")
})

app.get('/subtractTwoNumbers', (req, res) => {
    calculateTwoNumbers(res, req, "subtract")
})

app.get('/divideTwoNumbers', (req, res) => {
    calculateTwoNumbers(res, req, "divide")
})

app.get('/multiplyTwoNumbers', (req, res) => {
    calculateTwoNumbers(res, req, "multiply")
})

function calculateTwoNumbers(res, req, type) {
    try {
        const number1 = Number(req.query.number1)
        const number2 = Number(req.query.number2)
        if (!number1 || !number2) {
            res.status(400).json( {message: 'Both number1 and number2 must be provided', statusCode: 400 } )
        }

        let total = 0
        switch(type) {
            case "add":
                total = number1 + number2
                break
            case "subtract":
                total = number1 - number2
                break
            case "divide": 
                total = number1 / number2
                break
            case "multiply":
                total = number1 * number2
                break
            default:
                total = null
        }
        
        res.status(200).json( {data: total, message: 'success', statusCode: 200} )
    } catch(error) {
        res.status(500).json( {data: error.message, message: 'error', statusCode: 500} )
    }
}

app.listen(port, () => {
  console.log(`Express server started. App listening on port ${port}`)
})