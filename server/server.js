const express = require('express');
const app = express();
app.use(express.json());
const  port   = 5000;
let transactions = [
        {
            id:1,
            description:'Pocket Money',
            amount:1000,
            type:'income'
        },
        {
            id :2,
            description:'Shopping',
            amount:500,
            type:'expense'
            
        },
        {
            id:3,
            description:'Salary',
            amount:2000,
            type:'income'
        }
    ]

app.get('/api/transactions',(req,res)=>{
    
    res.json(transactions);
})
app.post('/api/transactions',(req,res)=>
{
    console.log(req.body);
    const newTranscation  ={
        id: transactions.length+1,
        ... req.body
    }
    transactions.push(newTranscation); 
    res.status(201).json({
        message:'Transaction added successfully',
        data: newTranscation
    });
})
app.delete('/api/transactions/:id', (req, res) => {
    const id = Number(req.params.id);

    console.log(id);
    const transaction  = transactions.find((t)=>{t.id === id});
    if(!transaction)
    {
        return res.status(404).json({message:'Transaction not found'});
    }
    transactions = transactions.filter((t) => t.id !== id);
    res.json({message:'Transaction deleted successfully'});
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

});