// ✅ seeders.js (corrigido)
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Post from '../models/post_models.js';
import Notification from '../models/notif_models.js';
import Perfil from '../models/perfil_models.js';

async function up() {
  const file = resolve('src', 'database', 'seeders.json');
  const seed = JSON.parse(readFileSync(file));

  if (Array.isArray(seed.posts)) {
    for (const post of seed.posts) {
      await Post.create(post);
    }
  }

  if (Array.isArray(seed.notifications)) {
    for (const notification of seed.notifications) {
      await Notification.create(notification);
    }
  }

  if (Array.isArray(seed.perfis)) {
    for (const perfil of seed.perfis) {
      await Perfil.create(perfil);
    }
  }
}

const Seed = { up };
export default Seed;
