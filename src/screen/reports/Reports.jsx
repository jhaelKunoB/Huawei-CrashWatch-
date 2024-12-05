import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons, EvilIcons, Ionicons, Entypo, MaterialIcons, FontAwesome } from "react-native-vector-icons";
import * as ImagePiker from "expo-image-picker";
import { Video, Audio } from 'expo-av'
import { registerReport } from "./controller/RegisterReport"
import { getTypeAccident } from '../../helpers/api_invoker'
import RegisteringModal from './component/RegisteringModal'
import SuccessModal from './component/SuccessModal'
import { useNavigation } from "@react-navigation/native";
import TypeReport from './component/TypeReport'
import LocationUser from "./component/LocationUser";
import * as Location from 'expo-location';
import Loanding from './component/LoandingPage'



export default function Reports() {
  const navigation = useNavigation()
  const [user, setUser] = useState({
    id: 1,
    username: 'Jhaek'
  })
 

  useEffect(() => {
    const fetchTypeReport = async () => {
      try {
        const typeReport12 = await getTypeAccident(); // Espera a que la promesa se resuelva
        setAllReport(typeReport12)
        const userString = await AsyncStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        setUser(user);
      } catch (error) {
        console.error('Error al recuperar el reporte:', error); // Manejo de errores
      }
    };

    fetchTypeReport(); // Llamada a la función asíncrona
  }, []);


  //para la seleccion 
  const [selectedOption, setSelectedOption] = useState("Imagenes");
  //const { width } = useWindowDimensions()
  const [selectImge, setImgesSelect] = useState()
  const [isLoading, setIsloanding] = useState(false);


  //--------------Para el Audio-------------------------

  const [recording, setRecording] = useState()
  const [viewRecordin, setViewRecording] = useState(true)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  const startRecording = async () => {
    try {
      setIsLoadingAudio(true);

      // Pide permisos para grabar audio
      const { granted } = await Audio.requestPermissionsAsync();
      console.log(granted)
      if (!granted) {
        alert("Se requiere permiso para usar el micrófono");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Error al iniciar la grabación:", err);
    } finally {
      setIsLoadingAudio(false);
    }
  };



  const stopRecording = async () => {
    setIsLoadingAudio(true);
    setViewRecording(false)
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      console.log("Audio guardado en:", uri);
    } catch (err) {
      console.error("Error al detener la grabación:", err);
    } finally {
      setRecording(null);
      setIsLoadingAudio(false);
    }
  };


  const playAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );

      setSound(sound);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false)
          sound.unloadAsync()
        }
      });

      setIsPlaying(true);
      await sound.playAsync();
    } catch (error) {
      console.error("Error al reproducir el audio:", error);
    }
  };
  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  //-----------Para el Video----------------------------------
  const [isLoadingVideo, setloandingVideo] = useState(false);

  const videoPick = async () => {
    setloandingVideo(true)
    let result = await ImagePiker.launchImageLibraryAsync({
      mediaTypes: ImagePiker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 0.2,
    });
    if (!result.canceled) {
      setVideoUri(result.assets[0]); // Guarda el URI del video seleccionado
    }
    setloandingVideo(false)
  }
  const videoDelete = () => {
    setVideoUri(null)
  }

  //------------Para las Imgenes-----------------------------------
  const [useErrorImges, setErrorImges] = useState(false)
  const pickImages = async () => {
    setIsloanding(true);

    // Llamamos al selector de imágenes con un máximo de 4 imágenes
    let result = await ImagePiker.launchImageLibraryAsync({
      mediaTypes: ImagePiker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 4,  // Limite máximo de imágenes
      aspect: [4, 3],
      quality: 0.6,
    });

    // Si la selección no fue cancelada
    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({
        id: asset.assetId,
        name: asset.fileName,
        uri: asset.uri,
      }));

      setImages((prevImages) => {
        // Agregar las nuevas imágenes al estado sin exceder el límite de 4
        const updatedImages = [...prevImages, ...selectedImages].slice(0, 4);
        if (updatedImages.length > 0) {
          setImgesSelect(updatedImages[0]);
        }
        return updatedImages;
      });

      setErrorImges(false);  // Desactivamos el error si es válido
    }

    setIsloanding(false);
  };
  const removeImage = (image) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((img) => img.id !== image.id);
      setImgesSelect(updatedImages.length > 0 ? updatedImages[updatedImages.length - 1] : null);
      return updatedImages;
    });
  };
  const viewImges = (itemImmges) => {
    setImgesSelect(itemImmges)
  }

  //----------Para la Seccion de Reportes------------------------------------------
  const [useErrorType, setErrorTypeAc] = useState(false)
  const [allReport, setAllReport] = useState([]); //para el filtrado en el Piker
  const [selectedValue, setSelectedValue] = useState("");
  //Los reportes Seleccionados
  const AddReportType = (newReport) => {
    setReporttype((report) => [...report, newReport]); //para agregar al array de seleccionados
    setAllReport((prevOptions) =>
      prevOptions.filter((option) => option.id !== newReport.id)
    );
    setErrorTypeAc(false)
  };
  const removeSelect = (newReport) => {
    console.log(newReport);
    setAllReport((report) => [...report, newReport]);
    setReporttype((prevOptions) =>
      prevOptions.filter((option) => option.id !== newReport.id)
    );
  };


  //--------Para la descripcion------------------------------------------------------------------------------
  const [useErrorDescr, setErrorDescrip] = useState(false)
  const descriptionText = (text) => {
    setText(text)
    setErrorDescrip(false)
  }
  //----------------------Para la Implementacion de Recuperacion de Localidad---------------------------
  const [useErrorLocaton, setErrorLocation] = useState(false)
  const [useLocation, setLocation] = useState(false)
  const [location, setLocationUser] = useState(null);


  const RecoverLocation = async () => {
   
    setErrorLocation(false)
    setLoanding(true)

    try {
      // Pide permiso para acceder a la ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();

      console.log('Recuperando Ubicacion')
      if (status !== 'granted') {
        setError('Permiso de ubicación denegado');
        return;
      }

      // Obtiene la ubicación
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;


       // Recupera la dirección utilizando las coordenadas
      const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
      console.log('Ubicacion Recuperada:', address)
      const fullAddress = address ? `${address.name}, ${address.city}, ${address.region}, ${address.country}` : 'Dirección no disponible';
      console.log('Ubicacion Recuperada:', fullAddress)


      setLocationUser({ latitude, longitude }); // Actualiza el estado con las coordenadas
      setLocation(true)
      setLoanding(false)
      

    } catch (err) {
      setError('No se pudo obtener la ubicación: ' + err.message);
    } finally {
      setIsLoading(false); // Termina el estado de carga
      setLoanding(false)
    }

  }

  //-------------------------------------------------
  const [useLoanding, setLoanding] = useState(false)

  //------------------------------------------------------

  //Para poder Enviar los datos Para el registro
  const [images, setImages] = useState([]);
  const [typeReport, setReporttype] = useState([]);
  const [videoUri, setVideoUri] = useState(null);
  const [audioUri, setAudioUri] = useState()
  const [text, setText] = useState("");

  //Me faltan estos datos-----------------------------------------------------------------
  const [useCounty, setCounty] = useState(1)

 


  const reportRegister = async () => {

    if(!useLocation){
      setErrorLocation(true)
      return
    }
    if (images.length === 0) {
      setErrorImges(true)
      setSelectedOption('Imagenes')
      return;
    }
    if (!text.trim()) {
      setErrorDescrip(true)
      return;
    }
    if (!typeReport || typeReport.length === 0) {
      setErrorTypeAc(true)
      return;
    }


    try {
      setModalVisibleRegis(true);  // Muestra el modal de carga
      // Realiza la llamada al servicio para registrar el reporte
      const report = await registerReport(images, videoUri, audioUri, typeReport, text, location.latitude, location.longitude, user.id, useCounty);

      setModalVisibleRegis(false)  // Oculta el modal de carga
      setModalVisibleSuccess(true)
    } catch (error) {
      console.error("Error al registrar el reporte:", error);
      // Muestra un mensaje de error más detallado
      alert("Hubo un problema al registrar el reporte. Intenta nuevamente.");
    }
  };


  //para el modal de Carga de Datos
  const [isModalVisibleRegis, setModalVisibleRegis] = useState(false)
  const [isVisibleSuccess, setModalVisibleSuccess] = useState(false)

  return (
    <>
      <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical:10 }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
             <Ionicons name="chevron-back" size={34} color="black"/>
          </TouchableOpacity>
       
        <Text style={styles.tittle}>New Report</Text>
        </View>
        
        <TouchableOpacity style={styles.minimalistButton} onPress={reportRegister}>
          <Text style={styles.buttonText}>Enviar Reporte</Text>
        </TouchableOpacity>
      </View>



      <ScrollView style={styles.container}>
        <View style={styles.ContContenido}>

            {/* Para poder reculerar las cordenadas del Lugar */}
            <LocationUser  onRequestLocation = {() => RecoverLocation()} isLoading={useLocation} Error={useErrorLocaton}/>

          {/* Opciones de Selección */}
          <View style={styles.selectorContainer}>
            {["Imagenes", "Video", "Audio"].map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => setSelectedOption(option)}
                style={[
                  styles.button,
                  selectedOption === option && styles.buttonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    selectedOption === option && styles.textSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedOption === "Imagenes" &&
            <View style={{ width: "100%", backgroundColor: "white", justifyContent: "center", paddingVertical: 10 }}>

              <View style={StyleSheet.flatten([styles.contImgesSelest, useErrorImges ? styles.ErrorImge : {}])}>
                {selectImge ? (
                  <View style={styles.imageWrapper}>
                    <Image
                      source={{ uri: selectImge.uri }}
                      resizeMode='contain'
                      style={styles.image}
                    />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => removeImage(selectImge)}
                    >
                      <MaterialCommunityIcons
                        name="delete-forever-outline"
                        size={28}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <TouchableOpacity style={styles.placeholder} onPress={() => pickImages()}>
                      <Ionicons name="images-outline" size={50} color={useErrorImges ? '#AF0404' : "#bbb"} />
                      <Text style={styles.placeholderText}>
                        Solo archivos de imágenes (JPEG, PNG). Máximo 4 imágenes.
                      </Text>
                    </TouchableOpacity>

                    {useErrorImges && (
                      <Text style={styles.errorText}>
                        Es necesario seleccionar una imagen
                      </Text>
                    )}
                  </>
                )}
              </View>
              {/* Para la Carga de Imgenes  */}
              {images.length > 0 ? (
                <FlatList
                  data={images}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => viewImges(item)}>
                      <ImageBackground source={{ uri: item.uri }} style={styles.cartImges} >
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.uri}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={
                    <TouchableOpacity
                      title="Pick images"
                      onPress={pickImages}
                      style={styles.plusImges}
                    >
                      <EvilIcons name="plus" size={40} color="white" />
                    </TouchableOpacity>}

                  contentContainerStyle={{
                    marginTop: 8,
                    alignItems: "center",
                    height: 60,
                    borderRadius: 20,
                  }}
                />) : (<></>)}


            </View>
          }


          {selectedOption === "Video" &&
            <View style={{
              width: "100%",
              backgroundColor: "white",
              justifyContent: "center",
              paddingVertical: 10,
            }}>

              <View style={styles.contImgesSelest}>

                {videoUri ? (
                  <View>

                    {isLoadingVideo ? (
                      <>
                        <ActivityIndicator size="large" />
                        <Text
                          style={{
                            fontSize: 40,
                            fontWeight: "400",
                            textAlign: "center",
                          }}
                        >
                          Loading...
                        </Text>
                      </>

                    ) : (

                      <>
                        <Video
                          source={{ uri: videoUri.uri }}
                          style={styles.video}
                          useNativeControls
                          resizeMode="contain"
                          isLooping
                          shouldPlay
                        />
                        <TouchableOpacity style={styles.iconReload} onPress={() => videoPick()}>
                          <MaterialIcons name="change-circle" size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icoDeleteVideo} onPress={() => videoDelete()}>
                          <MaterialCommunityIcons name="delete-forever-outline" size={28} color="#A91D3A" />
                        </TouchableOpacity>
                      </>
                    )}

                  </View>

                ) : (
                  <TouchableOpacity style={styles.placeholder} onPress={() => videoPick()}>
                    <Entypo name="video" size={50} color="#bbb" />
                    <Text style={styles.placeholderText}>
                      Seleccione un video desde su dispositivo. Formatos compatibles: (.MP4).
                    </Text>
                  </TouchableOpacity>
                )}
              </View>


            </View>
          }


          {selectedOption === "Audio" &&
            <View style={{ width: "100%", backgroundColor: "white", justifyContent: "center", paddingVertical: 10, }}>
              <View style={styles.contImgesSelest}>






                {viewRecordin ? (
                  <>
                    <View style={styles.button}>
                      <FontAwesome name="dot-circle-o" size={24} color="black" />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording} disabled={isLoading}>
                      <Text style={recording ? styles.buttonTextGrabar : styles.buttonTextDetener}>
                        {recording ? "Detener Grabación" : "Iniciar Grabación"}
                      </Text>
                    </TouchableOpacity></>
                ) : (
                  <></>
                )}



                {audioUri && (
                  <View style={styles.audioControls}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={isPlaying ? stopAudio : playAudio}
                    >
                      <Text style={styles.buttonText}>
                        {isPlaying ? "Detener Audio" : "Reproducir Audio"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}


              </View>

            </View>
          }


          {/* style={StyleSheet.flatten([styles.contImgesSelest, useErrorImges ? styles.ErrorImge : {}])} */}

          {/* para la descripcion */}
          <View style={styles.containerText}>
            <Text style={styles.label}>Proporcione detalles del accidente *</Text>
            <TextInput
              style={StyleSheet.flatten([styles.textArea, useErrorDescr ? styles.erroDescrpText : {}])}
              multiline
              numberOfLines={5}
              placeholder="Ingresa una descripción aquí..."
              placeholderTextColor={useErrorDescr ? '#AF0404' : '#aaa'}
              value={text}
              onChangeText={(value) => descriptionText(value)}
            />
            {useErrorDescr && (
              <Text style={styles.errorText}>Describe lo sucedido para completar el reporte.</Text>
            )}
          </View>


          {/* Para el combobox de tipo de acccidente */}
          <View style={styles.containerPicker}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Seleccione Tipo de Accidente *</Text>

              <View style={{ borderRadius: 10, borderWidth: 1, borderColor: useErrorType ? '#AF0404' : '#B7B7B7', backgroundColor: useErrorType ? 'white' : 'white', overflow: 'hidden' }}>
                <Picker
                  selectedValue={selectedValue}
                  style={{ paddingHorizontal: 10 }} // Opcional para ajustar el espaciado interno
                  onValueChange={(itemValue) => {
                    const selectedOption = allReport.find(
                      (option) => option.id === itemValue
                    );
                    if (selectedOption) {
                      AddReportType(selectedOption);
                    }
                  }}
                >
                  <Picker.Item label="Tipo de Accidente" value="" style={{ fontSize: 15, color: useErrorType ? '#AF0404' : '#21273D' }} />

                  {allReport && allReport.length > 0 ? (
                    allReport.map((option) => (
                      <Picker.Item
                        key={option.id}
                        label={option.name}
                        value={option.id}
                      />
                    ))
                  ) : null}
                </Picker>

              </View>

              {useErrorType && (
                <Text style={styles.errorText}>Por lo menos selecciona un tipo de accidente.</Text>
              )}


            </View>

          </View>
          {/* Para mostrar las categorias seleccionados typo de Accidente */}
          <TypeReport typeReport={typeReport} removeSelect={removeSelect} />

        </View>

        {/* Modal de Carga */}
        <RegisteringModal isVisible={isModalVisibleRegis} onClose={() => setModalVisibleRegis(false)} />
        <SuccessModal isVisible={isVisibleSuccess} onCloseSuccess={() => setModalVisibleSuccess(false)} />

        <Loanding isVisible = {useLoanding}  onCloseSuccess ={() => setLoanding()} text = {'Recuperando Ubicacion..'}/>

      </ScrollView>
    </>

  );
}



