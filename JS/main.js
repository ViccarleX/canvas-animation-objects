// Selecciona el elemento canvas del DOM y obtiene su contexto 2D.
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Define la altura y la anchura de la ventana del canvas.
const window_height = "300";
const window_width = "500";

// Ajusta la altura y la anchura del canvas.
canvas.height = window_height;
canvas.width = window_width;

// Establece el color de fondo del canvas.
canvas.style.backgroundColor = "#b7f7ed";

// Obtiene los elementos para mostrar la posición.
const posXElement = document.getElementById("posX");
const posYElement = document.getElementById("posY");

// Definición de la clase Circle.
class Circle {
  constructor(x, y, radius, color, text, backcolor, speed) {
    // Propiedades del círculo.
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.backcolor = backcolor;
    this.speed = speed;

    // Velocidad de movimiento en los ejes X e Y.
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  // Método para dibujar el círculo en el canvas.
  draw(context) {
    context.beginPath();
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.backcolor;
    context.fill();

    context.lineWidth = 5;
    context.strokeStyle = this.color;
    context.stroke();

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px cursive";
    context.fillStyle = "white";
    context.fillText(this.text, this.posX, this.posY);

    context.closePath();
  }

  // Método para actualizar la posición del círculo y redibujarlo.
  update(context) {
    this.draw(context);

    // Actualiza los elementos HTML con la posición actual del círculo.
    posXElement.textContent = this.posX.toFixed(2);
    posYElement.textContent = this.posY.toFixed(2);

    // Controla los límites del canvas y cambia la dirección si el círculo los supera.
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Actualiza la posición del círculo.
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Genera valores aleatorios para las propiedades del círculo.
let randomRadius = Math.floor(Math.random() * 60 + 20);
let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";

// Asegura que el círculo no se dibuje fuera del canvas.
randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

// Crea un nuevo círculo con las propiedades aleatorias generadas.
let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, "1", randomBackcolor, 2);
miCirculo.draw(ctx);

// Función para actualizar el círculo continuamente usando requestAnimationFrame.
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);  // Limpia el canvas.
  miCirculo.update(ctx);  // Actualiza la posición del círculo.
};

// Inicia la animación.
updateCircle();



 /*  El siguiente código comentado crea múltiples círculos y los anima.
  Descomentar para utilizar: */

/* const nCircles = 10;
let circles = [];

for (let i = 0; i < nCircles; i++) {
  let randomRadius = Math.floor(Math.random() * 30 + 20);
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomBackcolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomStrokecolor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  let randomSpeed = Math.random() * 3 + 1;

  randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
  randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

  let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i+1, randomBackcolor, 2, randomSpeed);
  circles.push(miCirculo);
}

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  circles.forEach((circle) => {
    circle.update(ctx);
  });
};

updateCircle(); */


