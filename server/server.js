

const express = require('express');


const Transaction = require('./Models/Transaction');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MongoDB_URI).then(()=>{
        console.log('Connected to MongoDB successfully');
}).catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
});

// GET all transactions
app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});



// POST new transaction

app.post('/api/transactions', async (req, res) => {
    try {
        const { description, amount, type } = req.body;

        // Check required fields
        if (!description || !amount || !type) {
            return res.status(400).json({
                message: 'Please provide description, amount and type'
            });
        }

        // Validate type
        if (type !== 'income' && type !== 'expense') {
            return res.status(400).json({
                message: 'Type must be income or expense'
            });
        }

        // Validate amount
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({
                message: 'Amount must be a positive number'
            });
        }

        // Save to MongoDB
        const newTransaction = await Transaction.create({
            description,
            amount,
            type
        });

        res.status(201).json({
            message: 'Transaction added successfully',
            data: newTransaction
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// DELETE transaction
app.delete('/api/transactions/:id', async (req, res) => {
    try
    {
        const { id} = req.params;
        const deletedTransaction =
        await Transaction.findByIdAndDelete(id);
        if(!deletedTransaction)
        {
        return  res.status(400).json({
                message:'transaction not found'
            })
        }

        res.json({
            message: 'All transactions deleted successfully',
            data :deletedTransaction
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE transaction
app.put('/api/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTransaction =
            await Transaction.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

        if (!updatedTransaction) {
            return res.status(404).json({
                message: 'Transaction not found'
            });
        }

        res.json({
            message: 'Transaction updated successfully',
            data: updatedTransaction
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});