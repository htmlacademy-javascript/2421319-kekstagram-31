import {photos} from './data.js';
import {renderPhotos} from './picture.js'; // сгенерированные миниатюры из picture
import {initUploadModal} from './form.js';

renderPhotos(photos);
initUploadModal();
