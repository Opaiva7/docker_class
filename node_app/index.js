const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3001;

// Configuração do MySQL (igual ao docker-compose)
const dbConfig = {
  host: "mysql",       // nome do serviço no docker-compose
  user: "appuser",
  password: "apppass",
  database: "appdb"
};


app.use(express.json());


app.delete("/api/v1/cliente/:id", async (req, res) =>{

try{

    const cliente = req.params.id;
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("DELETE FROM clientes where id = ?", [cliente]);
    await connection.end();
    res.json(rows);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.post("/api/v1/cliente", async (req, res) => {

  try {
    const cliente = req.body;

    if(cliente.email == null || cliente.nome == null || cliente.celular == null){
      res.status(500).json({ error: "Campos obrigatórios não foram preenchidos" });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("INSERT INTO clientes (email, telefone, nome) VALUES (?, ?, ?)", [cliente.email, cliente.celular, cliente.nome]);
    await connection.end();

    if(result.affectedRows > 0){
      res.json({ 
        message: "Cliente inserido com sucesso",
        id: result.insertId 
      });
    }else{
      res.status(500).json({ error: "Erro ao inserir cliente" });
    }

  }catch (err) {
    res.status(500).json({ error: err.message });
  }
});







app.get("/", (req, res) => {
  //res.json({ message: "Node.js está rodando no Docker!" });
  res.send("<h1>Hello World</h1>");
});
-

app.get("/api/v1/cliente", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM clientes");
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/v1/cliente/:id", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM clientes where id = ?", [cliente]);
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Node rodando na porta ${PORT}`);
});
