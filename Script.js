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

// Funkcja zmiany Nasycenia
saturation.addEventListener('change', function(){
    
    let imgData = context.getImageData(x, y, imgC.width, imgC.height);
    let data = imgData.data;
    
})

// Zamiana RGB na HSV
function RGBtoHSV(color) {
    let r,g,b,h,s,v;
    r= color[0];
    g= color[1];
    b= color[2];
    min = Math.min( r, g, b );
    max = Math.max( r, g, b );

    v = max;
    delta = max - min;
    if( max != 0 )
        s = delta / max;
    else {
        s = 0;
        h = -1;
        return [h, s, undefined];
    }
    if( r === max )
        h = ( g - b ) / delta;
    else if( g === max )
        h = 2 + ( b - r ) / delta;
    else
        h = 4 + ( r - g ) / delta;
    h *= 60;
    if( h < 0 )
        h += 360;
    if ( isNaN(h) )
        h = 0;
    return [h,s,v];
}

// Zamiana HSV na RGB
function HSVtoRGB(color) {
    let i;
    let h,s,v,r,g,b;
    h= color[0];
    s= color[1];
    v= color[2];
    if(s === 0 ) {
        r = g = b = v;
        return [r,g,b];
    }
    h /= 60;
    i = Math.floor( h );
    f = h - i;
    p = v * ( 1 - s );
    q = v * ( 1 - s * f );
    t = v * ( 1 - s * ( 1 - f ) );
    switch( i ) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [r,g,b];
}