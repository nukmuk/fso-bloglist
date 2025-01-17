import axios from "axios";
const baseUrl = "/api/blogs";

const configFromUser = (user) => {
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = async (newBlog, user) => {
  const config = configFromUser(user);
  const response = await axios.post(baseUrl, newBlog, config);
  return { ...response.data, user };
};

const like = async (blogId) => {
  const blogToLike = await get(blogId);
  if (!blogToLike) return console.error(`blog ${blogId} to like not found`);
  const beforeLikes = blogToLike.likes;
  const response2 = await axios.patch(`${baseUrl}/${blogId}`, {
    likes: beforeLikes + 1,
  });
  return response2.data;
};

const remove = async (blogId, user) => {
  const config = configFromUser(user);
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response;
};

const comment = async (blogId, comment) => {
  const res = await axios.post(`${baseUrl}/${blogId}/comments`, {
    content: comment,
  });
  return res.data;
};

export default { getAll, get, create, like, remove, comment };
