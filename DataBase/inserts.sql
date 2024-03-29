----------------------- INSERT ROLES --------------------------
INSERT INTO rol (id, nombre, vota, tiemposesion) VALUES (1, 'PERSONAL ADMINISTRATIVO', false, 86400);
INSERT INTO rol (id, nombre, vota, tiemposesion) VALUES (2, 'ESTUDIANTE', true, 300);
INSERT INTO rol (id, nombre, vota, tiemposesion) VALUES (3, 'SUPER ADMINISTRADOR', false, 3600);
INSERT INTO rol (id, nombre, vota, tiemposesion) VALUES (4, 'PROFESOR DE CONTRATO', false, 3600);
INSERT INTO rol (id, nombre, vota, tiemposesion) VALUES (5, 'PROFESOR DE NOMBRAMIENTO', true, 7200);


---------------------- INSERT TRANSACCIONES ---------------------
INSERT INTO transacciones (ruta, path) VALUES ('votos-live', 'src/app/pages/admin/estadistica/estadistica.module');
INSERT INTO transacciones (ruta, path) VALUES ('estudiantes', 'src/app/pages/admin/estudiantes/estudiantes.module');
INSERT INTO transacciones (ruta, path) VALUES ('proceso-electoral', 'src/app/pages/admin/proceso-electoral/proceso-electoral.module');
INSERT INTO transacciones (ruta, path) VALUES ('home-estudiante', 'src/app/pages/estudiante/principal-estudiante/principal-estudiante.module');
INSERT INTO transacciones (ruta, path) VALUES ('listas/:id', 'src/app/pages/admin/listas/listas.module');
INSERT INTO transacciones (ruta, path) VALUES ('candidatos/:id', 'src/app/pages/admin/candidatos/candidatos.module');
INSERT INTO transacciones (ruta, path) VALUES ('opcionesmenu', 'src/app/pages/admin/seguridad/opcionesmenu/opcionesmenu.module');
INSERT INTO transacciones (ruta, path) VALUES ('roles', 'src/app/pages/admin/seguridad/roles/roles.module');
INSERT INTO transacciones (ruta, path) VALUES ('transacciones', 'src/app/pages/admin/seguridad/transacciones/transacciones.module');


---------------------- INSERTS MENU ------------------------
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (1, 1, null, null, 'ADMINISTRACIÓN', 'dashboard', false, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (3, 3, null, null, 'ADMINISTRACIÓN', 'dashboard', false, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (5, 2, null, null, 'ESTUDIANTE', 'account_circle', true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (6, 2, 'home-estudiante', 5, 'REGISTRA VOTO', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (10, 1, null, null, 'SEGURIDAD', 'dashboard', false, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (8, 1, 'listas/:id', 1, 'LISTAS ID', null, true, false, false, false);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (9, 1, 'candidatos/:id', 1, 'CANDIDATOS ID', null, true, false, false, false);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (15, 3, 'votos-live', 3, 'VER VOTOS', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (17, 3, 'estudiantes', 3, 'ESTUDIANTES', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (18, 3, 'opcionesmenu', 16, 'MENÚ', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (19, 3, 'roles', 16, 'ROLES', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (20, 3, 'transacciones', 16, 'TRANSACIONES', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (16, 3, null, null, 'SEGURIDAD', 'dashboard', true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (21, 3, 'listas/:id', 3, 'LISTAS ID', null, true, true, true, false);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (12, 1, 'opcionesmenu', 10, 'MENÚ', null, true, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (13, 1, 'roles', 10, 'ROLES', null, true, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (14, 1, 'transacciones', 10, 'TRANSACIONES', null, true, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (2, 1, 'proceso-electoral', 1, 'PROCESO ELECTORAL', null, true, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (7, 1, 'votos-live', 1, 'VER VOTOS', null, true, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (4, 3, 'proceso-electoral', 3, 'PROCESO ELECTORAL', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (22, 3, 'candidatos/:id', 3, 'CANDIDATOS ID', null, true, true, true, false);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (11, 1, 'estudiantes', 1, 'ESTUDIANTES', null, false, true, true, true);


INSERT INTO usuario (id, username, nombre, apellido, cedula, password, email, activo, rol, sufrago, estudiante, createdat, updatedat) VALUES (1, 'lambo', 'kevin', 'curay', '0503908857', '132cb17c0f58421f03ca12f6770de0258f36ac31dcc082b6af9d4dfe4224e385', 'kevin.curay@epn.edu.ec', true, 1, false, null, null, null);
INSERT INTO usuario (id, username, nombre, apellido, cedula, password, email, activo, rol, sufrago, estudiante, createdat, updatedat) VALUES (2, 'pacog', 'paco', 'gomez', '0503902455', '95c9f6244daf04aed0b8ae294e0372843e643cc28ddab1e936373c68543d8cc6', 'paco.gomez@epn.edu.ec', true, 2, false, true, null, null);
INSERT INTO usuario (id, username, nombre, apellido, cedula, password, email, activo, rol, sufrago, estudiante, createdat, updatedat) VALUES (3, 'SuperAdmin', 'SUPER', 'ADMIN', '9999999999', '41e5653fc7aeb894026d6bb7b2db7f65902b454945fa8fd65a6327047b5277fb', 'admin@epn.edu.ec', true, 3, false, false, null, null);

INSERT INTO proceso_electoral (id, descripcion, estado, semestre, fec_eleccion, hora_inicio, hora_final) VALUES (1, 'Consejo de la esfot 2022', true, '2022B', '2022-08-04', '08:00:00', '17:00:00');

INSERT INTO parametros (id, nombre, texto) VALUES (1, 'servicio', 'https://app-eep.vercel.app/recuperar');