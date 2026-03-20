$(document).ready(function () {
    showDoctors();
});

// SHOW DOCTORS
function showDoctors() {
    let html = "";

    doctors.forEach((d, i) => {
        html += `
        <tr>
            <td>${d.name}</td>
            <td>${d.spec}</td>
            <td>
                <button onclick="deleteDoctor(${i})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
    });

    $("#table").html(html);
}

// SAVE DOCTOR
function saveDoctor() {
    let name = $("#name").val();
    let spec = $("#spec").val();

    // VALIDATION
    if (!name) {
        alert("Please enter doctor name");
        return;
    }

    doctors.push({ name, spec });

    saveDoctors();
    showDoctors();

    // CLEAR INPUTS
    $("#name").val("");
    $("#spec").val("Cardiology");

    // CLOSE MODAL
    let modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
    modal.hide();
}

// DELETE DOCTOR
function deleteDoctor(i) {
    if (confirm("Are you sure?")) {
        doctors.splice(i, 1);
        saveDoctors();
        showDoctors();
    }
}