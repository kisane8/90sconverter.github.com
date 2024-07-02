function addImageEffects(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = pixels[i] * 0.8; // Réduit la composante rouge de 20%, ce qui assombrit la couleur rouge.
        pixels[i + 1] = pixels[i + 1] * 1.2; // Augmente la composante verte de 20%, ce qui renforce la couleur verte.
        pixels[i + 2] = pixels[i + 2] * 0.9; // Réduit la composante bleue de 10%, ce qui rend la couleur bleue moins intense. 
    }

    ctx.putImageData(imageData, 0, 0);
    // Après modification des valeurs des pixels, cette méthode met à jour le canevas avec les nouvelles données d'image. 
    // Cela dessine l'image modifiée sur le canevas, affichant ainsi les effets appliqués.

    return canvas.toDataURL();
}

const imageUpload = document.getElementById('imageUpload');
const convertBtn = document.getElementById('convertBtn');
const resultImage = document.getElementById('resultImage');

convertBtn.addEventListener('click', () => {
    const file = imageUpload.files[0]; // accède au premier fichier (et probablement le seul) que l'utilisateur a téléchargé.

    const reader = new FileReader();
    reader.readAsDataURL(file); // lit le fichier téléchargé comme une URL de données. Cela signifie que le fichier est converti en une chaîne de base64 qui représente les données de l'image.

    reader.onload = () => { // sera exécutée lorsque le fichier a été complètement lu
        const img = new Image();
        img.src = reader.result; // assigne le résultat de la lecture du fichier (l'URL de données) comme source de l'image. Cela charge l'image dans l'objet Image.
        
        img.onload = () => {
            resultImage.src = addImageEffects(img);
        }
        // Cette fonction applique des effets à l'image et retourne une URL de données pour l'image modifiée. 
        // Cette URL est ensuite assignée à resultImage.src, ce qui affiche l'image modifiée dans l'élément resultImage.
    }
});