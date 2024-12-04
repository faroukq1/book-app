-- Clear existing data first
DELETE FROM Ecrire;
DELETE FROM Livre;
DELETE FROM Auteur;

-- Insert Authors (ensure prenom is not null)
INSERT INTO Auteur (codeA, nom, prenom) VALUES
(1, 'Hugo', 'Victor'),
(2, 'Dumas', 'Alexandre'),
(3, 'Voltaire', 'Francois-Marie'),
(4, 'Sartre', 'Jean-Paul'),
(5, 'Camus', 'Albert');

-- Insert Books (ensure titre fits column constraints)
INSERT INTO Livre (codeL, titre, Annee, nbexp, qtedisp) VALUES
(1, 'Les Miserables', 1862, 500, 50),
(2, 'Notre-Dame', 1831, 450, 75),
(3, 'Travailleurs Mer', 1866, 300, 60),
(4, 'Quatrevingt-treize', 1874, 250, 40),
(5, 'Dernier Jour', 1829, 200, 30),

(6, 'Monte-Cristo', 1844, 500, 80),
(7, 'Trois Mousquetaires', 1844, 600, 90),
(8, 'Reine Margot', 1845, 350, 55),
(9, 'Vicomte Bragelonne', 1847, 300, 45),
(10, 'Joseph Balsamo', 1846, 250, 40),

(11, 'Candide', 1759, 400, 70),
(12, 'Zadig', 1747, 300, 50),
(13, 'Microm', 1752, 250, 40),
(14, 'Ingenu', 1767, 200, 35),
(15, 'Lettres Philosophiques', 1734, 350, 60),

(16, 'Huis Clos', 1944, 300, 45),
(17, 'La Nausee', 1938, 400, 65),
(18, 'Les Mouches', 1943, 250, 40),
(19, 'Le Mur', 1939, 350, 55),
(20, 'Situations I', 1947, 200, 30),

(21, 'Etranger', 1942, 500, 80),
(22, 'La Peste', 1947, 450, 70),
(23, 'Mythe Sisyphe', 1942, 300, 50),
(24, 'Caligula', 1944, 250, 40),
(25, 'Homme Revolte', 1951, 350, 60);

-- Link Books to Authors in Ecrire table
INSERT INTO Ecrire (codeL, codeA) VALUES
-- Victor Hugo's books
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
-- Alexandre Dumas's books
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2),
-- Voltaire's books
(11, 3), (12, 3), (13, 3), (14, 3), (15, 3),
-- Jean-Paul Sartre's books
(16, 4), (17, 4), (18, 4), (19, 4), (20, 4),
-- Albert Camus's books
(21, 5), (22, 5), (23, 5), (24, 5), (25, 5);