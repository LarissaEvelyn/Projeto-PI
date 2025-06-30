import { resolve } from 'node:path';
import { Database } from 'sqlite-async';
export const investments = [];
export const perfis = [];
export const posts = [];
export const notifications = [];

 
const dbFile = resolve('src', 'database', 'db.sqlite');
 
async function connect() {
  return await Database.open(dbFile);
}
 
export default { connect };
 