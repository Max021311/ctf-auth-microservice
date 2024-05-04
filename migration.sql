--Tabla de Productos
create table productos(
	codigo serial,
	nombre text,
	precio decimal (11,2),
	primary key(codigo)
);

--Tabla de Rutas
create table rutas(
	codigo serial,
	nombre text,
	primary key(codigo)
);

--Table de Materiales
create table materiales(
	codigo serial,
	nombre text,
	cantidad integer,
	primary key(codigo)
);

--Tabla de Puestos de Venta
create table puestos_de_venta(
	codigo serial,
	codigo_ruta integer references rutas(codigo),
	numero_exterior text,
	numero_interior text,
	colonia text,
	calle text,
	codigo_postal varchar (5) default null,
	primary key(codigo)
);

--Tabla de Puesto Laborales
create table puestos_laborales(
	codigo serial,
	nombre text not null,
	primary key (codigo)
);

--Tabla de Empleados
create table empleados(
  codigo serial,
	rfc varchar(13),
	nombre text not null,
	apellidos text not null,
  email text not null unique,
  password text not null,
	nss varchar(11),
	curp varchar(18) not null,
	fecha_nacimiento date not null,
	codigo_puesto_laboral integer references puestos_laborales(codigo) not null,
	sueldo integer not null,
	primary key(codigo)
);

--Tabla de Ventas
create table ventas(
	codigo serial,
	codigo_empleado INTEGER references empleados(codigo) null,
	codigo_ruta integer references rutas(codigo) not null,
	fecha date not null,
	primary key(codigo)
);

--Tabla de Bajas de Materiales
create table bajas_de_materiales(
	codigo_material integer references materiales(codigo),
	codigo_venta integer references ventas(codigo),
	cantidad integer,
	primary key(codigo_material, codigo_venta)
);

--Tabla de Entrada de Ventas
create table entrada_ventas(
	codigo_producto integer references productos(codigo),
	codigo_venta integer references ventas(codigo),
	cantidad integer,
	precio decimal(11,2),
	primary key(codigo_producto, codigo_venta)
);

--Tabla de Compra de materiales
create table compra_de_materiales(
	codigo serial,
	codigo_material integer references materiales(codigo),
	precio decimal(11,2),
	cantidad integer,
	fecha date,
	primary key(codigo)
);

CREATE OR REPLACE FUNCTION baja_de_material() RETURNS TRIGGER AS $$
BEGIN
	UPDATE materiales
	SET cantidad = cantidad - NEW.cantidad
	WHERE codigo = NEW.codigo_material;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER baja_de_material BEFORE INSERT ON bajas_de_materiales
FOR EACH ROW EXECUTE PROCEDURE baja_de_material();

CREATE OR REPLACE FUNCTION compra_de_material() RETURNS TRIGGER AS $$
BEGIN
	UPDATE materiales
	SET cantidad = cantidad + NEW.cantidad
	WHERE codigo = NEW.codigo_material;
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER compra_de_material BEFORE INSERT ON compra_de_materiales
FOR EACH ROW EXECUTE PROCEDURE compra_de_material();
