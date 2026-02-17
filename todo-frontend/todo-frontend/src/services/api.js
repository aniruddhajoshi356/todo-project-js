const BASE_URL = import.meta.env.TODO_API_URL;


export const fetchTodos = async (page = 1, search = "", filter = "ALL") => {
    //console.log(search, filter)
    const res = await fetch(`${BASE_URL}?page=${page}&limit=5&search=${search}&filter=${filter}`);
    const data = await res.json();
    return data;
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

export const updateTodoAPI = async (id, title) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
};

export const deleteTodoAPI = async (id) => {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
};

export const bulkDeleteAPI = async (ids) => {
    try {
    await fetch(`${BASE_URL}/bulk`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });
    } catch (error) {
        console.log("Error: ", error)
    }

};

