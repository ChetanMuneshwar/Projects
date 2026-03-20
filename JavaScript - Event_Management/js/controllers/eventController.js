import Event from "../models/Event.js"
import * as eventService from "../services/eventService.js"
import { validateEvent } from "../utils/validator.js"
import { showMessage } from "../utils/uiHelper.js"

export const loadEvents = async () => {
    const container = document.getElementById("eventList")
    if (!container) return
    try {
        const events = await eventService.getEvents()
        container.innerHTML = events.map(event => `
            <div class="col-md-4">
                <div class="card p-3 mb-3 shadow-sm">
                    <h5>${event.title}</h5>
                    <p>${event.description}</p>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Available Seats:</strong> ${event.availableSeats}</p>

                    <a href="register.html?eventId=${event.id}" 
                       class="btn btn-success btn-sm mb-2">
                       Register
                    </a>

                    <button class="btn btn-danger btn-sm delete-btn"
                            data-id="${event.id}">
                            Delete
                    </button>
                </div>
            </div>
        `).join("")

        // Attach delete event listeners properly (NO inline JS)
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async () => {

                const id = button.dataset.id

                try {
                    await eventService.deleteEvent(id)
                    showMessage("Event Deleted Successfully")
                    loadEvents()
                } catch (err) {
                    showMessage("Error deleting event", true)
                }

            })
        })

    } catch (err) {
        showMessage("Failed to load events", true)
    }
}

export const handleEventForm = () => {
    const form = document.getElementById("eventForm")
    if (!form) return
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        try {

            const titleInput = document.getElementById("title").value.trim()
            const descriptionInput = document.getElementById("description").value.trim()
            const dateInput = document.getElementById("date").value
            const locationInput = document.getElementById("location").value.trim()
            const capacityInput = Number(document.getElementById("capacity").value)

            const eventData = {
                title: titleInput,
                description: descriptionInput,
                date: dateInput,
                location: locationInput,
                capacity: capacityInput
            }

            validateEvent(eventData)
            const event = new Event(eventData)
            const { id, ...eventWithoutId } = event
            await eventService.addEvent(eventWithoutId)
            showMessage("Event Added Successfully")
            form.reset()

        } catch (err) {
            showMessage(err.message, true)
        }

    })
}