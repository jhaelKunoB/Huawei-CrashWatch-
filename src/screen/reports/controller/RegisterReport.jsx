import { storage } from './firebase-config'; // Importa correctamente storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import {createReport} from '../../../helpers/api_invoker'

const registerReport = async (images, videoUri, audioUrl, typeReport, text, latitude, longitude, isUser, county) => {
  try {
    // Verificar que las imágenes no estén vacías
    if (!images || images.length === 0) {
      throw new Error('Las imágenes son obligatorias.');
    }

    console.log('Subida de imagenes:', images);
    const UrlImages = await uploadImages(images);
    console.log('URLs de las imágenes subidas:', UrlImages);

    
    // Verificar si el video existe y tiene un archivo
    let UrlVideo = null;
    if (videoUri != null)  {
      console.log('los datos del video',videoUri)
      UrlVideo = await uploadVideo(videoUri);
      console.log('URL del video subido:', UrlVideo);
    } else {
      console.warn('No se proporcionó video o el video está vacío.');
    }


    // Verificar si el audio está presente
    let UrlAudio = null;
    if (audioUrl && audioUrl !== '') {
      UrlAudio = await uploadAudio(audioUrl);
      console.log('URL del audio subido:', UrlAudio);
    } else {
      console.warn('No se proporcionó audio o el audio está vacío.');
    }

    // Crear el reporte con todos los datos
    const report = {
      images: UrlImages, 
      video: UrlVideo,
      audio: UrlAudio,
      description: text, 
      typeAccident: typeReport,
      latitude: latitude,
      longitude: longitude,
      idUser: isUser, 
      idCounty: county
    };

    // Enviar el reporte a la API
    const response = await createReport(report);
    //console.log('Respuesta del servidor:', report);

    return report; // Retorna la respuesta si es necesario

  } catch (error) {
    console.error('Error al registrar el reporte:', error.message);
    return { error: error.message }; // Devuelve un mensaje de error claro
  }
};







//Funcion para subir Video
const uploadVideo = async (video) => {
  try {
    console.log(`Subiendo video: ${video.fileName}, URI: ${video.uri}`);

    // Verifica si el archivo existe y obtiene el blob
    const response = await fetch(video.uri);
    if (!response.ok) {
      throw new Error('No se pudo encontrar el archivo para subir.');
    }
    const blob = await response.blob();

    // Crea una referencia única para el video
    const videoRef = ref(storage, `Videos/${video.fileName}`);

    // Usa `uploadBytesResumable` para manejar la carga
    const uploadTask = uploadBytesResumable(videoRef, blob);

    // Escucha y maneja el progreso de carga
    const url = await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progreso de carga del video: ${progress.toFixed(2)}%`);
        },
        (error) => {
          console.error('Error al subir el video:', error);
          reject(error);
        },
        async () => {
          // Obtén la URL del video una vez finalizada la carga
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Video subido correctamente, URL:', downloadUrl);
            resolve(downloadUrl);
          } catch (err) {
            console.error('Error al obtener la URL del video:', err);
            reject(err);
          }
        }
      );
    });

    // Devuelve la URL del video subido
    return url;

  } catch (error) {
    console.error('Error al subir el video:', error.message);
    throw error; // Relanza el error para manejarlo en el bloque superior
  }
};





// Función para subir las imágenes
const uploadImages = async (images) => {
  try {
    const uploadedImageUrls = [];
    console.log(images.length)
    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      console.log(`Subiendo imagen: ${image.name}, URI: ${image.uri}`);

      const fileInfo = await FileSystem.getInfoAsync(image.uri);
      if (!fileInfo.exists) {
        throw new Error(`El archivo no existe en la URI: ${image.uri}`);
      }
      const response = await fetch(image.uri);
      const blob = await response.blob();

      const imageRef = ref(storage, `Images/${image.name}`);

      const uploadTask = uploadBytesResumable(imageRef, blob);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Progreso de carga: ${progress}%`);
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
            reject(error);
          },
          async () => {
            // Obtén la URL de descarga cuando se complete la carga
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            uploadedImageUrls.push(url);
            resolve();
          }
        );
      });
    }

    console.log('Imagenes subidas correctamente:', uploadedImageUrls);
    return uploadedImageUrls;
  } catch (error) {
    console.error('Error al subir las imágenes:', error.message);
    throw error; // Relanzamos el error para manejarlo en el bloque superior
  }
};
//Funcion para el Audio
const uploadAudio = async (audioUri) => {
  try {
    console.log(`Subiendo audio desde URI: ${audioUri}`);

    // Verifica si el URI existe
    if (!audioUri) {
      throw new Error("No se proporcionó una URI de audio.");
    }

    // Obtén el archivo como blob desde la URI
    const response = await fetch(audioUri);
    const blob = await response.blob();

    // Genera un nombre único para el archivo
    const uniqueFileName = `audio_${Date.now()}.m4a`;

    // Crea una referencia en Firebase Storage
    const audioRef = ref(storage, `Audios/${uniqueFileName}`);

    // Usa `uploadBytesResumable` para subir el archivo
    const uploadTask = uploadBytesResumable(audioRef, blob);

    // Maneja el progreso de carga y finalización
    const audioUrl = await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progreso de carga del audio: ${progress.toFixed(2)}%`);
        },
        (error) => {
          console.error("Error al subir el audio:", error);
          reject(error);
        },
        async () => {
          // Obtén la URL del archivo cargado
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Audio subido correctamente, URL:", url);
          resolve(url);
        }
      );
    });

    return audioUrl; // Devuelve la URL del archivo subido
  } catch (error) {
    console.error("Error al subir el audio:", error.message);
    throw error; // Relanza el error para manejarlo en el bloque superior
  }
};



export { registerReport };
