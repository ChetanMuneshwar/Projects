export const validateEvent = ({ title, date, location, capacity }) => {

    if (!title || title.trim() === "")
        throw new Error("Title is required")

    if (!location || location.trim() === "")
        throw new Error("Location is required")

    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!date || selectedDate < today)
        throw new Error("Date cannot be in the past")

    if (!capacity || capacity <= 0)
        throw new Error("Capacity must be a positive number")
}



export const validateRegistration = ({ participantName, email, phone }) => {

    if (!participantName || participantName.trim() === "")
        throw new Error("Name is required")

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email))
        throw new Error("Invalid email format")

    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(phone))
        throw new Error("Phone must be exactly 10 digits")
}