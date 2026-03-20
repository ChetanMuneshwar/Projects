$(document).ready(function () {
    show();
});

function show() {
    let html = "";

    patients.forEach((p, i) => {
        html += `
        <tr>
        <td>${p.name}</td>
        <td>${p.phone}</td>
        <td>
        <button onclick="del(${i})" class="btn btn-danger btn-sm">Delete</button>
        </td>
        </tr>`;
    });

    $("#table").html(html);
}

function savePatient() {
    let name = $("#name").val();
    let phone = $("#phone").val();

    if (!name || !phone) {
        alert("Fill all fields");
        return;
    }

    patients.push({ name, phone });
    savePatients();
    show();

    $("#name").val("");
    $("#phone").val("");
}

function del(i) {
    patients.splice(i, 1);
    savePatients();
    show();
}