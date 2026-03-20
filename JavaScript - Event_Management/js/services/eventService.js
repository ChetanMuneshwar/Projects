const BASE_URL = "http://localhost:3000/events"

export const getEvents = async () => {
    const res = await fetch(BASE_URL)
    return await res.json()
}

export const addEvent = async (event) => {
    await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    })
}

export const updateEvent = async (event) => {
    await fetch(`${BASE_URL}/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    })
}

export const deleteEvent = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
}