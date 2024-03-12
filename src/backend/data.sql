CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image_path VARCHAR(255)
);

INSERT INTO cars (make_id, model_id, price, image_path)
VALUES
    (1, 1, 250000.00, 'https://i.pinimg.com/originals/56/f7/55/56f755ce852fc23de4ca0dd6e74361ea.png'),
    (2, 2, 225000.00, 'https://www.honda.ca/-/media/Brands/Honda/Models/CIVIC-SEDAN/2023/Overview/03_Key-Features/Honda_Civic_key-features_desktop_1036x520.png?h=520&iar=0&w=1036&rev=b9ff705973af4776943d63f64055a329&hash=631C8CFA6C956A69634BC36913296FE7'),
    (3, 3, 350000.00, 'https://pngimg.com/uploads/mustang/mustang_PNG15.png'),
    (4, 4, 600000.00, 'https://pngimg.com/uploads/chevrolet/%D1%81hevrolet_PNG35.png');

	CREATE TABLE make (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

SELECT * FROM make;

INSERT INTO make (name) VALUES
('Acura'),
('Alfa Romeo'),
('Aston Martin'),
('Audi'),
('Bentley'),
('BMW'),
('Bugatti'),
('Buick'),
('Cadillac'),
('Chevrolet'),
('Chrysler'),
('Citroen'),
('Dodge'),
('Ferrari'),
('Fiat'),
('Ford'),
('Genesis'),
('GMC'),
('Honda'),
('Hummer'),
('Hyundai'),
('Infiniti'),
('Jaguar'),
('Jeep'),
('Kia'),
('Koenigsegg'),
('Lamborghini'),
('Land Rover'),
('Lexus'),
('Lincoln'),
('Lotus'),
('Maserati'),
('Mazda'),
('McLaren'),
('Mercedes-Benz'),
('Mini'),
('Mitsubishi'),
('Nissan'),
('Pagani'),
('Porsche'),
('Ram'),
('Renault'),
('Rolls-Royce'),
('Saab'),
('Subaru'),
('Suzuki'),
('Tesla'),
('Toyota'),
('Volkswagen'),
('Volvo');

SELECT * FROM make;

CREATE TABLE model (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    make_id INT NOT NULL,
    FOREIGN KEY (make_id) REFERENCES make(id)
);

-- Acura models
INSERT INTO model (name, make_id)
VALUES
    ('MDX', 1),  
    ('RDX', 1),
    ('TLX', 1);

-- Alfa Romeo models
INSERT INTO model (name, make_id)
VALUES
    ('Giulia', 2), 
    ('Stelvio', 2),
    ('4C', 2);

-- Aston Martin models
INSERT INTO model (name, make_id)
VALUES
    ('DB11', 3),  
    ('Vantage', 3),
    ('DBS Superleggera', 3);

SELECT * FROM model;

ALTER TABLE cars
DROP COLUMN make,
DROP COLUMN model;

ALTER TABLE cars
ADD COLUMN make_id INT NOT NULL,
ADD COLUMN model_id INT NOT NULL,
ADD FOREIGN KEY (make_id) REFERENCES make(id),
ADD FOREIGN KEY (model_id) REFERENCES model(id);

SELECT * FROM cars;