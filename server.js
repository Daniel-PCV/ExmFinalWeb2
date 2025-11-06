const express = require("express"); 

const cors = require("cors"); 

const bodyParser = require("body-parser"); 

const conexion = require("./db/conexion"); 

 

const app = express(); 

app.use(cors()); 

app.use(bodyParser.json()); 

app.use(express.static("public")); 

 

// ===== CRUD DE CURSOS ===== 

 

// Crear curso 

app.post("/cursos", (req, res) => { 

  const { nombre, duracion, instructor } = req.body; 

  const sql = "INSERT INTO cursos (nombre, duracion, instructor) VALUES (?, ?, ?)"; 

  conexion.query(sql, [nombre, duracion, instructor], (err, result) => { 

    if (err) res.status(500).send(err); 

    else res.send({ message: "Curso creado", id: result.insertId }); 

  }); 

}); 

 

// Leer cursos 

app.get("/cursos", (req, res) => { 

  conexion.query("SELECT * FROM cursos", (err, results) => { 

    if (err) res.status(500).send(err); 

    else res.json(results); 

  }); 

}); 

 

// Actualizar curso 

app.put("/cursos/:id", (req, res) => { 

  const { id } = req.params; 

  const { nombre, duracion, instructor } = req.body; 

  const sql = "UPDATE cursos SET nombre = ?, duracion = ?, instructor = ? WHERE id = ?"; 

  conexion.query(sql, [nombre, duracion, instructor, id], err => { 

    if (err) res.status(500).send(err); 

    else res.send({ message: "Curso actualizado" }); 

  }); 

}); 

 

// Eliminar curso 

app.delete("/cursos/:id", (req, res) => { 

  const { id } = req.params; 

  const sql = "DELETE FROM cursos WHERE id = ?"; 

  conexion.query(sql, [id], err => { 

    if (err) res.status(500).send(err); 

    else res.send({ message: "Curso eliminado" }); 

  }); 

}); 

 

// ===== INICIAR SERVIDOR ===== 

app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));