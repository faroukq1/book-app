DROP DATABASE book;
CREATE DATABASE book;
USE book;

CREATE TABLE Livre (
    codeL INT(10) AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    Annee INT NOT NULL,
    nbexp INT(3) NOT NULL,
    qtedisp INT(3) NOT NULL
);

-- Create table Auteur
CREATE TABLE Auteur (
    codeA INT(2) PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL
);

-- Create table Ecrire
CREATE TABLE Ecrire (
    codeL INT(3),
    codeA INT(2),
    PRIMARY KEY (codeL, codeA),
    FOREIGN KEY (codeL) REFERENCES Livre(codeL),
    FOREIGN KEY (codeA) REFERENCES Auteur(codeA)
);
