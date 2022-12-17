import React from 'react';
import {View, StyleSheet} from 'react-native'

function StatusBarBackground() {
    return (
      <View style={styles.statusBarBackground}></View>
    )
  }

const styles = StyleSheet.create({
	statusBarBackground : {
      height: (Platform.OS == 'ios') ? 18 : 0
    },
});

export default StatusBarBackground;