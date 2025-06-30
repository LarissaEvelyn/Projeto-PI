// ✅ post_models.js
import { posts } from '../database/database.js';

function create({ author, content }) {
  if (!author || !content) {
    throw new Error('Autor e conteúdo são obrigatórios');
  }

  const newPost = {
    id: uuidv4(),
    author,
    content,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
  };

  posts.unshift(newPost);
  return newPost;
}

function read() {
  return posts;
}

function like(id) {
  const post = posts.find(p => p.id === id);
  if (!post) throw new Error('Post não encontrado');
  post.likes += 1;
  return post;
}

export default { create, read, like };
