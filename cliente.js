const inquirer = require('inquirer');
const fs = require('fs');
const rutaArchivo = __dirname + '/pedidos.json';
let preguntasDelivery = [
	{
		type: 'confirm',
		message: '¿Querés la pizza para delivery?',
		name: 'paraDelivery',
		default: false,
	},
	{
		type: 'input',
		message: 'Ingresá tu dirección:',
		name: 'direccionEntrega',
		when: respuestas => respuestas.paraDelivery,
		validate: rta => rta.trim() == '' ? 'Campo Obligatorio' : true,
	},
	{
		type: 'input',
		message: 'Ingresá tu nombre:',
		name: 'nombreCliente',
		validate: rtaDeEstaPregunta => {
			if (rtaDeEstaPregunta.trim() == '') {
				return 'El nombre es obligatorio';
			} return true
		}
	},
	{
		type: 'input',
		message: 'Ingresá tu teléfono:',
		name: 'telefonoCliente',
		when: respuestas => respuestas.paraDelivery,
		validate: rtaDeEstaPregunta => {
			let numeroTelefono = parseInt(rtaDeEstaPregunta)
			if (rtaDeEstaPregunta.trim() == '') {
				return 'El teléfono es obligatorio'
			} else if (rtaDeEstaPregunta.lenght <= 8 || isNaN(rtaDeEstaPregunta)) {
				return "Ingresa un numero válido y mayor a 8 digitos"
			}
			return true
		}
	},
	{
		type: 'rawlist',
		message: 'Elegí el gusto de la pizza:',
		choices: ['Muzza', 'Napo', '4 quesos', 'Calabresa'],
		name: 'gustoPizza',
	},
	{
		type: 'list',
		message: 'Elegí el tamaño de la pizza:',
		choices: ['Personal', 'Mediana', 'Grande'],
		name: 'tamanioPizza',
	},
	{
		type: 'confirm',
		message: '¿Querés agregar bebida?',
		name: 'conBebida',
		default: false,
	},
	{
		type: 'list',
		message: 'Elegí el gusto de la bebida:',
		choices: ['Coca-cola', 'Pepsi', 'Sprite', '7 Up'],
		name: 'gustoBebida',
		when: respuestas => respuestas.conBebida,
	},
	{
		type: 'confirm',
		message: '¿Sos cliente habitual?',
		name: 'clienteHabitual',
		default: false,
	},
	{
		type: 'checkbox',
		message: 'Elegí los gustos de las empanadas:',
		choices: ['Carne picante', 'Pollo', 'Margarita', 'Cebolla y queso'],
		name: 'gustoEmpanadas',
		when: respuestas => respuestas.clienteHabitual,
		validate: rta => rta.lenght < 3 || rta.lenght > 3 ? 'Elegí 3 empanadas' : true
	},
];

const lasRespuestas = respuestas => {

	console.log('=== Resumen de tu pedido ====');
	console.log('Nombre cliente: ' + respuestas.nombreCliente);
	console.log('Teléfono de contacto: ' + respuestas.telefonoCliente);
	respuestas.paraDelivery ? console.log('Tu pedido será entregado en ' + respuestas.direccionEntrega) : console.log("Nos indicaste que pasarás a retirar tu pedido");
	console.log('=== Productos solicitados ===');
	console.log('Pizza: ' + respuestas.gustoPizza);
	console.log('Tamaño: ' + respuestas.tamanioPizza);
	console.log('Bebida: ' + respuestas.gustoBebida);


}

inquirer
	.prompt(preguntasDelivery)
	.then(lasRespuestas)
