//const BASE_URL = "http://localhost:5000/api";
const BASE_URL = import.meta.env.VITE_API_URL;


export const fetchTodos = async (page = 1, search = "", filter = "ALL") => {
    const token = localStorage.getItem("token");
    //console.log(search, filter)
    const res = await fetch(`${BASE_URL}/todos/?page=${page}&limit=5&search=${search}&filter=${filter}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
};
export const getFavoriteTodosAPI = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/todos/favorite`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
};
export const getCategoriesAPI = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/todos/category`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data.data;
};
export const createTodoAPI = async (title, description, categoryId) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
        body: JSON.stringify({ title, description, categoryId }),
    });

    const data = await res.json();
    return data.data;
};
export const createCategoryAPI = async (name) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/todos/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
        body: JSON.stringify({ name }),
    });
    const data = await res.json();
    return data.data;
};
export const updateStatusAPI = async (id, status) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/todos/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
        body: JSON.stringify({ status }),
    });
};
export const updateFavoriteAPI = async (id, is_favorite) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/todos/${id}/favorite`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
        body: JSON.stringify({ is_favorite }),
    });
};

export const updateTodoAPI = async (id, title) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
        body: JSON.stringify({ title }),
    });
};

export const deleteTodoAPI = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
    });

};

export const bulkDeleteAPI = async (ids) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/todos/bulk`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" ,"Authorization": `Bearer ${token}`},
        body: JSON.stringify({ ids }),
    });
};

//***
// Auth APIs
//***

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

