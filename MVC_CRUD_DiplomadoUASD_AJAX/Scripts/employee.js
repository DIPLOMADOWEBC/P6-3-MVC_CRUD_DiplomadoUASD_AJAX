//Carga datos en la tabla cuandom mlos documentos esten listo
$(document).ready(function (){
    loadData();
});
//Función cargar datos
function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.EmpleadoID + '</td>';
                html += '<td>' + item.Nombres + '</td>';
                html += '<td>' + item.Apellidos + '</td>';
                html += '<td>' + item.Edad + '</td>';
                html += '<td>' + item.Estado_Civil + '</td>';
                html += '<td>' + item.Pais + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.EmpleadoID + ')">Edit</a> | <a href="#" onclick="Delete(' + item.EmpleadoID + ')">Delete</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessEdad) {
            alert(errormessEdad.responseText);
        }
    });
}

//funcion agregar datos
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmpleadoID: $('#EmpleadoID').val(),
        Nombres: $('#Nombres').val(),
        Apellidos: $('#Apellidos').val(),
        Edad: $('#Edad').val(),
        Estado_Civil: $('#Estado_Civil').val(),
        Pais: $('#Pais').val()
    };
    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessEdad) {
            alert(errormessEdad.responseText);
        }
    });
}


//Funcion para obtener los datos basados en el ID del empleado
function getbyID(EmpID) {
    $('#Nombres').css('border-color', 'lightgrey');
    $('#Edad').css('border-color', 'lightgrey');
    $('#Estado_Civil').css('border-color', 'lightgrey');
    $('#Pais').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/getbyID/" + EmpID,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#EmpleadoID').val(result.EmpleadoID);
            $('#Nombres').val(result.Nombres);
            $('#Apellidos').val(result.Apellidos);
            $('#Edad').val(result.Edad);
            $('#Estado_Civil').val(result.Estado_Civil);
            $('#Pais').val(result.Pais);
            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessEdad) {
            alert(errormessEdad.responseText);
        }
    });
    return false;
}

//funcion para actualizar un registro del empleado
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        EmpleadoID: $('#EmpleadoID').val(),
        Nombres: $('#Nombres').val(),
        Apellidos: $('#Apellidos').val(),
        Edad: $('#Edad').val(),
        Estado_Civil: $('#Estado_Civil').val(),
        Pais: $('#Pais').val(),
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#EmpleadoID').val("");
            $('#Nombres').val("");
            $('#Apellidos').val("");
            $('#Edad').val("");
            $('#Estado_Civil').val("");
            $('#Pais').val("");
        },
        error: function (errormessEdad) {
            alert(errormessEdad.responseText);
        }
    });
}

function Delete(ID) {
    var ans = confirm("¿Está seguro de que desea eliminar este registro?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessEdad) {
                alert(errormessEdad.responseText);
            }
        });
    }
}

//Funcion para limpiar los objetos textboxes
function clearTextBox() {
    $('#EmpleadoID').val("");
    $('#Nombres').val("");
    $('#Apellidos').val("");
    $('#Edad').val("");
    $('#Estado_Civil').val("");
    $('#Pais').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nombres').css('border-color', 'lightgrey');
    $('#Edad').css('border-color', 'lightgrey');
    $('#Estado_Civil').css('border-color', 'lightgrey');
    $('#Pais').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#Nombres').val().trim() == "") {
        $('#Nombres').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nombres').css('border-color', 'lightgrey');
    }
    if ($('#Apellidos').val().trim() == "") {
        $('#Apellidos').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Apellidos').css('border-color', 'lightgrey');
    }
    if ($('#Edad').val().trim() == "") {
        $('#Edad').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Edad').css('border-color', 'lightgrey');
    }
    if ($('#Estado_Civil').val().trim() == "") {
        $('#Estado_Civil').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Estado_Civil').css('border-color', 'Red');
    }
    if ($('#Pais').val().trim() == "") {
        $('#Pais').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Pais').css('border-color', 'lightgrey');
    }
    return isValid;
}
