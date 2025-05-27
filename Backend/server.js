import express from "express";
// to use import we need to add "type":"module" in package.json
import dotenv from "dotenv";
import {sql} from "./config/db.js";

// Load environment variables first
dotenv.config();



const app = express();

//build in middleware
app.use(express.json());
//custom one 
// app.use((req,res,next) => {
//     console.log("Hey we hit a req, the method is",req.method)
//     next()

// })

const PORT = process.env.PORT ||5001;

async function initDB(){
    try {
        await sql `CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("DATABASE Initialized Sucessfully");

    } catch (error){
        console.log("Error initializing database",error)
        process.exit(1); // status code 1 means faiilure and 0 means sucess

    }
}

//authontication check(request,respond)
app.get("/",(req,res) =>{
    res.send("its working")
})

app.post("/api/transaction", async( req,res) =>{
    try{
        const { title,amount,category,user_id} = req.body;

        if (!title || !user_id || !category || amount  === undefined){
            return res.status(400).json({message: " All Fields are required"});
        }
        await sql`
        INSERT INTO transactions(user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category})
        RETURNING *
        `;

        console.log(transactions);
        res.status(201).json(transactions[0]);

    } catch (error) {
        console.log("Error creating the transactions",error)
        res.status(500).json({message:"Internal server error"})
    }
});


app.get("/",(req,res) => {
    res.send("It is reciving the request with the updates");
});

initDB().then(() => {

    app.listen(PORT,() =>{
        console.log("Sever is Runnning Sucessfully with Database in it in PORT:",PORT);
    
    });
});


