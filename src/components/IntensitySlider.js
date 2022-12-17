import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

import setGroupIntensity from '../redux/actions/setGroupIntensity.js';
import { SET_INTENSITY_CODE } from '../constants/actionTypes.js'
import { updateIntensity } from '../redux/thunk/updateIntensity.js';
import selectDisplayName from '../helpers/selectDisplayName.js';

function mapDispatchToProps(dispatch) {
  return {
    setGroupIntensity: (groupInfo) => dispatch(setGroupIntensity(groupInfo)),
    updateIntensity: (groupInfo) => dispatch(updateIntensity(groupInfo)),
  };
}

function mapStateToProps(state) {
  return {
    bleManager: state.bleManager,
  };
}

// This is the intensity fader for each group of circuits.
function ConnectedIntensitySlider(props) {
  const styles = createStyle();
  // const [initIntensity, setInitIntensity] = useState(0);
  // const [minIntensityThreshold, setMinIntensityThreshold] = useState(25);

  // Called whenever the value of the IntensitySlider is changed and updates store.
  function handleIntensityChange(newIntensity) {
    // If instrument is starting cold (less than 10%) fade to a middling value
    // let fadeIntensity = 0;
    // console.log('initIntensity, minIntensityThreshold:');
    // console.log(initIntensity);
    // console.log(minIntensityThreshold);

    // if (initIntensity <= minIntensityThreshold) {
    //   console.log('Starting instruments from cold.')
    //   let groupInfo = {
    //     id: props.id,
    //     circuits: props.circuits,
    //     intensity: Math.abs(initIntensity - newIntensity),
    //     nickname: props.nickname,
    //   };
    //   console.log('Updating with intermediate intensity first:');
    //   console.log(Math.abs(initIntensity - newIntensity));
    //   props.updateIntensity(groupInfo)
    //   .then(groupInfo.intensity = newIntensity)
    //   .then(props.updateIntensity(groupInfo))
    // }
      let groupInfo = {
        operation: SET_INTENSITY_CODE,
        id: props.id,
        circuits: props.circuits,
        intensity: Math.round(newIntensity),
        nickname: props.nickname,
      };
      props.updateIntensity(groupInfo);
  }

  if (props.nickname === '') {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {selectDisplayName(props.nickname, props.id)}
      </Text>
      <Text style={styles.text}>{Math.round(props.intensity / 2.55)}</Text>
      <Slider
        maximumValue={255}
        minimumValue={0}
        // onSlidingStart={(value) => setInitIntensity(value)}
        onValueChange={(value) => handleIntensityChange(value)}
        maximumTrackTintColor={'#C0C0C0'}
        step={12.75}
        style={styles.slider}
        value={props.intensity}
      />
    </View>
  );
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      alignContent: 'center',
      backgroundColor: colors.background,
      height: 90,
      justifyContent: 'center',
      marginBottom: 10,
      marginTop: 20,
      width: '100%',
    },
    slider: {
      height: 40,
      paddingBottom: 10,
    },
    text: {
      color: colors.text,
      fontSize: 20,
    },
  });
  return styles;
}

const IntensitySlider = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedIntensitySlider);

export default IntensitySlider;
