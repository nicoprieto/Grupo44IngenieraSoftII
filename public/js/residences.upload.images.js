$(function() {
  $('#inputPhotos').on('change', function() {
    const container = $('#selectedPhotos');
    for(let file of this.files) {
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.alt = 'Image subida.';
      img.classList.add('selectedPhoto');
      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      };
      container.append(img);
    }
    $('#photosLength').val(this.files.length);
  });
  // put an initial value
  $('#photosLength').val($('.selectedPhoto').length);
});