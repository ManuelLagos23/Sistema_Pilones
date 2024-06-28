2// Obtén la preferencia de idioma del almacenamiento local
let idiomaActual = localStorage.getItem('idioma') || 'ingles';

// Define los textos en inglés y español
const textos = {
    ingles: {
        titulo: 'Welcome',
        parrafo: 'This is a sample text in English.',
        boton: 'Cambiar idioma',
        home: 'Home',
temphumi: 'Temperature & humidity',
grafi: 'Graphics',
system: 'Server system',
pilones_list: 'Pilones list',
tasks_list: "Pilones tasks",
worker_list: "Employees",
temp_history: "Temperature history",
hum_history: "Humidity history",
temp_graphics_history: "Temperature graphics",
hum_graphics_history: "Humidity graphics",
moreoptions: "More options",
openFilterModal: "Filters",
language: "Language",
options: ' Task / Wetting options',
addnewarduino: "Add new arduino",
arduname: "Sensors name",
tempilo: 'Temperature',
piloname: "Pilón's name",
filtros: 'Filters',
title: 'Title',
connecpc: 'Connected to PC port',
arduopti: 'Options',
showardu: "Sensors name",
showport: 'PC port', 
showcolumns: 'Show/hide columns: ', 
namepi: "Pilón's name", 
saveTemps: 'Save a temperature', 
saveAllTemps:  'Save all temperatures', 
saveautomatic: "Automatically save every",
optionsinfo: 'See complete information',
savehours: "Hours",


//Traducción de la vista individual
humipilo:' Humidity', 
individualpilon:'Show pilones list', 
individualspan:' You are using the option to take the temperature of the pilones individually. Remember to always have enough charge in your Arduino, contact the ICT department if you experience any problem with your equipment.', 
individualname: "Pilón's name: ",
individualstage: "Pilón's tobacco stage: ",
individualweight: "Pilón's net weight: ",
individualminimum: "Pilón's minimum allowed temperature: ",
individualmaximum: "Pilón's maximum allowed temperature: ",
individualdate: "Pilón's entry date: ",
individualrelative: "Relative",
save_Temp_Hum:  "Save data",
individualproperty: "Pilón's propierty: ",



piloname: "Pilon's name",
pilonvariety:  "Tobacco variety",
pilonsource:  "Source",
pilonstage:  "Tobacco stage",
pilonmin:  "Min temperature",
pilonmax:  "Max temperature",
pilondate:  "Entry date",
pilonstate:  "State",
pilonoptions:  "Options",
showhide:  "Show/hide columns: ",
showname:  "Pilón's name",
showvariety:  "Tobacco variety",
showsource:  "Source",
showstage:  "Tobacco stage",
showdate:  "Entry date",
showstate:  "State",
tempdate:  "Reading date",
temptime:  "Reading time",
tempreadings:  "Temperature",
humidate:  "Reading date",
humitime:  "Reading time",
humireadings:  "Readings",
workersname: "Workers name",
workersoptions: "Options",






//Traducción del modal arduino

createArduinoModal:"Create new sensor",
arduinomodalname:"Arduino's name",
arduinomodalassigned: "Assigned pilón",
arduinomodalconnected: "connect to port",
arduinomodalsave: "Save new arduino",




//Traducción del modal pilón
pilonmodalname: "Pilón's name",
pilonmodalfarm: "Farm source",
pilonmodalvariety: "Tobacco variety",
pilonmodalcutting: "Tobacco cutting",
pilonmodalclass: "Tobacco class",
pilonmodalharvest: "Tobacco harvest",
pilonmodalstage: "Tobacco stage",
pilonmodaltype: "Tobacco type",
pilonmodalweight: "Tobacco net weight",
pilonmodalminimum: "Minimum accepted temperature",
pilonmodalmaximum: "Maximum accepted temperature",
pilonmodalstate: "Pilón's state",
createPilonButton: "Save new pilón",
pilontitle: " Add new pilón",





//Traducción del modal turning

turningneeds:"Pilón needs", 
turningperson:"Person in charge",
turningpilon: "Selected pilón",
turningpilonTem: "Temperature",
turningtask: "Task start date",
turningstart: "Task start time",
turningend: "Task end date",
turningendtime: "Task end time",

turningaddworker: "Add new worker",
createWorkerButton:"Save new worker",
turningselect:"Select an option",
turningoption:"Turning",
turningwetting:"Wetting",
turningcharge: "Select the person in charge",
personsWork:"Persons Working",

//traduccion del modal informacion sobre del pilon 




modalworkername: "Worker name",
workertitle: "Workers",
titleworker:" Agregar new worker",



//Colores

cardscolor:"Cards color meaning: ",
cardsred:"Very high temperature",
cardsblue: "Very low temperature",
cardsgreen: "Accepted temperature",
cardsyellow: "Static temperature",
cardselected: "Pilón selected",


exporthum: "Export to image",




titletasks: "Pilones tasks",

//Traducción de tareas de pilones
taskperson: "Person in charge",
taskpilon: "Pilón task",
taskworked: "Pilón worked",
tasktemp: "Pilón start temp",
taskdate: "Task start date",
tasktime: "Start task time",
datetask: "Task date",
taskend: "End task time",
taskoptions: "Options",


//Traducción de filtros
filtrooptions: "Pilón filters options",
filtroname: "Name A-Z",
namefiltro:"Name Z-A" ,
filtrofarm: "Farm A-Z",
farmfiltro:"Fsarm Z-A",
filtrovariety: "Variety A-Z",
varietyfiltro: "Variety Z-A",


//Modal de tareas

turningtitle: "Tasks / Wetting options",

//Modal de ver informacion del pilon
titleinfopilon: "Information about the pilon",
turningpilonSelec: "Pilón Selected",
turningpilonVar: "Variety",
turningpilonFinc:"Estate",
turningpilonEta:"Stage",
turningpilonTempMin:"Minimum temperature",
turningpilonTempMax:"Maximum temperature",
turningpilonPn:"Net weight",
turningpilonFech:"Date of admission",
turningpilonCor:"Court",
turningpilonCos:"Harvest",
turningpilonClass:"Class",
turningpilonTip:"type of tobacco",

//traducicion del formulario agregar un nuevo pilon

tituloAgregarPilon:"Add a new pilón",
nombre: "Pilón Name",
pilonmodalfinca: "Tobacco farm",
pilonmodalvariety: "Tobacco variety",
pilonmodalcorte: "Cut tobacco",
pilonmodalclase: "class tobacco",
pilonmodalharvest: "Tobacco harvest",
pilonmodaletapa: "tobacco stage",
pilonmodaltipo: "type of tobacco",
pilonmodalweight: "Tobacco net weight",
pilonmodalminimumnuevo: "Temperature minimum",
pilonmodalmaximumnuevo: "Temeperature maximum",
pilonmodalstate: "Pilón's state",

//traduccion de las cajas de texto y el select del formulario 

finc: "Select the property",
variety: "Select the variety",
seleccioneCorte: "Select the cut",
seleccioneClase: "Select the class",
eta: "Select the stage",
selectType: "Select the type",

//traduccion del boton del formulario

createPilonButton: "save new pilón",

// Traduccion del historial de temperatura

showdate: "Reading date",
showlectur: "Reading time",
showtemp: "Temperature",

//Traduccion de los botones de las tareas de los pilones
personaACargo: "Dependents",
tareaPilon: "Pilón task",
pilonTrabajado: "worked pilón",
tempInicioPilon: "Pilón start temperature",
fechaInicio: "Start date",
horaDeInicio: "Start time",
fechaFinalizada: "End date",
horaFinalizada: "End time",
opcionesTask: "Options",

// traduccion de los botones worker_list
nombreDeTrabajadores:"Name of workers",
opcionesWorkers:"Options",
workersname: "Workers name",
workersoptions: "Options",

// traduccion del las listas en el dashboard
listaArduinos: "arduino list",
listaSensores: "Lista de sensor list",
formularioPilon: "Add new pilón",
address: "Sensor direction",


titulopagesensor: "Sensors",

// traduccion del modal actualizar sensor 
editArduinoModalLabel: 'Update sensor',
arduinoNameEdit: 'Sensors name',
direccionSensor: 'Address',
sensorPilon: 'Sensors pilón',
connectA: 'Connect to',
updateArduinoButton: 'Save changes',

//Traduccion de editar pilon 
tituloActualizarPilon: "Update pilón",
editNombrePilon: "Pilon's name",
editFincaFarma: "farm source",
editVariedadPilon:"Tobacco variety",
editCortePilon:"Tobacco Cutting",
editClasePilon:"Tobacco class",
editCosechaPilon:"Tobacco harvest",
editEtapaPilon:"Tobacco stage",
editTipoPilon:"Tobacco type<",
editPNPilon:"Tobacco net weight",
editTempMinPilon:"Minimun accepted temperature",
editTempMaxPilon:"Maximum accepted temperature",
editEstadoPilon:"Pilon Staste",

//Traduccion de editar pilon 
titleUpdatePilon: "Update pilón",
editNombrePilon: "Pilon's name",

//traducion de editar tarea del pilon
numeroOrden: "Number of orden",

//traduccion del encabezado de sensor
sensOr: 'Sensors',



//ESPAÑOL
    },
    espanol: {
        titulo: 'Bienvenido',
        parrafo: 'Este es un texto de ejemplo en español.',
        boton: 'Change language',
        home: 'Inicio', 
temphumi: 'Temperatura y humedad',
grafi: 'Gráficos',
system: 'Sistema de servidores',
pilones_list: 'Lista de pilones',
tasks_list: "Tareas de pilones",
worker_list: "Empleados",
temp_history: "Datos de temperatura",
hum_history: "Historial de humedad",
temp_graphics_history: "Gráficos de temperatura",
hum_graphics_history: "Gráficos de humedad",
moreoptions: "Más opciones",
openFilterModal: "Filtros",
language: "Idioma",
options: "Tareas de virado/mojado",
arduname: "Nombre del arduino",
connecpc: 'Conectar al puerto de la pc',
arduopti: 'Opciones',
showardu: 'Nombre del sensor',
showport: ' Puerto de la pc', 
showcolumns: 'Mostrar/ocultar columnas: ', 
namepi: 'Nombre del pilón', 
saveTemps: 'Guardar una temperatura', 
saveAllTemps:  'Guardar todas las temperaturas', 
saveautomatic: "Guardar automáticamente cada",
savehours: "Horas",
optionsinfo: 'Ver informacion completa',
title: 'Inicio',


//Traduccion de página individual
tempilo: 'Temperatura',
humipilo:' Humedad', 
individualpilon:'Mostrar lista de pilones', 
individualspan:'Estás utilizando la opción de tomar la temperatura de los pilones individualmente. Recuerda tener siempre suficiente carga en tu Arduino, contacta con el departamento ICT si experimentas algún problema con tu equipo.', 
individualname: 'Nombre del pilón: ',
individualproperty: 'Propiedad de pilón: ',
individualstage: 'La etapa del tabaco:',
individualweight: 'Peso neto: ',
individualminimum: 'Temperatura mínima permitida:',
individualmaximum: 'Temperatura máxima permitida:',
individualdate: "Fecha de entrada de pilón: ",
individualrelative: "Relativa",
save_Temp_Hum:  "Guardar datos",

//Traduccion de página de pilones
piloname: "Nombre del pilón",
pilonvariety:  "Variedad de tabaco",
pilonsource:  "Fuente",
pilonstage:  "Etapa del tabaco",
pilonmin:  "Min temperatura",
pilonmax:  "Max temperatura",
pilondate:  "Fecha de entrada",
pilonstate:  "Estado",
pilonoptions:  "Opciones",
showhide:  "Mostrar/ocultar columnas: ",
showname:  "Nombre del pilón",
showvariety:  "Variedad de tabaco",
showsource:  "Estado",
showstage:  "Etapa del tabaco",
showdate:  "Fecha de entrada",
showstate:  "Estado",
tempdate:  "Fecha de lectura",
temptime:  "Tiempo de lectura",
tempreadings:  "Temperatura",
humidate:  "Fecha de epilonmodalvarietyntrada",
humitime:  "Tiempo de lectura",
humireadings:  "Lecturas",
workersname: "Nombre de los trabajadores",
workersoptions: "Opciones",

addnewarduino: " Agregar nuevo sensor",

pilonmodalharvest: "Cosecha de tabaco",
//Traducción del modal del arduino
createArduinoModal:"Crear nuevo sensor", 
arduinomodalname: "Nombre del sensor",
arduinomodalassigned: "Pilón asignado",
arduinomodalconnected: "Conectado al puerto",
arduinomodalsave: "Guardar nuevo arduino",

//Traducción del modal pilón
pilonmodalname: "Nombre del pilón",
pilonmodalfarm: "Fuente agrícola",
pilonmodalvariety: "Variedad de tabaco",
pilonmodalcutting: "Corte de tabaco",
pilonmodalclass: "Clase de tabaco",
pilonmodalharvest: "Cosecha de tabaco",
pilonmodalstage: "Etapa del tabaco",
pilonmodaltype: "Tipo de tabaco",
pilonmodalweight: "Peso neto del tabaco",
pilonmodalminimum: "Temperatura mínima aceptada",
pilonmodalmaximum: "Temperatura máxima aceptada",
pilonmodalstate: "Estado de pilón",
createPilonButton: "Guardar nuevo pilón",
pilontitle: " Agregar nuevo pilón",

//Traducción del modal turning
turningneeds:"Pilón necesita", 
turningperson:"Persona encargada",
turningpilon: "Pilón seleccionado",
turningpilonTem: "Temperatura",
turningtask: "Fecha de inicio",
turningstart: "Hora de inicio",
turningend: "Fecha de finalización",
turningendtime: "Hora de finalización",

turningaddworker: "Agregar nuevo trabajador",
createWorkerButton:"Guardar nuevo trabajador",
turningselect:"Seleccione una opción",
turningoption:"Virado",
turningwetting:"Mojado",
turningcharge: "Seleccione la persona a cargo",
personsWork:"Personas Trabajando",


//traduccion del modal informacion sobre el pilon

//Trabajadores
modalworkername: "Nombre del trabajador",
workertitle: "Trabajadores",
titleworker:" Agregar nuevo trabajador",

//Colores
cardscolor:"Significado del color de las tarjetas: ",
cardsred:"Temperatura muy alta",
cardsblue: "Temperatura muy baja",
cardsgreen: "Temperatura aceptada",
cardsyellow: "Temperatura estática",
cardselected: "Pilón seleccionado",

exporthum: "Exportar a image",

//Traducción de tareas de pilones
titletasks: "Tareas de pilones",
taskperson: "Persona a cargo",
taskpilon: "Tarea de pilón",
taskworked: "Pilón trabajado",
tasktemp: "Temperatura de inicio de pilón",
taskdate: "Fecha de inicio",
tasktime: "Hora de inicio",
datetask: "Fecha de finalización",
taskend: "Hora de finalización",
taskoptions: "Opciones",

//Filtro
filtrooptions: "Opciones de filtros de pilón",
filtroname: "Nombre A-Z",
namefiltro: "Nombre Z-A",
filtrofarm: "Granja A-Z",
farmfiltro:"Granja Z-A",
filtrovariety: "Variedad A-Z",
varietyfiltro: "Variedad Z-A",
tareaPilon: "Pilón task",

//Modal de tareas
turningtitle: "Tareas de virado / mojado", 

// modal de la informacion del pilon
titleinfopilon: "Información sobre el pilón",
turningpilonSelec: "Pilón Seleccionado",
turningpilonVar: "Variedad",
turningpilonFinc:"Finca",
turningpilonEta:"Etapa",
turningpilonTempMin:"Temperatura minima",
turningpilonTempMax:"Temperatura maxima",
turningpilonPn:"Peso neto",
turningpilonFech:"Fecha de ingreso",
turningpilonCor:"Corte",
turningpilonCos:"Cosecha",
turningpilonClass:"Clase",
turningpilonTip:"Tipo de tabaco",

//traducicion del formulario agregar un nuevo pilon

tituloAgregarPilon:"Agregar un nuevo pilón",
nombre: "Nombre del pilón",
pilonmodalfinca: "Tabaco finca",
pilonmodalvariety: "Tabaco Variedad",
pilonmodalcorte: "Tabaco corte",
pilonmodalclase: "Tabaco clase",
pilonmodalharvest: "Cosecha de tabaco",
pilonmodaletapa: "Etapa de tabaco",
pilonmodaltipo: "Tipo del tabaco",
pilonmodalweight: "Peso neto del tabaco",
pilonmodalminimumnuevo: "Temperatura mínima",
pilonmodalmaximumnuevo: "Temperatura máxima",
pilonmodalstate: "Estado de pilón",

// Traduccion de las cajas de texto y select en el formulario
finc:"Seleccione la finca",
variety:"Seleccione la variedad",
seleccioneCorte: "Seleccione el corte",
seleccioneClase: "Selecione la clase",
eta: "seleccione la etapa",
selectType: "Seleccione el tipo",

//traduccion del boton del formulario

createPilonButton: "Guardar nuevo pilón",

// Traduccion del historial de temperatura

showdate: "Fecha de lectura",
showlectur: "Tiempo de lectura",
showtemp: "Temperatura",

//Traduccion de los botones de las tareas de los pilones
personaACargo: "Personas a cargo",
tareaPilon: "Tarea de pilón",
pilonTrabajado: "Pilón trabajado",
tempInicioPilon: "Temperatura de inicio de pilón",
fechaInicio: "Fecha de inicio",
horaDeInicio: "Hora de inicio",
fechaFinalizada: "Fecha de finalizar",
horaFinalizada: "Hora de finalizar",
opcionesTask: "Opciones",

// traduccion de los botones worker_list
nombreDeTrabajadores:"Nombres de los trabajadores",
opcionesWorkers: "Opciones",
workersname: "Nombre de los trabjadores",
workersoptions: "Opciones",


// traduccion del las listas en el dashboard
listaArduinos: "Lista de sensores",
listaSensores: "Lista de sensores",
formularioPilon: "Agregar nuevo pilón",

//Traduccion del encabezado sensor
sensOr: 'Sensores',

address: "Dirección del sensor",
titulopagesensor: "Sensores",

//Crear sensor 


// Sensor editar 
editArduinoModalLabel: 'Actualizacion del sensor',
arduinoNameEdit: "Nombre del sensor",
direccionSensor: 'Dirección',
sensorPilon: 'Pilón Asignado',
connectA: 'Conectado a',
updateArduinoButton: 'Guardar cambios',


//Traduccion de editar pilon 
tituloActualizarPilon: "Actualizar Pilón",
editNombrePilon: "Nombre del pilón",
editFincaFarma: "Finca",
editVariedadPilon:"Variedad de tabaco",
editCortePilon:"Corte de tabaco",
editClasePilon:"Clase de tabaco",
editCosechaPilon:"Cosecha de tabaco",
editEtapaPilon:"Etapa del tabaco",
editTipoPilon:"Tipo de tabaco",
editPNPilon:"Peso del tabaco",
editTempMinPilon:"Temperatura minima aceptada",
editTempMaxPilon:"Temperatura maxima acetada",
editEstadoPilon:"Estado del pilón",

//Traduccion de editar pilon 
titleUpdatePilon: "Actualizar Pilón",
editNombrePilon: "Nombre del pilón",

// traduccion de editar de la tarea del pilon
numeroOrden:"N° orden",



    }
};

