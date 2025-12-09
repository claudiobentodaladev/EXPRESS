CREATE DEFINER=`root`@`localhost` PROCEDURE `peopleAddOrEdit`(
    IN _id INT,
    IN _name VARCHAR(20),
    IN _job VARCHAR(25),
    IN _born_date date,
    IN _sex enum('M','F'),
    IN _weigth decimal(4,2),
    IN _heigth decimal(3,2),
    IN _nacionality varchar(25),
    IN _favorite_course int unsigned,
    IN _descriptions text
)
BEGIN
IF _id = 0 THEN
    INSERT INTO people(name, job, born_date, sex, weigth, heigth, nacionality, favorite_course, descriptions)
    VALUES (_name, _job, _born_date, _sex, _weigth, _heigth, _nacionality, _favorite_course, _descriptions);
ELSE
    UPDATE people
    SET name = _name,
        job = _job,
        born_date = _born_date,
        sex = _sex,
        weigth = _weigth,
        heigth = _heigth,
        nacionality = _nacionality,
        favorite_course = _favorite_course,
        descriptions = _descriptions
    WHERE id = _id;   
END IF;   
SELECT ROW_COUNT() AS 'affectedRows';
END