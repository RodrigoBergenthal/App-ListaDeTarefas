import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, ScrollView, Modal, TouchableHighlight } from 'react-native';


export default function App() {

  const image = require('./resources/bg.jpg');
  console.disableYellowBox = true;

  const [tarefas, setarTarefas] = useState([]);

  const [modal, setModal] = useState(false);

  const [tarefaAtual, setTarefaAtual] = useState('');

  useEffect(() => {
    //alert('app carregando...');

    (async () => {
      try {
        let tarefasAtual = await AsyncStorage.getItem('tarefas');
        if (tarefasAtual == null)
          setarTarefas([]);
        else
          setTarefa(JSON.parse(tarefasAtual));
      } catch (error) {
        //error saving data
      }
    })();
  }, [])

  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }



  function deletarTarefa(id) {
    alert('Tarefa com ID ' + id + ' foi deletada com sucesso!')
    //TODO: deletar do array/estado a tarefa com id especificado!

    let newTarefas = tarefas.filter(function (val) {
      return val.id != id;
    });

    setarTarefas(newTarefas);

    (async () => {
      try {
        await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefas));
        console.log('chamando');
      } catch (error){
        //Error saving data
      }
    })();
  }

  function addTarefa() {
    setModal(!modal);

    let id = 0;
    if (tarefas.length > 0) {
      id = tarefas[tarefas.length - 1].id + 1;
    }

    let tarefa = { id: id, tarefa: tarefaAtual };

    setarTarefas([...tarefas, tarefa]);


    (async () => {
      try {
        await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefas));
        //console.log('chamando');
      } catch (error){
        //Error saving data
      }
    })();
  };




  return (

    <ScrollView style={{ flex: 1 }}>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={text => setTarefaAtual(text)} autoFocus={true}></TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => addTarefa()}
            >
              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>


      <StatusBar hidden />
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>Segundo APP - Lista de Tarefas</Text>
        </View>
      </ImageBackground>

      {
        tarefas.map(function (val) {
          return (<View style={styles.tarefaSingle}>
            <View styles={{ flex: 1, width: '100%', padding: 10, }}>
              <Text> {val.tarefa}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1, padding: 5 }}>
              <TouchableOpacity onPress={() => deletarTarefa(val.id)}><AntDesign name="closecircle" size={24} color="black" /></TouchableOpacity>
            </View>
          </View>);
        })
      }
      <TouchableOpacity style={styles.btnAddTarefa} onPress={() => setModal(true)}><Text
        style={{ textAlign: 'center', color: 'white' }}>Adicionar Tarefa</Text></TouchableOpacity>

    </ScrollView>
  );

};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  coverView: {
    width: "100%",
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  textHeader: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginTop: 20,
    fontFamily: 'Bangers_400Regular',
  },
  tarefaSingle: {
    marginTop: 30,
    width: '100%',
    borderBottomWidth: 3,
    borderBottomColor: '#aaaa',
    flexDirection: 'row',
    paddingBottom: 10,

  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  btnAddTarefa: {
    width: 200,
    padding: 8,
    backgroundColor: 'grey',
    marginTop: 20,
  }

})