// Función para cambiar el idioma
function cambiarIdioma() {
    idiomaActual = idiomaActual === 'ingles' ? 'espanol' : 'ingles';

    // Guarda la preferencia de idioma en el almacenamiento local
    localStorage.setItem('idioma', idiomaActual);

    // Actualiza el contenido de la página
    document.getElementById('titulo').textContent = textos[idiomaActual].titulo;
    document.getElementById('parrafo').textContent = textos[idiomaActual].parrafo;
    document.getElementById('cambiarIdioma').textContent = textos[idiomaActual].boton;
    document.getElementById('home').textContent = textos[idiomaActual].home;
document.getElementById('temphumi').textContent = textos[idiomaActual].temphumi;
document.getElementById('grafi').textContent = textos[idiomaActual].grafi;
document.getElementById('system').textContent = textos[idiomaActual].system;
document.getElementById('humhistory').textContent = textos[idiomaActual].hum_history;
document.getElementById('temphistory').textContent = textos[idiomaActual].temp_history;
document.getElementById('tempgraphicshistory').textContent = textos[idiomaActual].temp_graphics_history;
document.getElementById('humgraphicshistory').textContent = textos[idiomaActual].hum_graphics_history;
document.getElementById('moreoptions').textContent = textos[idiomaActual].moreoptions;
document.getElementById('openFilterModal').textContent = textos[idiomaActual].openFilterModal;
document.getElementById('language').textContent = textos[idiomaActual].language;a
document.getElementById('options').textContent = textos[idiomaActual].options;
document.getElementById('arduopti').textContent = textos[idiomaActual].arduopti;
document.getElementById('showardu').textContent = textos[idiomaActual].showardu;
document.getElementById('showport').textContent = textos[idiomaActual].showport;
document.getElementById('showcolumns').textContent = textos[idiomaActual].showcolumns;
document.getElementById('namepi').textContent = textos[idiomaActual].namepi;
document.getElementById('saveTemps').textContent = textos[idiomaActual].saveTemps;
document.getElementById('saveAllTemps').textContent = textos[idiomaActual].saveAllTemps;
document.getElementById('saveautomatic').textContent = textos[idiomaActual].saveautomatic;
document.getElementById('optionsinfo').textContent = textos[idiomaActual].optionsinfo;
document.getElementById('savehours').textContent = textos[idiomaActual].savehours;
document.getElementById('sensOr').textContent = textos[idiomaActual].sensOr;



//Traducción de la páginaa individual de temperatura y humedad
document.getElementById('humipilo').textContent = textos[idiomaActual].humipilo;
document.getElementById('individualpilon').textContent = textos[idiomaActual].individualpilon;
document.getElementById('individualspan').textContent = textos[idiomaActual].individualspan;
document.getElementById('individualname').textContent = textos[idiomaActual].individualname;
document.getElementById('individualproperty').textContent = textos[idiomaActual].individualproperty;
document.getElementById('individualstage').textContent = textos[idiomaActual].individualstage;
document.getElementById('individualweight').textContent = textos[idiomaActual].individualweight;
document.getElementById('individualminimum').textContent = textos[idiomaActual].individualminimum;
document.getElementById('individualmaximum').textContent = textos[idiomaActual].individualmaximum;
document.getElementById('individualdate').textContent = textos[idiomaActual].individualdate;
document.getElementById('individualrelative').textContent = textos[idiomaActual].individualrelative;
document.getElementById('save_Temp_Hum').textContent = textos[idiomaActual].save_Temp_Hum;

document.getElementById('tempilo').textContent = textos[idiomaActual].tempilo;

document.getElementById('filtros').textContent = textos[idiomaActual].filtros;

document.getElementById('title').textContent = textos[idiomaActual].title;

//Traducción de la página de lista de pilones
document.getElementById('piloname').textContent = textos[idiomaActual].piloname;
document.getElementById('pilonvariety').textContent = textos[idiomaActual].pilonvariety;
document.getElementById('pilonsource').textContent = textos[idiomaActual].pilonsource;
document.getElementById('pilonstage').textContent = textos[idiomaActual].pilonstage;
document.getElementById('pilonmin').textContent = textos[idiomaActual].pilonmin;
document.getElementById('pilonmax').textContent = textos[idiomaActual].pilonmax;
document.getElementById('pilondate').textContent = textos[idiomaActual].pilondate;
document.getElementById('pilonstate').textContent = textos[idiomaActual].pilonstate;
document.getElementById('pilonoptions').textContent = textos[idiomaActual].pilonoptions;
document.getElementById('showhide').textContent = textos[idiomaActual].showhide;
document.getElementById('showname').textContent = textos[idiomaActual].showname;
document.getElementById('showvariety').textContent = textos[idiomaActual].showvariety;
document.getElementById('showsource').textContent = textos[idiomaActual].showsource;
document.getElementById('showstage').textContent = textos[idiomaActual].showstage;
document.getElementById('showdate').textContent = textos[idiomaActual].showdate;
document.getElementById('showstate').textContent = textos[idiomaActual].showstate;
document.getElementById('listapilones').textContent = textos[idiomaActual].pilones_list;
document.getElementById('taskslist').textContent = textos[idiomaActual].tasks_list;
document.getElementById('workerlist').textContent = textos[idiomaActual].worker_list;
document.getElementById('workersname').textContent = textos[idiomaActual].workersname;
document.getElementById('workersoptions').textContent = textos[idiomaActual].workersoptions;
document.getElementById('workertitle').textContent = textos[idiomaActual].workertitle;

//Traducción de la página history
document.getElementById('tempdate').textContent = textos[idiomaActual].tempdate;
document.getElementById('temptime').textContent = textos[idiomaActual].temptime;
document.getElementById('tempreadings').textContent = textos[idiomaActual].tempreadings;
document.getElementById('humidate').textContent = textos[idiomaActual].humidate;
document.getElementById('humitime').textContent = textos[idiomaActual].humitime;
document.getElementById('humireadings').textContent = textos[idiomaActual].humireadings;
document.getElementById('addnewarduino').textContent = textos[idiomaActual].addnewarduino;
document.getElementById('addnewpilon').textContent = textos[idiomaActual].addnewpilon;

//Modal arduino

document.getElementById('arduinomodalname').textContent = textos[idiomaActual].arduinomodalname;
document.getElementById('arduinomodalassigned').textContent = textos[idiomaActual].arduinomodalassigned;
document.getElementById('arduinomodalconnected').textContent = textos[idiomaActual].arduinomodalconnected;
document.getElementById('arduinomodalsave').textContent = textos[idiomaActual].arduinomodalsave;


document.getElementById('address').textContent = textos[idiomaActual].address;
document.getElementById('titulopagesensor').textContent = textos[idiomaActual].titulopagesensor;


//Modal pilón
document.getElementById('pilonmodalname').textContent = textos[idiomaActual].pilonmodalname;
document.getElementById('pilonmodalfarm').textContent = textos[idiomaActual].pilonmodalfarm;
document.getElementById('pilonmodalvariety').textContent = textos[idiomaActual].pilonmodalvariety;
document.getElementById('pilonmodalcutting').textContent = textos[idiomaActual].pilonmodalcutting;
document.getElementById('pilonmodalclass').textContent = textos[idiomaActual].pilonmodalclass;
document.getElementById('pilonmodalharvest').textContent = textos[idiomaActual].pilonmodalharvest;
document.getElementById('pilonmodalstage').textContent = textos[idiomaActual].pilonmodalstage;
document.getElementById('pilonmodaltype').textContent = textos[idiomaActual].pilonmodaltype;
document.getElementById('pilonmodalweight').textContent = textos[idiomaActual].pilonmodalweight;
document.getElementById('pilonmodalminimum').textContent = textos[idiomaActual].pilonmodalminimum;
document.getElementById('pilonmodalmaximum').textContent = textos[idiomaActual].pilonmodalmaximum;
document.getElementById('createPilonButton').textContent = textos[idiomaActual].createPilonButton;
document.getElementById('pilontitle').textContent = textos[idiomaActual].pilontitle;



//Modal turning

document.getElementById('turningneeds').textContent = textos[idiomaActual].turningneeds;
document.getElementById('turningperson').textContent = textos[idiomaActual].turningperson;
document.getElementById('turningpilon').textContent = textos[idiomaActual].turningpilon;
document.getElementById('turningtask').textContent = textos[idiomaActual].turningtask;
document.getElementById('turningstart').textContent = textos[idiomaActual].turningstart;
document.getElementById('turningend').textContent = textos[idiomaActual].turningend;
document.getElementById('turningendtime').textContent = textos[idiomaActual].turningendtime;

document.getElementById('turningaddworker').textContent = textos[idiomaActual].turningaddworker;
document.getElementById('createlanguage_saveWorkerButton').textContent = textos[idiomaActual].createWorkerButton;
document.getElementById('turningselect').textContent = textos[idiomaActual].turningselect;
document.getElementById('turningoption').textContent = textos[idiomaActual].turningoption;
document.getElementById('turningwetting').textContent = textos[idiomaActual].turningwetting;


//modal informacion sobre el pilon
document.getElementById('titleinfopilon').textContent = textos[idiomaActual].titleinfopilon;
document.getElementById('turningpilonSelec').textContent = textos[idiomaActual].turningpilonSelec;
document.getElementById('turningpilonVar').textContent = textos[idiomaActual].turningpilonVar;
document.getElementById('turningpilonFinc').textContent = textos[idiomaActual].turningpilonFinc;
document.getElementById('turningpilonEta').textContent = textos[idiomaActual].turningpilonEta;
document.getElementById('turningpilonTempMin').textContent = textos[idiomaActual].turningpilonTempMin;
document.getElementById('turningpilonTempMax').textContent = textos[idiomaActual].turningpilonTempMax;
document.getElementById('turningpilonPn').textContent = textos[idiomaActual].turningpilonPn;
document.getElementById('turningpilonFech').textContent = textos[idiomaActual].turningpilonFech;
document.getElementById('turningpilonCor').textContent = textos[idiomaActual].turningpilonCor;
document.getElementById('turningpilonCos').textContent = textos[idiomaActual].turningpilonCos;
document.getElementById('turningpilonClass').textContent = textos[idiomaActual].turningpilonClass;
document.getElementById('turningpilonTip').textContent = textos[idiomaActual].turningpilonTip;

    //modal actualizar del pilon
document.getElementById('tituloActualizarPilon').textContent = textos[idiomaActual].tituloActualizarPilon;
document.getElementById('editNombrePilon').textContent = textos[idiomaActual].editNombrePilon;
document.getElementById('editFincaFarma').textContent = textos[idiomaActual].editFincaFarma;
document.getElementById('editVariedadPilon').textContent = textos[idiomaActual].editVariedadPilon;
document.getElementById('editCortePilon').textContent = textos[idiomaActual].editCortePilon;
document.getElementById('editClasePilon').textContent = textos[idiomaActual].editClasePilon;
document.getElementById('editCosechaPilon').textContent = textos[idiomaActual].editCosechaPilon;
document.getElementById('editEtapaPilon').textContent = textos[idiomaActual].editEtapaPilon;
document.getElementById('editTipoPilon').textContent = textos[idiomaActual].editTipoPilon;
document.getElementById('editPNPilon').textContent = textos[idiomaActual].editPNPilon;
document.getElementById('editTempMinPilon').textContent = textos[idiomaActual].editTempMinPilon;
document.getElementById('editTempMaxPilon').textContent = textos[idiomaActual].editTempMaxPilon;
document.getElementById('editEstadoPilon').textContent = textos[idiomaActual].editEstadoPilon;


//modal ver informacion sobre el pilon 

document.getElementById('cardscolor').textContent = textos[idiomaActual].cardscolor;
document.getElementById('cardsred').textContent = textos[idiomaActual].cardsred;
document.getElementById('cardsblue').textContent = textos[idiomaActual].cardsblue;
document.getElementById('cardsgreen').textContent = textos[idiomaActual].cardsgreen;
document.getElementById('cardsyellow').textContent = textos[idiomaActual].cardsyellow;
document.getElementById('cardsselected').textContent = textos[idiomaActual].cardselected;

document.getElementById('exportToImage').textContent = textos[idiomaActual].exporthum;






//Tareas de pilones
document.getElementById('titletasks').textContent = textos[idiomaActual].titletasks;
document.getElementById('taskperson').textContent = textos[idiomaActual].taskperson;
document.getElementById('taskpilon').textContent = textos[idiomaActual].taskpilon;
document.getElementById('taskworked').textContent = textos[idiomaActual].taskworked;
document.getElementById('tasktemp').textContent = textos[idiomaActual].tasktemp;
document.getElementById('taskdate').textContent = textos[idiomaActual].taskdate;
document.getElementById('tasktime').textContent = textos[idiomaActual].tasktime;
document.getElementById('datetask').textContent = textos[idiomaActual].datetask;
document.getElementById('taskend').textContent = textos[idiomaActual].taskend;
document.getElementById('taskoptions').textContent = textos[idiomaActual].taskoptions;


//Filtro
document.getElementById('filtrooptions').textContent = textos[idiomaActual].filtrooptions;
document.getElementById('filtroname').textContent = textos[idiomaActual].filtroname;
document.getElementById('namefiltro').textContent = textos[idiomaActual].namefiltro;
document.getElementById('filtrofarm').textContent = textos[idiomaActual].filtrofarm;
document.getElementById('farmfiltro').textContent = textos[idiomaActual].farmfiltro;
document.getElementById('filtrovariety').textContent = textos[idiomaActual].filtrovariety;
document.getElementById('varietyfiltro').textContent = textos[idiomaActual].varietyfiltro;

document.getElementById('turningtitle').textContent = textos[idiomaActual].turningtitle;

//Modal editar actulizar pilón
document.getElementById('editPilonModalLabel').textContent = textos[idiomaActual].editPilonModalLabel;
document.getElementById('editNombrePilon').textContent = textos[idiomaActual].editNombrePilon;


document.getElementById('connecpc').textContent = textos[idiomaActual].arduinomodalconnected;

document.getElementById('formularioPilon').textContent = textos[idiomaActual].formularioPilon;

document.getElementById('sensOr').textContent = textos[idiomaActual].sensOr;



};






// Agregar un evento de clic al botón para cambiar el idioma
document.getElementById('cambiarIdioma').addEventListener('click', cambiarIdioma);

document.addEventListener('DOMContentLoaded', cambiarIdioma);


// Llama a la función de aplicarIdioma al cargar la página
cambiarIdioma();



      
    
