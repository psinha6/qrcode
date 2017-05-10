drop table if exists qrImageTable;
create database qrCode;
use qrCode;
CREATE TABLE qrImageTable(
   image_id INT NOT NULL AUTO_INCREMENT,
   image_title VARCHAR(100) NOT NULL unique,
   image_description varchar(100) NOT NULL,
   image_pgno varchar(30),
   image BLOB,
   PRIMARY KEY ( image_id )
   );
   
   INSERT INTO qrImageTable (image_title, image_description, image_pgno) values ('Grade1SubjectSciencePgno13', 'desc1', 'pg13');
   show databases;
   
   
   
   select * from qrImageTable;
   
   INSERT INTO qrImageTable (image_title, image_description, image_pgno) values ('Grade3syllabusNoEnglishpageno12,connection.conne
ct();,12')

truncate table qrImageTable;

CREATE TABLE qrAssetsMapping(
	asset_id INT NOT NULL AUTO_INCREMENT,
    asset_type varchar(50) NOT NULL,
    FOREIGN KEY (image_id) REFERENCES qrImageTable(image_id),
    syllabus_id INT NOT NULL,
    content_id INT NOT NULL,
    asset_description varchar(50),
    PRIMARY KEY ( asset_id )
);
