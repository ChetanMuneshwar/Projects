const BASE_URL = "http://localhost:3000/registrations"

export const addRegistration = async (data) => {
    await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
}

export const getRegistrations = async () => {
    const res = await fetch(BASE_URL)
    return await res.json()
}