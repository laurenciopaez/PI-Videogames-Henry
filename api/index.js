//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || 3001; //Defino el puerto del servidor
// Syncing all the models at once.
conn.sync({ force: true }).then(() => { //Force: true esto hace que se borre la base de datos porque se reestablecen las configuraciones
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    conn.afterSync({froce: true}) //genera sincronizacion con base de datos
  });
});
