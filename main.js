$(document).ready(function () {
  var user_id, opcion;
  opcion = 4;

  tablaCaracteristicas = $('#tablaCaracteristicas').DataTable({
    "ajax": {
      "url": "bd/crud.php",
      "method": 'POST', //usamos el metodo POST
      "data": { opcion: opcion }, //enviamos opcion 4 para que haga un SELECT
      "dataSrc": ""
    },
    "columns": [
      { "data": "id_empresa" },
      { "data": "categoria" },
      { "data": "descripcion" },
      { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar'><i class='material-icons'>delete</i></button></div></div>" }
    ]
  });

  //para limpiar los campos antes de dar de Alta una Persona
  $("#btnNuevo").click(function () {
    opcion = 1; //alta           
    id_empresa = null;
    $("#formUsuarios").trigger("reset");
    $(".modal-header").css("background-color", "#17a2b8");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Alta de Usuario");
    $('#modalCRUD').modal('show');
  });

  //Editar        
  $(document).on("click", ".btnEditar", function () {
    opcion = 2;//editar
    fila = $(this).closest("tr");
    id_empresa = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
    tamaño = fila.find('td:eq(1)').text();
    color = fila.find('td:eq(2)').text();
    peso = fila.find('td:eq(3)').text();
    especificacion = fila.find('td:eq(4)').text();
    $("#username").val(username);
    $("#tamaño").val(first_name);
    $("#color").val(last_name);
    $("#peso").val(gender);
    $("#especificacion").val(password);
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Usuario");
    $('#modalCRUD').modal('show');
  });

  //Borrar
  $(document).on("click", ".btnBorrar", function () {
    fila = $(this);
    user_id = parseInt($(this).closest('tr').find('td:eq(0)').text());
    opcion = 3; //eliminar        
    var respuesta = confirm("¿Está seguro de borrar el registro " + user_id + "?");
    if (respuesta) {
      $.ajax({
        url: "bd/crud.php",
        type: "POST",
        datatype: "json",
        data: { opcion: opcion, id_empresa: id_empresa },
        success: function () {
          tablaCaracteristicas.row(fila.parents('tr')).remove().draw();
        }
      });
    }
  });

});    