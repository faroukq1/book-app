const express = require("express");
const cors = require("cors");
const db = require("./database_configuration");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/books", async (req, res) => {
  const query = `
  SELECT 
      Auteur.codeA, 
      Auteur.nom, 
      Auteur.prenom,
      Livre.codeL, 
      Livre.titre, 
      Livre.Annee, 
      Livre.nbexp, 
      Livre.qtedisp
  FROM 
      Auteur
  JOIN 
      Ecrire ON Auteur.codeA = Ecrire.codeA
  JOIN 
      Livre ON Ecrire.codeL = Livre.codeL;
`;

  try {
    const response = await db.query(query);
    res.status(200).send({ data: response[0] });
  } catch (error) {
    console.log("there was an error... " + error);
    res.status(500).send({ error: error });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  const deleteEcrireQuery = `DELETE FROM Ecrire WHERE codeL = ?`;
  const deleteLivreQuery = `DELETE FROM Livre WHERE codeL = ?`;

  try {
    await db.query(deleteEcrireQuery, [bookId]);

    const [result] = await db.query(deleteLivreQuery, [bookId]);

    if (result.affectedRows > 0) {
      res
        .status(200)
        .send({ message: `Book with ID ${bookId} deleted successfully.` });
    } else {
      res.status(404).send({ message: `Book with ID ${bookId} not found.` });
    }
  } catch (error) {
    console.error("There was an error: " + error);
    res.status(500).send({ error: error.message });
  }
});

app.post("/api/books", async (req, res) => {
  const { codeA, titre, annee, nbexp, qtedisp } = req.body;

  // SQL query to check if the author exists
  const checkAuthorQuery = `SELECT * FROM Auteur WHERE codeA = ?`;

  // SQL query to insert a new book into Livre
  const insertLivreQuery = `INSERT INTO Livre (titre, Annee, nbexp, qtedisp) VALUES (?, ?, ?, ?)`;

  // SQL query to associate the new book with the selected author in Ecrire
  const insertEcrireQuery = `INSERT INTO Ecrire (codeL, codeA) VALUES (?, ?)`;

  try {
    // Check if the author exists
    const [author] = await db.query(checkAuthorQuery, [codeA]);

    if (author.length === 0) {
      return res
        .status(404)
        .send({ message: `Author with ID ${codeA} not found.` });
    }

    // Insert the new book into Livre and get the generated codeL
    const [result] = await db.query(insertLivreQuery, [
      titre,
      annee,
      nbexp,
      qtedisp,
    ]);

    if (result.affectedRows > 0) {
      const newBookId = result.insertId;

      // Insert into Ecrire to associate the new book with the author
      await db.query(insertEcrireQuery, [newBookId, codeA]);

      res
        .status(201)
        .send({ message: `Book titled "${titre}" added successfully.` });
    } else {
      res.status(500).send({ message: "Failed to add the book." });
    }
  } catch (error) {
    console.error("There was an error: " + error);
    res.status(500).send({ error: error.message });
  }
});
app.get("/api/autors", async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM auteur");
    res.status(200).send(response[0]);
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log("server running on port : " + PORT);
});
