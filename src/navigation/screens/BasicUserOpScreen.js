import React, { useState, useEffect } from 'react';
import {
  Animated,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useTheme, useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { PanGestureHandler } from 'react-native-gesture-handler';

import IntensitySlider from '../../components/IntensitySlider.js';
import ConnectionStatusBar from '../../components/ConnectionStatusBar.js';
import RefreshBleButton from '../../components/RefreshBleButton.js';
import { startBleScan } from '../../redux/thunk/startBleScan.js';
import { connectDevice } from '../../redux/thunk/connectDevice.js';
import { CONNECTED, SCANNING } from '../../constants/bleManagerStatus';

// Connect Redux state.
function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    bleList: state.bleManager['bleList'],
    bleManager: state.bleManager,
  };
}

// Connect Redux action creators.
const mapDispatchToProps = (dispatch) => ({
  connectDevice: (device) => dispatch(connectDevice(device)),
  startBleScan: () => dispatch(startBleScan()),
});

// The "home" type screen where typical users control intensity of circuit groups.
function BasicUserOpScreen(props) {
  const styles = createStyle();

  useEffect(() => {
    props.startBleScan();
  }, []);

  // function closeRow(rowMap, rowKey) {
  //   if (rowMap[rowKey]) {
  //     rowMap[rowKey].closeRow();
  //   }
  // }

  function handleClick(device) {
    props.connectDevice(device);
  }

  function renderGroupList({ item }) {
    return (
      <IntensitySlider
        id={item.id}
        circuits={item.circuits}
        intensity={item.intensity}
        nickname={item.nickname}
      />
    );
  }

  function BleDevicesFlatList() {
    if (props.bleManager.status === SCANNING) {
      return (
        <FlatList
          data={props.bleList}
          extraData={props.bleList}
          renderItem={(data) => renderBleDevices(data)}
        />
      );
    } else {
      return null;
    }
  }

  function renderBleDevices(data) {
    return (
      <TouchableHighlight
        onPress={() => handleClick(data.item)}
        style={styles.rowFront}
        underlayColor={'#aaa'}
      >
        <View>
          <Text style={styles.text}>Tap to connect to: {data.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler
        minDist={40}
        onGestureEvent={() => props.navigation.navigate('Config')}
      >
        <View style={{ flex: 1 }}>
          <ConnectionStatusBar />
          <RefreshBleButton />
          <BleDevicesFlatList />
          <FlatList
            data={props.groups}
            keyExtractor={(item) => item.id}
            renderItem={renderGroupList}
          />
        </View>
      </PanGestureHandler>
    </SafeAreaView>
  );
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      flex: 1,
      margin: '3%',
      marginTop: 6,
    },
    text: {
      color: colors.text,
    },
    rowFront: {
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderBottomColor: colors.background,
      borderRadius: 15,
      borderWidth: 1,
      justifyContent: 'center',
      height: 50,
      width: '70%',
    },
  });
  return styles;
}

const ConnectedBasicUserOpScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicUserOpScreen);

export default ConnectedBasicUserOpScreen;
