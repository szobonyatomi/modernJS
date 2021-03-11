const imgValue = document.getElementById('image-value');
let image = '';

async function convertImage() {
  document.querySelector('input[type=file]').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      image = reader.result.replace('data:', '').replace(/^.+,/, '');
    };
    reader.readAsDataURL(file);
  });
}

export { convertImage, image, imgValue };
