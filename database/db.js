const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Games',
    password: 'Messi10*',
    port: 5432
});


pool.connect()
.then(() => console.log('Conectado ao postgre'))
.catch(err => console.error('Erro na conexão'))

module.exports = pool