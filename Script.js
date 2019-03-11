let canvas = document.getElementById('Canvas');
let context = canvas.getContext('2d');
let x = 0;
let y = 0;
let imgC = new Image();

imgC.src = 'img.jpg';
imgC.onload = function(){
    context.drawImage(imgC, x, y);
}
