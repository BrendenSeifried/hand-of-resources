-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
Drop TABLE IF EXISTS books;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    release INT NOT NULL
);

INSERT INTO books (
    title, 
    author,
    release
)

VALUES 
('War As I Knew It', 'George S. Patton', 1947),
('My Sisters Keeper', 'Jodi Picoult', 2004),
('Spice and Wolf', 'Isuna Hasekura', 2006),
('The Late Great Me', 'Sandra Scoppettone', 1976),
('Poilu', 'Louis Barthas',  2015),
('The Notebook', 'Nicholas Sparks', 1996),
('Fear And Loathing In Las Vegas', 'Hunter S Thompson', 1971);