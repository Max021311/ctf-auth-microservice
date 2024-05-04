INSERT INTO ventas(rfc_empleado, codigo_ruta, fecha) values
('DIMM030911ER1', 1, 	'2022/04/13')
RETURNING codigo, rfc_empleado, codigo_ruta, fecha;

-- Inserta y dispara el trigger para dar de baja los materiales
INSERT INTO bajas_de_materiales (codigo_material, codigo_venta, cantidad)
values (1, 1, 5) RETURNING codigo_material, codigo_venta, cantidad;

-- Insert y dispara el trigger para dar de alta los materiales
INSERT INTO compra_de_materiales (codigo_material, cantidad, precio, fecha)
values (1, 5, 10, '2022/5/13') RETURNING codigo, codigo_material, precio, fecha;
