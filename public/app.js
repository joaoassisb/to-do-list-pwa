function RedirectIfUserExists() {
  const user = localStorage.getItem("user");

  if (user) {
    window.location = "./tarefas.html";
  }
}

function addUserName() {
  const user = $("#nome").val();

  if (!user) {
    const erro = $("#erro");
    erro.html("É necessário preencher um nome válido para prosseguir");

    setTimeout(() => erro.empty(), 5000);
    return;
  }

  localStorage.setItem("user", user);

  window.location = "./tarefas.html";
}

function UserName() {
  const usuario = localStorage.getItem("user");

  if (!usuario) {
    window.location.href = "./index.html";
  } else {
    $("#UserName").html(usuario);
  }
}

function ToggleStatus(index) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas"));
  const newTarefas = tarefas.map(function (tarefa, i) {
    if (i === index) {
      tarefa.checked = !tarefa.checked;
    }
    return tarefa;
  });

  localStorage.setItem("tarefas", JSON.stringify(newTarefas));

  LoadTask();
}

function LoadTask() {
  $(".collection").empty();
  $("#message").remove();
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  if (tarefas.length == 0) {
    $(".container").append('<i id="message">Nenhuma tarefa criada</i>');
  } else {
    for (i = 0; i < tarefas.length; i++) {
      $(".collection").append(`
              <li class="collection-item">
                  <label>
                      <input type="checkbox" onchange="ToggleStatus(${i})" ${
        tarefas[i].checked ? "checked" : ""
        } />
                      <span ${
        tarefas[i].checked
          ? 'style="text-decoration: line-through;"'
          : ""
        }>${tarefas[i].label}</span>
                      
                  </label>
                  <i class="small material-icons right red-text" onclick="DeleteTask(${i})">delete</i>
              </li>`);
    }
  }
}

function AddTaskDefault() {
  $(".collection").append(`
        <li class="collection-item new-item">
                <div class="row" style="margin:0;padding:0">
                    <div class="col s10"  style="margin:0;padding:0">
                        <div class="input-field" style="margin:0;padding:0">
                            <input type="text" placeholder ="Nova tarefa">
                            
                        </div>
                    </div>
                    <div class="col s2">
                    <br/>
                        <i class="small material-icons teal-text " onclick="SaveTask(this)">save</i>
                    </div>
                </div>
        </li>`);
}
function AddTask() {
  if ($(".new-item").length >= 1) {
    $("input[type=text]").focus();
    return false;
  } else {
    AddTaskDefault();
  }
}

function SearchTask(task) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  for (i = 0; i < tarefas.length; i++) {
    if (tarefas[i].label == task) {
      return true;
    }
  }
  return false;
}
function SaveTask(ref) {
  $("#message").remove();

  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  $task = $(ref)
    .parent()
    .parent()
    .find("input")
    .val();

  if ($task == "") {
    $(".container").append(
      '<i id="message" class="red-text">Informe o nome da tarefa</i>'
    );

    $(ref)
      .parent()
      .parent()
      .find("input")
      .focus();
    return false;
  } else if (SearchTask($task) == true) {
    $("input[type=text]").select();
    $("input[type=text]").focus();
    $(".container").append(
      '<i id="message" class="red-text">Tarefa já adicionada a lista!</i>'
    );
  } else {
    tarefas.push({
      label: $task,
      checked: false
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    LoadTask();
  }
}

function DeleteTask(index) {
  const tarefas = JSON.parse(localStorage.getItem("tarefas"));

  tarefas.splice(index, 1);

  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  LoadTask();
}
