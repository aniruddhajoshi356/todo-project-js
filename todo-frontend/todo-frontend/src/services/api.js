const BASE_URL = "http://localhost:5000/api/todos";

export const fetchTodos = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data.data;
};

export const createTodoAPI = async (title, description) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
    });

    const data = await res.json();
    return data.data;
};

export const updateStatusAPI = async (id, status) => {
    await fetch(`${BASE_URL}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });
};

export const deleteTodoAPI = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
};
