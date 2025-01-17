//Calculadora con JavaScript
var Calc = {
	visor: document.getElementById("display"),
	valorVisor: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,

	init: (function () {
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),

	asignarEventosFormatoBotones: function (selector) {
		var x = document.querySelectorAll(selector);
		for (var i = 0; i < x.length; i++) {
			x[i].onmouseover = this.eventoAchicaBoton;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},

	eventoAchicaBoton: function (event) {
		Calc.AchicaBoton(event.target);
	},

	eventoVuelveBoton: function (event) {
		Calc.AumentaBoton(event.target);
	},

	//Formatos - botones 
	AchicaBoton: function (elemento) {
		var x = elemento.id;
		if (x == "1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto") {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if (x == "mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
			elemento.style.width = "21%";
			elemento.style.height = "62px";
		}
	},

	AumentaBoton: function (elemento) {
		var x = elemento.id;
		if (x == "1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto") {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if (x == "mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
			elemento.style.width = "22%";
			elemento.style.height = "62.91px";
		}
	},
	//Funcion - asignar eventos
	asignarEventosaFuncion: function () {
		document.getElementById("0").addEventListener("click", function () { Calc.ingNumero("0"); });
		document.getElementById("1").addEventListener("click", function () { Calc.ingNumero("1"); });
		document.getElementById("2").addEventListener("click", function () { Calc.ingNumero("2"); });
		document.getElementById("3").addEventListener("click", function () { Calc.ingNumero("3"); });
		document.getElementById("4").addEventListener("click", function () { Calc.ingNumero("4"); });
		document.getElementById("5").addEventListener("click", function () { Calc.ingNumero("5"); });
		document.getElementById("6").addEventListener("click", function () { Calc.ingNumero("6"); });
		document.getElementById("7").addEventListener("click", function () { Calc.ingNumero("7"); });
		document.getElementById("8").addEventListener("click", function () { Calc.ingNumero("8"); });
		document.getElementById("9").addEventListener("click", function () { Calc.ingNumero("9"); });
		document.getElementById("on").addEventListener("click", function () { Calc.borrarVisor(); });
		document.getElementById("sign").addEventListener("click", function () { Calc.cambSigno(); });
		document.getElementById("punto").addEventListener("click", function () { Calc.ingreDecimal(); });
		document.getElementById("igual").addEventListener("click", function () { Calc.verResultado(); });
		document.getElementById("raiz").addEventListener("click", function () { Calc.ingreOperacion("raiz"); });
		document.getElementById("dividido").addEventListener("click", function () { Calc.ingreOperacion("/"); });
		document.getElementById("por").addEventListener("click", function () { Calc.ingreOperacion("*"); });
		document.getElementById("menos").addEventListener("click", function () { Calc.ingreOperacion("-"); });
		document.getElementById("mas").addEventListener("click", function () { Calc.ingreOperacion("+"); });
	},

	borrarVisor: function () {
		this.valorVisor = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.updateVisor();
	},

	cambSigno: function () {
		if (this.valorVisor != "0") {
			var aux;
			if (this.valorVisor.charAt(0) == "-") {
				aux = this.valorVisor.slice(1);
			} else {
				aux = "-" + this.valorVisor;
			}
			this.valorVisor = "";
			this.valorVisor = aux;
			this.updateVisor();
		}
	},

	ingreDecimal: function () {
		if (this.valorVisor.indexOf(".") == -1) {
			if (this.valorVisor == "") {
				this.valorVisor = this.valorVisor + "0.";
			} else {
				this.valorVisor = this.valorVisor + ".";
			}
			this.updateVisor();
		}
	},

	ingNumero: function (valor) {
		if (this.valorVisor.length < 8) {

			if (this.valorVisor == "0") {
				this.valorVisor = "";
				this.valorVisor = this.valorVisor + valor;
			} else {
				this.valorVisor = this.valorVisor + valor;
			}
			this.updateVisor();
		}
	},

	ingreOperacion: function (oper) {
		this.primerValor = parseFloat(this.valorVisor);
		this.valorVisor = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.updateVisor();
	},

	verResultado: function () {

		if (!this.auxTeclaIgual) {
			this.segundoValor = parseFloat(this.valorVisor);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		} else {
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}

		this.primerValor = this.resultado;
		this.valorVisor = "";
		if (this.resultado.toString().length < 9) {
			this.valorVisor = this.resultado.toString();
		} else {
			this.valorVisor = this.resultado.toString().slice(0, 8) + "...";
		}

		this.auxTeclaIgual = true;
		this.updateVisor();
	},

	realizarOperacion: function (primerValor, segundoValor, operacion) {
		switch (operacion) {
			case "+":
				this.resultado = eval(primerValor + segundoValor);
				break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
				break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
				break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
				break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},

	updateVisor: function () {
		this.visor.innerHTML = this.valorVisor;
	}
};

Calc.init();