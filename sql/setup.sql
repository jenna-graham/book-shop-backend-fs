-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS authors_books CASCADE;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released INT
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob DATE,
    pob VARCHAR NOT NULL
);

CREATE TABLE authors_books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id BIGINT,
    author_id BIGINT, 
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books (title, released) VALUES
('A New Earth', 2005),
('The Book of Joy', 2016),
('The Alchemist', 1993),
('Sacred Woman', 2000),
('The Power of Now', 1997),
('Untamed', 2020),
('You Are The Universe', 2017);

INSERT INTO authors (name, dob, pob) VALUES
('Eckhart Tolle', '1948-02-16', 'Lünen, Germany'),
('The Dali Lama', '1935-07-06', 'Taktser, China'),
('Desmond Tutu', '1931-10-07', 'Klerksdorp, South Africa'),
('Douglas Abrams', '1967=01-02', 'Santa Cruz, CA'),
('Paulo Coelho', '1947-08-24', 'Rio De Janeiro'),
('Queen Afua', '1953-08-22', 'Brooklyn, NY'),
('Glennon Doyle', '1976-03-20', 'Burke, VA'),
('Deepok Chopra', '1946-10-22', 'New Delhi, India'),
('Menas C. Kafatos', '1945-03-25', 'Crete');

INSERT INTO authors_books (book_id, author_id) VALUES
(1, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 5),
(4, 6),
(5, 1),
(6, 7),
(7, 8),
(7, 9);