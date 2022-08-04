create table transacciones (
	ruta varchar(100) primary key not null,
	path varchar(255) not null
);
    
create table rol (
	id int primary key not null,
	nombre varchar(100) not null,
	vota boolean default false,
	tiemposesion int not null
);

create table usuario(
	id int unique primary key,
	username varchar(100) not null,
	nombre varchar(100) not null,
	apellido varchar(100) not null,
	cedula varchar(10) unique not null,
	password varchar(255) not null,
	email varchar(200) unique not null,
	activo boolean default null,
	rol int not null,
	sufrago boolean default false,
	estudiante boolean default null,
	createdat timestamp without time zone default null,
    updatedat timestamp without time zone default null,
	foreign key (rol) references rol(id)
);

create table proceso_electoral(
	id serial primary key,
	fec_eleccion Date unique not null,
	semestre varchar(255) not null,
	descripcion varchar(255) not null,
	hora_inicio Time without time zone not null,
	hora_final Time without time zone not null,
	estado boolean default true
);

create table lista_electoral(
	id serial primary key,
	nom_lista varchar(100) unique not null,
	descripcion varchar(255) not null,
	logo varchar(200), 
	estado boolean default true,
	id_proceso int not null,
	contenido text default null,
	foreign key (id_proceso) references proceso_electoral(id)
);

create table candidatos(
	id serial primary key,
	nombre varchar(100) not null,
	apellido varchar(100) not null,
	cargo varchar(255) not null,
	id_lista int not null,
	foreign key (id_lista) references lista_electoral (id)
);

create table menu(
	id serial primary key not null,
	id_rol int not null,
	cruta varchar(100) null,
	id_padre int null,
	nombre varchar(100) not null,
	icon varchar(50) null,
	crear boolean default false,
	editar boolean default false,
	eliminar boolean default false,
	mostrarmenu boolean default true,
	foreign key (id_rol) references rol(id),
	foreign key (cruta) references transacciones(ruta),
	foreign key (id_padre) references menu(id)
);

create table parametros(
	id serial primary key,
	nombre varchar(100) not null,
	texto varchar(100) not null
)