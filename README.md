# Página CCC

> En desarrollo 🚧

Página del Capítulo de Ciencia de la Computación de la Universidad Católica,
hecha en [AstroJS](https://astro.build/).

## ¿Porque AstroJS? 🤔

AstroJS permite usar fácilmente componentes de otras librerías de UI,
como React, Vue, Angular, Svelte, etc. Entonces, tener esta facilidad
permite que cualquiera pueda armar una parte interactiva con las
herramientas que más conoce 🚀

Ideas:
- Simulador de la carrera de ayudantes
- Integración del DCCalendario 
- Galeria de fotos hosteada en otra parte
- Integración con las fotos de Instagram
- Integración con DCChannel, DCCAcademic, etc.

## Imágenes

Antes de subir una imagen, asegúrate que esté subida en un tamaño y
calidad adecuada para el uso que se le da en la página.

```bash
convert [old.jpg] \
    -quality 86 \
    -resize [W]x[H]^ \
    -gravity center \
    -crop [W]x[H]+0+0
    -compress LZW \
    -define webp:lossless=true \
    [new.jpg]
```

```bash
cwebp [old.jpg] -o [new.webp] -q 90 -crop [x] [y] [w] [h]  -resize [W]x[H]
```

> Puedes dejar las imagenes originales con la subextensión `*.original.*`
