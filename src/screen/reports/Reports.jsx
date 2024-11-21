import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons, EvilIcons, Ionicons, Entypo, MaterialIcons, FontAwesome } from "react-native-vector-icons";
import * as ImagePiker from "expo-image-picker";
import {Video, Audio} from 'expo-av'

const iconUdiPlay = require('./assets/Microfono.gif')
const options = [
  { id: 1, label: "Colisión entre dos automóviles." },
  { id: 2, label: "Atropello de un peatón." },
  { id: 3, label: "Accidente de motocicleta en una curva." },
];

export default function Reports() {
  //para la seleccion 
  const [selectedOption, setSelectedOption] = useState("Imagenes");
  //const { width } = useWindowDimensions()
  const [images, setImages] = useState([]);
  const [isLoading, setIsloanding] = useState(false);
  const [selectImge, setImgesSelect] = useState()


  //--------------Para el Audio-------------------------
  const [audioUri, setAudioUri] = useState()
  const [recording, setRecording] = useState()
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  const startRecording = async () => {
    try {
      setIsLoadingAudio(true);

      // Pide permisos para grabar audio
      const { granted } = await Audio.requestPermissionsAsync();
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
  const [videoUri, setVideoUri] = useState(null);
  const [isLoadingVideo, setloandingVideo] = useState(false);
  const videoPick = async () => {
    setloandingVideo(true)
    let result = await ImagePiker.launchImageLibraryAsync({
      mediaTypes: ImagePiker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setVideoUri(result.assets[0].uri); // Guarda el URI del video seleccionado
    }
    setloandingVideo(false)
  }
  const videoDelete = () => {
    setVideoUri()
  }

  //------------Para las Imgenes-----------------------------------
  const pickImages = async () => {
    setIsloanding(true);
    let result = await ImagePiker.launchImageLibraryAsync({
      mediaTypes: ImagePiker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      aspect: [4, 3],
      quality: 1,
    });
    setIsloanding(false);
    console.log(result);
    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({
        id: asset.assetId,
        name: asset.fileName,
        uri: asset.uri,
      }));


      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...selectedImages];
        if (updatedImages.length > 0) {
          setImgesSelect(updatedImages[0])
        }
        return updatedImages;
      });

    }
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
  const [text, setText] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [typeReport, setReporttype] = useState([]); //Los reportes Seleccionados
  const [allReport, setAllReport] = useState(options); //para el filtrado en el Piker
  const AddReportType = (newReport) => {
    setReporttype((report) => [...report, newReport]); //para agregar al array de seleccionados
    setAllReport((prevOptions) =>
      prevOptions.filter((option) => option.id !== newReport.id)
    );
  };
  const removeSelect = (newReport) => {
    console.log(newReport);
    setAllReport((report) => [...report, newReport]);
    setReporttype((prevOptions) =>
      prevOptions.filter((option) => option.id !== newReport.id)
    );
  };




  return (
    <ScrollView style={styles.container}>
      <View style={styles.ContContenido}>
        <Text style={styles.tittle}>Reportes</Text>




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
         <View style={{ width: "100%",
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          padding: 16,}}>

     <View style={styles.contImgesSelest}>
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
            <TouchableOpacity style={styles.placeholder} onPress={() => pickImages() }>
              <Ionicons name="images-outline" size={50} color="#bbb" />
              <Text style={styles.placeholderText}>
                Solo archivos de imágenes (JPEG, PNG). Máximo 5 imágenes.
              </Text>
            </TouchableOpacity>
          )}   
      </View>

     { images.length > 0 ? (
          <FlatList
          data={images}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=> viewImges(item)}>
              <ImageBackground source={{ uri: item.uri }} style={styles.cartImges} >
              </ImageBackground>
            </TouchableOpacity>
          )}


          keyExtractor={(item) => item.uri}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            isLoading ? (
              <View>
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
              </View>
            ) : (
              <TouchableOpacity
                title="Pick images"
                onPress={pickImages}
                style={styles.plusImges}
              >
                <EvilIcons name="plus" size={40} color="white" />
              </TouchableOpacity>
            )
          }

          contentContainerStyle={{
            marginTop:8,
            alignItems: "center",
            height:60,
            borderRadius:20,
          }}
          /> ) : (<></>) }
     
      </View>
      }


      {selectedOption === "Video" && 
        <View style={{ width: "100%",
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          padding: 16,}}>

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

                ):(

                  <>
                  <Video
                    source={{ uri: videoUri }}
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
                     <MaterialCommunityIcons name="delete-forever-outline" size={28} color="#A91D3A"/>
                  </TouchableOpacity>
                 </>
                )}
        
              </View>

            ) : (
              <TouchableOpacity style={styles.placeholder} onPress={() => videoPick()}>
              <Entypo name="video" size={50} color="#bbb"/>
                <Text style={styles.placeholderText}>
                   Seleccione un video desde su dispositivo. Formatos compatibles: (.MP4).
                </Text>
             </TouchableOpacity>
            )}
          </View>


        </View>
      }


      {selectedOption === "Audio" && 
      <View style={{ width: "100%",backgroundColor: "#f5f5f5",justifyContent: "center",padding: 16,}}>
        <View style={styles.contImgesSelest}>




          <View style={styles.button}>
            <FontAwesome name="dot-circle-o" size={24} color="black" />
            <View></View>
          </View>

          <View>
          <Image source={require('./assets/Microfono.gif')} style={{ width: 70, height: '60%' }} />

          </View>


            <TouchableOpacity
            style={styles.button}
            onPress={recording ? stopRecording : startRecording}
            disabled={isLoading}
          >

            <Text style={styles.buttonText}>
              {recording ? "Detener Grabación" : "Iniciar Grabación"}
            </Text>
          </TouchableOpacity>


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


        

        {/* Para el combobox de tipo de acccidente */}
        <View style={styles.containerPicker}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Seleccione Tipo de Accidente:</Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue) => {
                const selectedOption = allReport.find(
                  (option) => option.id === itemValue
                );
                if (selectedOption) {
                  AddReportType(selectedOption);
                }
              }}
            >
              {/* Valor por defecto */}
              <Picker.Item label="Seleccione una opción..." value="" style={{fontSize:15, color:'#21273D'}} />
              {allReport.map((option) => (
                <Picker.Item
                  key={option.id}
                  label={option.label}
                  value={option.id}
                />
              ))}
            </Picker>
          </View>

        </View>
        {/* Para mostrar las categorias seleccionados typo de Accidente */}
        <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
          {typeReport.map((type) => (
            <View
              key={type.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 20,
                margin: 5,
                elevation: 2, // Sombra (en Android)
                shadowColor: "#000", // Sombra (en iOS)
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <Text style={{ marginRight: 10, fontSize: 12, color: "#21273D", fontWeight:'500', textTransform: "uppercase",  }}>
                {type.label}
              </Text>
              <TouchableOpacity onPress={() => removeSelect(type)}>
                <MaterialCommunityIcons name="close" size={20} color="#ff5555" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {/* para la descripcion */}
        <View style={styles.containerText}>
          <Text style={styles.label}>Escribe algo:</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="Escribe tu texto aquí..."
            value={text}
            onChangeText={(value) => setText(value)}
          />
        </View>


      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ContContenido: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 15,
  },
  tittle: {
    fontSize: 30,
    fontWeight: "600",
  },

  containerText: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color:'#6A759B'
  },
  textArea: {
    height: 180,
    borderColor: "#EAEAEA",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top", // Asegura que el texto comienza desde la parte superior
    backgroundColor: "#fff",
  },

  //para el combo box del tipo de accidente


  containerPicker: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },

  //estilos para un carrusel
  contenCaruselImges:{
    backgroundColor:'#F1F6F8',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#6A759B'
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
    backgroundColor: "#f5f5f5",
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

  iconReload:{
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
  },

  icoDeleteVideo:{
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
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },
  buttonSelected: {
    backgroundColor: "#4A90E2",
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
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

});
