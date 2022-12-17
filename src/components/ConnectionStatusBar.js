import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';

import { CONNECTED } from '../constants/bleManagerStatus.js';

// Grab status of BLE connection
function mapStateToProps(state) {
  return {
    bleManager: state.bleManager,
  };
}

function ConnectionStatusBar(props) {
  const styles = createStyle();

  return (
    <View style={styles.statusContainer}>
      {props.bleManager.status === CONNECTED &&
      props.bleManager.connectedDevice ? (
        <Text style={styles.statusConnected}>
          {props.bleManager.status} to: {props.bleManager.connectedDevice.name}
        </Text>
      ) : (
        <Text style={styles.status}>{props.bleManager.status}</Text>
      )}
    </View>
  );
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    statusContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 6,
    },
    status: {
      backgroundColor: 'rgba(251, 253, 0, 0.5)',
      borderRadius: 10,
      color: colors.text,
      fontSize: 16,
      margin: 5,
      padding: 5,
    },
    statusConnected: {
      backgroundColor: 'rgba(15, 146, 30, 0.6)',
      borderRadius: 10,
      color: colors.text,
      fontSize: 16,
      margin: 5,
      padding: 5,
    },
  });
  return styles;
}

const ConnectedConnectionStatusBar =
  connect(mapStateToProps)(ConnectionStatusBar);

export default ConnectedConnectionStatusBar;
