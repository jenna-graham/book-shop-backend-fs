-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists books;

CREATE table books (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR NOT NULL,
    released INT
);

INSERT INTO books (title, released) VALUES
('A New Earth', '2005'),
('The Book of Joy', '2016'),
('The Alchemist', '1993'),
('grokking algorithms', '2016'),
('Sacred Woman', '2000'),
('The Power of Now', '1997'),
('Untamed', '2020'),
('Melanin Empath', '2019'),
('You Are The Universe', '2017');
