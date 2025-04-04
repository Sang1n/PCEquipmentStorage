let typesDict = [];
let popup;
let form;
let API_BASE = "";

fetch("config.json")
  .then(response => response.json())
  .then(config => {
    API_BASE = config.apiBase;
    startApp();
  })
  .catch(err => {
    console.error("Не удалось загрузить config.json:", err);
  });

function startApp() {
  $(function () {
    loadTypes().then(() => {
      createGrid();
      createPopup();
    });
  });
}

function loadTypes() {
  return $.get(`${API_BASE}/equipment/types`).then(data => {
    typesDict = data.map(type => ({
      id: type.id,
      name: type.name
    }));
  });
}

function createGrid() {
  $("#grid").dxDataGrid({
    dataSource: `${API_BASE}/equipment`,
    columns: [
      { dataField: "inventoryNumber", caption: "Учетный номер" },
      {
        dataField: "typeId",
        caption: "Тип техники",
        lookup: {
          dataSource: typesDict,
          valueExpr: "id",
          displayExpr: "name"
        }
      },
      { dataField: "name", caption: "Наименование" },
      { dataField: "room", caption: "Комната" },
      {
        type: "buttons",
        buttons: [{
          hint: "Редактировать",
          icon: "edit",
          onClick: function (e) {
            showPopup(e.row.data);
          }
        }]
      }
    ],
    sorting: { mode: "multiple" },
    editing: { allowUpdating: false },
    showBorders: true,
    headerFilter: { visible: true },
    filterRow: { visible: true },
    toolbar: {
      items: [{
        location: "after",
        widget: "dxButton",
        options: {
          text: "Добавить",
          icon: "plus",
          onClick: () => showPopup()
        }
      }]
    },
    onRowDblClick: function (e) {
      showPopup(e.data);
    }
  });
}

function createPopup() {
  popup = $("#popup").dxPopup({
    title: "Техника",
    visible: false,
    width: 500,
    height: "auto",
    showCloseButton: true,
    contentTemplate: function () {
      return $("<div>").append($("<div id='popupForm'>"));
    },
    toolbarItems: [{
      toolbar: "bottom",
      location: "after",
      widget: "dxButton",
      options: {
        text: "Сохранить",
        type: "success",
        onClick: saveForm
      }
    }]
  }).dxPopup("instance");
}

function showPopup(data = {}) {
  form = $("#popupForm").dxForm({
    formData: data,
    labelLocation: "top",
    items: [
      {
        dataField: "inventoryNumber",
        label: { text: "Учетный номер" },
        validationRules: [{ type: "required" }]
      },
      {
        dataField: "name",
        label: { text: "Наименование" },
        validationRules: [{ type: "required" }]
      },
      {
        dataField: "typeId",
        label: { text: "Тип техники" },
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: typesDict,
          valueExpr: "id",
          displayExpr: "name"
        },
        validationRules: [{ type: "required" }]
      },
      {
        dataField: "room",
        label: { text: "Комната" },
        editorType: "dxNumberBox",
        editorOptions: {
          min: 1,
          max: 1000
        },
        validationRules: [{ type: "required" }]
      }
    ]
  }).dxForm("instance");

  popup.show();
}

function saveForm() {
  const data = form.option("formData");

  const isNew = !data.id;
  const method = isNew ? "POST" : "PUT";
  const url = isNew
    ? `${API_BASE}/equipment`
    : `${API_BASE}/equipment/${data.id}`;

  $.ajax({
    url: url,
    method: method,
    contentType: "application/json",
    data: JSON.stringify(data)
  }).done(() => {
    popup.hide();
    $("#grid").dxDataGrid("instance").refresh();
  });
}
