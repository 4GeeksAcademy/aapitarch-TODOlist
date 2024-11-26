const API_URL = "https://playground.4geeks.com/todo/users/aapitarch";

export const getTasks = async () => {
    try {
        const resp = await fetch(API_URL);
        if(!resp.ok) throw new Error("Error al obtener las tareas");
        return await resp.json();
    } catch (err) {
        console.error("Error", err);
        return [];
    }
};

export const addTask = async (task) => {
    try {
        const resp = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if(!resp.ok) throw new Error("Error al añadir tarea");
        return await resp.json();
    } catch (err) {
        console.error("Error", err);
        return null;
    }
};

export const updateTask = async (task) => {
    try {
        const resp = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        if(!resp.ok) throw new Error("Error al actualizar tarea");
        return await resp.json();
    } catch (err) {
        console.error("Error", err);
        return null;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const resp = await fetch(API_URL, {
            method: "DELETE",
        });

        if(!resp.ok) throw new Error("Error al eliminat tarea");
        return await resp.json();
    } catch (err) {
        console.error("Error", err);
        return null;
    }
};

