-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS boxers;
DROP TABLE IF EXISTS books cascade;
DROP TABLE IF EXISTS games;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    release INT NOT NULL
);

CREATE TABLE boxers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob VARCHAR NOT NULL,
    wins INT NOT NULL,
    losses INT 
);

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    genre VARCHAR NOT NULL,
    release INT NOT NULL,
    console VARCHAR NOT NULL
);

INSERT INTO books (
    title, 
    author,
    release
)

VALUES 
('War As I Knew It', 'George S. Patton', 1947),
('Spice and Wolf', 'Isuna Hasekura', 2006),
('My Sisters Keeper', 'Jodi Picoult', 2004),
('The Late Great Me', 'Sandra Scoppettone', 1976),
('Poilu', 'Louis Barthas',  2015),
('The Notebook', 'Nicholas Sparks', 1996),
('Fear And Loathing In Las Vegas', 'Hunter S Thompson', 1971);

INSERT INTO boxers (
    name, 
    dob,
    wins,
    losses
)

VALUES 
('Sugar Ray Robinson', 'May 3, 1921',  174, 19),
('Rocky Marciano', 'September 1, 1923', 49, 0),
('Muhammad Ali', 'January 17, 1942', 56, 5),
('Floyd Mayweather Jr.', 'February 24, 1977', 50, 0),
('Mike Tyson', 'June 30, 1966', 58, 6),
('Bernard Hopkins', 'January 15, 1965', 55, 8),
('Roy Jones Jr.', 'January 16, 1969', 66, 9),
('Manny Pacquiao', 'December 17, 1978', 62, 8),
('George Foreman', 'January 10, 1949', 81, 5),
('Evander Holyfield', 'October 19, 1962', 44, 10);

INSERT INTO games (
    title,
    release,
    genre,
    console
)

VALUES 
('Road Rash64', 1999, 'Racing', 'N64'),
('GoldenEye', 1997, 'Shooter', 'N64'),
('Wrestling Empire', 2021, 'Wrestling', 'PC'),
('Blitz the League 2', 2008, 'Football', 'Xbox360'),
('Black and White', 2001, 'RTS', 'PC');

