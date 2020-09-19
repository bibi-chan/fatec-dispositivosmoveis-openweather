import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Button,
  Keyboard,
  Image
}
  from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';
import OverviewCard from './components/OverviewCard';

const baseUrl = "https://api.openweathermap.org/data/2.5";
const endPointForecast = "/forecast?lang=pt_br&units=metric";
const endPointOneCall = "/onecall?lang=pt_br&units=metric";
const apiKey = '';

export default function App() {

  const [cidadeObj, setCidadeObj] = useState({});
  const [cidade, setCidade] = useState('');
  const [detalhes, setDetalhes] = useState({ current: {}, cidade: {} });
  const [previsoes, setPrevisoes] = useState([]);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }
  const obterDetalhes = (coord) => {

    const target = `${baseUrl}${endPointOneCall}&lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;

    fetch(target)
      .then((dados) => {
        return dados.json()
      })
      .then((dados) => {
        setDetalhes(dados);
      })
      
  }

  const obterPrevisoes = () => {
    setPrevisoes([]);

    const target = `${baseUrl}${endPointForecast}&q=${cidade}&appid=${apiKey}`;

    fetch(target)
      .then((dados) => {
        return dados.json()
      })
      .then((dados) => {
        setPrevisoes(dados["list"])
        setCidadeObj(dados["city"])
        obterDetalhes(dados["city"]['coord'])
        Keyboard.dismiss()
      });

  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://img.pngio.com/hd-sanrio-png-cinnamoroll-transparent-sanrio-transparent-png-cinnamoroll-transparent-634_409.png',
        }}
      />
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChangeText={capturarCidade}
        />
        <Button
          title="ok"
          color= "#FFC0CB"
          onPress={obterPrevisoes}
        />
      </View>
      <View>
        <OverviewCard detalhes={detalhes} cidade={cidadeObj} estilos={styles} />
      </View>
      {/* <FlatList
        data={previsoes}
        keyExtractor={(item) => item.dt_txt}
        renderItem={
          ({ item }) => (

            <PrevisaoItem previsao={item} />

          )
        }
      /> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 28,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF'
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  nomeCidade: {
    padding: 12,
    borderBottomColor: '#ABE0E8',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
  imagem: {
    width: 63,
    height: 45,
    borderWidth: 1,
    borderColor: '#d1d1d1'
  },
  tinyLogo: {
    width: 155,
    height: 100,
    marginBottom: 10,
  }
});
