
import Registration from "../models/Registration.js"
import * as registrationService from "../services/registrationService.js"
import * as eventService from "../services/eventService.js"
import { validateRegistration } from "../utils/validator.js"
import { showMessage } from "../utils/uiHelper.js"

export const handleRegistration = () => {
    const form = document.getElementById("registrationForm")
    if (!form) return
    const params = new URLSearchParams(window.location.search)
    const eventId = Number(params.get("eventId"))   // force number

    if (!eventId) {
        showMessage("Invalid Event ID", true)
        return
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        try {
            const participantName = document.getElementById("participantName").value.trim()
            const email = document.getElementById("email").value.trim()
            const phone = document.getElementById("phone").value.trim()
            const registrationData = {
                eventId,
                participantName,
                email,
                phone
            }

            validateRegistration(registrationData)
            const events = await eventService.getEvents()
            const event = events.find(e => Number(e.id) === Number(eventId))
            if (!event)
                throw new Error("Event not found")

            if (event.availableSeats <= 0)
                throw new Error("No seats available")
            event.availableSeats--
            await registrationService.addRegistration(registrationData)
            await eventService.updateEvent(event)
            showMessage("Registration Successful")
            form.reset()

        } catch (err) {
            showMessage(err.message, true)
        }

    })
}