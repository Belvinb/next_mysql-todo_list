import {db} from "../index.js"

const tableName = "to_do_items"

const  getAllTodos = (req,res) =>{
    let q = `SELECT * from ${tableName}`

    db.query(q,(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })


}

const addNewTodo = (req,res) =>{
    let q = `INSERT INTO ${tableName}(item_name, date) VALUES (?)`
    const values = [req.body.name,req.body.date]

    db.query(q,[values],(err,data)=>{
        if(err){
           return res.json(err)
        }
        return res.json(data)
    })
}

const deletetodo = (req,res) =>{
    const todoid = req.params.id

    let q = `DELETE FROM ${tableName} WHERE id = ?`

    db.query(q,[todoid],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })

}

export {getAllTodos,addNewTodo,deletetodo}