const styles = StyleSheet.create({

  errorText: {
    color: '#AF0404', 
    fontSize: 14, 
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 5, 
    paddingHorizontal: 10, 
    backgroundColor: '#FCEAEA', 
    borderRadius: 5, 
  },

  picker: {
    borderRadius: 30,
    backgroundColor: '#DDE6ED'
  },

  //--------------PAar el header------------
  tittle: {
    paddingLeft:10,
    fontSize: 25,
    fontWeight: '600',
    color: '#21273D',
  },


  minimalistButton: {
    backgroundColor: 'transparent', // Fondo transparente
    borderWidth: 1, // Borde sutil
    borderColor: '#21273D', // Color de borde oscuro
    borderRadius: 20, // Bordes redondeados sutiles
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#21273D', // Texto oscuro para contraste
    fontWeight: '500',
  },
  //---------------------------
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  ContContenido: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 23,
    backgroundColor: 'white'
  },

  containerText: {
    paddingVertical: 10,
    backgroundColor: "white",
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color: '#6A759B'
  },
  textArea: {
    borderColor: "#B7B7B7",
    borderWidth: 0.7,
    borderRadius: 10,
    padding: 14,
    textAlignVertical: "top", // Asegura que el texto comienza desde la parte superior
    backgroundColor: "#fff",
  },

  erroDescrpText: {
    borderColor: "#AF0404",
    color: '#AF0404'
  },

  //para el combo box del tipo de accidente


  containerPicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "white",
  },

  //estilos para un carrusel
  contenCaruselImges: {
    backgroundColor: '#F1F6F8',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#6A759B'
  },
  cartImges: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },

  plusImges: {
    width: 55,
    height: 55,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#21273D",
  },



  //imgane
  contImgesSelest: {
    width: "100%",
    height: 260,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
  //para el error de la Imgenes la no cargas Imagenes
  ErrorImge: {
    shadowColor: "red",
  },



  imageWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
  },
  placeholder: {
    alignItems: "center",
  },
  placeholderText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 20,
  },



  //para el Video
  video: {
    width: 300, // Ajusta el tamaño del video
    height: 200,
    marginTop: 20,
  },

  iconReload: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
  },

  icoDeleteVideo: {
    position: "absolute",
    top: 70,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
  },

  //para las opciones
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  buttonSelected: {
    backgroundColor: "#2A6AA5",
  },
  text: {
    fontSize: 16,
    color: "#6A6A6A",
  },
  textSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },



  //para el Audio
  playButton: {
    backgroundColor: "#76C893",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonTextGrabar: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonTextDetener: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },


  

});
