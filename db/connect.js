import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});
