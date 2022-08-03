-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

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