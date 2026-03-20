import { loadEvents, handleEventForm } from "./controllers/eventController.js"
import { handleRegistration } from "./controllers/registrationController.js"

document.addEventListener("DOMContentLoaded", () => {
    loadEvents()
    handleEventForm()
    handleRegistration()
})