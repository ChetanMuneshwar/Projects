let patients = JSON.parse(localStorage.getItem("patients")) || [];
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

function savePatients() {
    localStorage.setItem("patients", JSON.stringify(patients));
}

function saveDoctors() {
    localStorage.setItem("doctors", JSON.stringify(doctors));
}

function saveAppointments() {
    localStorage.setItem("appointments", JSON.stringify(appointments));
}