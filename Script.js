let canvas = document.getElementById('Canvas');
let context = canvas.getContext('2d');
let x = 0;
let y = 0;
let imgC = new Image();

// Wczytanie obrazu do canvas
imgC.src = 'img.jpg';
imgC.onload = function(){
    context.drawImage(imgC, x, y);
}

// Przypisanie zmiennych do suwaków
let contrast = document.getElementById('contrastSlider');
let saturation = document.getElementById('saturationSlider');
let brightness = document.getElementById('brightnessSlider');

// Ograniczenie zasięgu suwaków
function limitRange(value) {
    if (value < 0) return 0;
    if (value > 255) return 255;
    return value;
}

// Funkcja zmiany Kontrastu
contrast.addEventListener('change', function(){
    
    let imgData = context.getImageData(x, y, imgC.width, imgC.height);
    let data = imgData.data;
    let factor = (255.0 * (parseInt(contrast.value) + 255.0)) / (255.0 * (255.0 - parseInt(contrast.value)));

    for (let i = 0; i < data.length; i += 4)
    {
        data[i] = limitRange(factor * (data[i] - 128.0) + 128.0);
        data[i+1] = limitRange(factor * (data[i+1] - 128.0) + 128.0);
        data[i+2] = limitRange(factor * (data[i+2] - 128.0) + 128.0);
    }
    context.putImageData(imgData, x, y);
})

// Funkcja zmiany Jasności
brightness.addEventListener('change', function(){
    
    let imgData = context.getImageData(x, y, imgC.width, imgC.height);
    let data = imgData.data;
    for (let i = 0; i < data.length; i += 4)
    {
        data[i] += 255 * (brightness.value / 100)
        data[i+1] += 255 * (brightness.value / 100)
        data[i+2] += 255 * (brightness.value / 100)
    }
    context.putImageData(imgData, x, y);
})