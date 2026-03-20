export default class Event {
    constructor({ id = null, title, description, date, location, capacity, availableSeats = capacity }) {
        this.id = id
        this.title = title
        this.description = description
        this.date = date
        this.location = location
        this.capacity = capacity
        this.availableSeats = availableSeats
    }

    validate() {
        if (!this.title) throw new Error("Title is required")
        if (!this.location) throw new Error("Location is required")
        if (new Date(this.date) < new Date()) throw new Error("Date cannot be past")
        if (this.capacity <= 0) throw new Error("Capacity must be positive")
    }

    decreaseSeat() {
        if (this.availableSeats <= 0) throw new Error("No seats available")
        this.availableSeats--
    }
}