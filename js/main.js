let order = [];
let clickedOrder = [];
let score = 0;

const start = document.getElementById("start");
const startDiv = document.getElementById("divStart");

const blue = document.querySelector(".blue");
const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");   

let audioYellow = new Audio();
let audioGreen = new Audio();
let audioBlue = new Audio();
let audioRed = new Audio();
let srcAudioYellow = document.createElement("source");
let srcAudioGreen = document.createElement("source");
let srcAudioBlue = document.createElement("source");
let srcAudioRed = document.createElement("source");

srcAudioBlue.type = "audio/mpeg";
srcAudioGreen.type = "audio/mpeg";
srcAudioRed.type = "audio/mpeg";
srcAudioYellow.type = "audio/mpeg";

srcAudioBlue.src = "audio/blue.mp3";
srcAudioGreen.src = "audio/green.mp3";
srcAudioRed.src = "audio/red.mp3";
srcAudioYellow.src = "audio/yellow.mp3";

audioBlue.appendChild(srcAudioBlue);
audioRed.appendChild(srcAudioRed);
audioGreen.appendChild(srcAudioGreen);
audioYellow.appendChild(srcAudioYellow);

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createElementColor(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

let lightColor = (element, time) => {
  time = time * 1000;
  setTimeout(() => {
    console.log(element);
    if (element.classList.contains("red")) {
      audioRed.play();
    } else if (element.classList.contains("yellow")) {
      audioYellow.play();
    } else if (element.classList.contains("blue")) {
      audioBlue.play();
    } else if (element.classList.contains("green")) {
      audioGreen.play();
    }

    element.classList.add("selected");
  }, time - 200);
  setTimeout(() => {
    element.classList.remove("selected");
  });
};

let checkOrder = async () => {
  for (let i in clickedOrder) {
    if (clickedOrder.length == order.length) {
        await Swal.fire({
            icon: 'success',
            title: `Acertou, próximo nível`,
            showConfirmButton: false,
            timer: 1000
          }).then(async ()=> {
            await Swal.fire({
                icon: 'info',
                title: `Pontuação: ${score}`,
                showConfirmButton: false,
                timer: 2000
              })
          })
          nextLevel();
          break;

    }
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
};

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createElementColor(color).classList.add("selected");

  setTimeout(() => {
    createElementColor(color).classList.remove("selected");
    checkOrder();
  });
};

let createElementColor = (color) => {
  switch (color) {
    case 0:
      return green;
      break;
    case 1:
      return red;
      break;
    case 2:
      return yellow;
      break;
    case 3:
      return blue;
      break;
    default:
      return;
      break;
  }
};

let nextLevel = () => {
  score++;
  shuffleOrder();
};

let gameOver = () => {
    document.querySelector("#soundtrack").pause();
    document.querySelector("#gameover").play();
    document.querySelector("#gameover").volume = 0.05;
    Swal.fire({
        icon: 'error',
        title: `Errou, o jogo será reiniciado`,
        showConfirmButton: false,
        timer: 1000
      }).then(()=> {
        Swal.fire({
            icon: 'info',
            title: `Sua pontuação foi: ${score - 1}`,
            showConfirmButton: false,
            timer: 1000
          }).then(()=> {
            green.classList.remove("selected");
            red.classList.remove("selected");
            blue.classList.remove("selected");
            yellow.classList.remove("selected");
            green.classList.add("green-i");
            red.classList.add("red-i");
            blue.classList.add("blue-i");
            yellow.classList.add("yellow-i");
            green.onclick = () => undefined;
            red.onclick = () => undefined;
            yellow.onclick = () => undefined;
            blue.onclick = () => undefined;
            score = 0;
            order = [];
            clickedOrder = [];
            startDiv.classList.remove("hide");
          })
      })


};

let playGame = () => {
    Swal.fire({
        position: 'center-start',
        title: 'Bem vindo ao genius',
        showConfirmButton: false,
        timer: 1500
      }).then(()=> {
        Swal.fire({
            position: 'center-end',
            icon: 'warning',
            title: 'Seu jogo irá iniciar',
            showConfirmButton: false,
            timer: 1000}).then(()=> {
                score = 0;
                order = [];
                clickedOrder = [];
                green.classList.remove("selected");
                red.classList.remove("selected");
                blue.classList.remove("selected");
                yellow.classList.remove("selected");
                nextLevel();
            })
      })

};

green.classList.add("green-i");
red.classList.add("red-i");
blue.classList.add("blue-i");
yellow.classList.add("yellow-i");
document.addEventListener("play", function(evt)
{
    if(window.$_currentlyPlaying && window.$_currentlyPlaying != evt.target)
    {
        window.$_currentlyPlaying.pause();
    } 
    window.$_currentlyPlaying = evt.target;
}, true);
start.onclick = () => {
  document.querySelector("#gameover").pause();
  document.querySelector("#soundtrack").play();
  document.querySelector("#soundtrack").volume = 0.05;
  green.classList.remove("green-i");
  red.classList.remove("red-i");
  blue.classList.remove("blue-i");
  yellow.classList.remove("yellow-i");
  playGame();
  green.onclick = () => {
    click(0);
    audioGreen.play();
  };
  red.onclick = () => {
    audioRed.play();
    click(1);
  };
  yellow.onclick = () => {
    audioYellow.play();
    click(2);
  };
  blue.onclick = () => {
    audioBlue.play();
    click(3);
  };
  startDiv.classList.add("hide");
};
