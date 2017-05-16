drop table if exists qrImageTable;
create database qrCode;
use qrCode;
CREATE TABLE qrImageTable(
   image_id INT NOT NULL AUTO_INCREMENT,
   image_title VARCHAR(100) NOT NULL unique,
   image_description varchar(100) NOT NULL,
   image_pgno varchar(30),
   class_name varchar(50), 
   subject_name varchar(50),
   chapter_no varchar(50),
   chapter_name varchar(50),
   concept_name varchar(50),
   PRIMARY KEY ( image_id )
   );
   
   INSERT INTO qrImageTable (image_title, image_description, image_pgno) values ('Grade1SubjectSciencePgno13', 'desc1', 'pg13');
   show databases;
   
   
   
   

   
   INSERT INTO qrImageTable (image_title, image_description, image_pgno) values ('Grade3syllabusNoEnglishpageno12,connection.conne
ct();,12')

truncate table qrImageTable;

CREATE TABLE qrAssetsMapping(
	asset_id INT NOT NULL AUTO_INCREMENT,
    board varchar(50) NOT NULL,
    asset_type varchar(50) NOT NULL,
    image_id INT NOT NULL,
    FOREIGN KEY (image_id) REFERENCES qrImageTable(image_id),
    syllabus_id INT NOT NULL,
    class_name varchar(50) NOT NULL,
    subject_name varchar(50) NOT NULL,
    chapter_no varchar(100) NOT NULL,
    chapter_name varchar(100),
    concept_name varchar(100) NOT NULL,
    content_id INT NOT NULL,
    asset_description varchar(50),
    PRIMARY KEY ( asset_id )
);

Select * from qrAssetsMapping where image_id='1';

truncate table qrAssetsMapping;

drop table if exists qrAssetsMapping;