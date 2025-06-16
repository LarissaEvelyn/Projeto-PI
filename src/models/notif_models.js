// ✅ notif_models.js
import { v4 as uuidv4 } from 'uuid';
import { notifications } from '../database/data.js';

function create({ text, photo = 'person.jpeg', unread = true }) {
  if (!text) throw new Error('Texto da notificação é obrigatório');

  const nova = {
    id: uuidv4(),
    text,
    photo,
    unread,
    createdAt: Date.now(),
  };

  notifications.push(nova);
  return nova;
}

function read(campo, valor) {
  if (!campo || !valor) return notifications;
  return notifications.filter(n => n[campo]?.includes(valor));
}

function readById(id) {
  const n = notifications.find(n => n.id === id);
  if (!n) throw new Error('Notificação não encontrada');
  return n;
}

function update({ id, ...dados }) {
  const index = notifications.findIndex(n => n.id === id);
  if (index === -1) throw new Error('Notificação não encontrada');

  notifications[index] = { ...notifications[index], ...dados };
  return notifications[index];
}

function remove(id) {
  const index = notifications.findIndex(n => n.id === id);
  if (index === -1) throw new Error('Notificação não encontrada');
  notifications.splice(index, 1);
}

export default { create, read, readById, update, remove };


