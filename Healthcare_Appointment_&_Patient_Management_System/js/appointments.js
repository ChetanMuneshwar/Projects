$(document).ready(function () {
    loadDropdowns();
    showAppointments();
});

// LOAD DROPDOWNS
function loadDropdowns() {

    // Patient dropdown with placeholder
    let p = `<option value="" disabled selected>Select Patient</option>`;
    patients.forEach((x, i) => {
        p += `<option value="${i}">${x.name}</option>`;
    });
    $("#patient").html(p);

    // Doctor dropdown with placeholder
    let d = `<option value="" disabled selected>Select Doctor</option>`;
    doctors.forEach((x, i) => {
        d += `<option value="${i}">${x.name}</option>`;
    });
    $("#doctor").html(d);
}


// SAVE APPOINTMENT
function saveAppointment() {

    let p = $("#patient").val();
    let d = $("#doctor").val();
    let date = $("#date").val();
    let time = $("#time").val();

    // ✅ FULL VALIDATION
    if (!p || !d || !date || !time) {
        alert("Please fill all fields!");
        return;
    }

    // ✅ DUPLICATE CHECK (doctor + date + time)
    let exists = appointments.find(a =>
        a.doctorIndex == d && a.date === date && a.time === time
    );

    if (exists) {
        alert("Slot already booked!");
        return;
    }

    // ✅ SAVE
    appointments.push({
        patient: patients[p].name,
        doctor: doctors[d].name,
        doctorIndex: d,   // important
        date: date,
        time: time,
        status: "Booked"
    });

    saveAppointments();
    showAppointments();

    // ✅ RESET FORM
    $("#patient").val("");
    $("#doctor").val("");
    $("#date").val("");
    $("#time").val("");

    // ✅ CLOSE MODAL SAFELY
    let modalEl = document.getElementById('modal');
    let modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modal.hide();
}


// SHOW APPOINTMENTS
function showAppointments() {

    if (appointments.length === 0) {
        $("#table").html(`<tr><td colspan="6" class="text-center">No Appointments</td></tr>`);
        return;
    }

    let html = "";

    appointments.forEach((a, i) => {
        html += `
        <tr>
            <td>${a.patient}</td>
            <td>${a.doctor}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td><span class="badge bg-success">${a.status}</span></td>
            <td>
                <button onclick="deleteAppointment(${i})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
    });

    $("#table").html(html);
}


// DELETE
function deleteAppointment(i) {

    if (confirm("Are you sure?")) {
        appointments.splice(i, 1);
        saveAppointments();
        showAppointments();
    }
}