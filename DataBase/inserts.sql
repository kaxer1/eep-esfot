----------------------- INSERT ROLES --------------------------
INSERT INTO rol (id, nombre) VALUES (1, 'ADMIN');
INSERT INTO rol (id, nombre) VALUES (2, 'ESTUDIANTE');
INSERT INTO rol (id, nombre) VALUES (3, 'SUPER ADMIN');


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
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (1, 1, null, null, 'ADMINISTRACION', 'dashboard', false, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (3, 3, null, null, 'ADMINISTRACION', 'dashboard', false, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (4, 3, 'proceso-electoral', 3, 'PROCESO ELECTORAL', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (5, 2, null, null, 'ESTUDIANTE', 'account_circle', true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (6, 2, 'home-estudiante', 5, 'PROCESO ELECTORAL', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (7, 1, 'votos-live', 1, 'VER VOTOS', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (10, 1, null, null, 'SEGURIDAD', 'dashboard', false, false, false, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (2, 1, 'proceso-electoral', 1, 'PROCESO ELECTORAL', null, false, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (8, 1, 'listas/:id', 1, 'LISTAS ID', null, false, false, false, false);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (9, 1, 'candidatos/:id', 1, 'CANDIDATOS ID', null, false, false, false, false);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (11, 1, 'estudiantes', 1, 'ESTUDIANTES', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (12, 1, 'opcionesmenu', 10, 'MENU', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (13, 1, 'roles', 10, 'ROLES', null, true, true, true, true);
INSERT INTO menu (id, id_rol, cruta, id_padre, nombre, icon, crear, editar, eliminar, mostrarmenu) VALUES (14, 1, 'transacciones', 10, 'TRANSACIONES', null, true, true, true, true);


INSERT INTO usuario (id, username, nombre, apellido, cedula, password, email, activo, rol, sufrago, estudiante, createdat, updatedat) VALUES (1, 'lambo', 'kevin', 'curay', '0503908857', 'f8a1d9cf3df31609b223416d6352457c', 'kevin.curay@epn.edu.ec', true, 1, false, null, null, null);
INSERT INTO usuario (id, username, nombre, apellido, cedula, password, email, activo, rol, sufrago, estudiante, createdat, updatedat) VALUES (2, 'pacog', 'paco', 'gomez', '0503902455', '7e58d63b60197ceb55a1c487989a3720', 'paco.gomez@epn.edu.ec', true, 2, false, true, null, null);
