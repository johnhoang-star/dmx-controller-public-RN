# Simple DMX Controller

### Pairs with React Native App 'Companion for Simple DMX Controller' to Control Stage Lighting Over BLE.
---
## Description

You can find the app on the Play Store under "Companion for Simple DMX Micro Controller". iOS version coming soon.

This hardware and application was designed for non-technical personnel who regularly require stage lighting when technicians are not around but does have other applications, as it can interface with any lighting system that uses DMX.

It uses BLE to connect for both quicker daily use (no need to switch to a different wireless network) and for venues that do not have an available wireless network.

---
## How to Use

### Setup

In this section, anything written in (parenthesis) refers to that components or functions name in the code.

The app can be configured by anyone familiar with even basic operation of a lighting console. There are currently two screens in the app, "Operation" (BasicUserOpScreen) and "Config" (GroupConfigScreen).

In Config, one can set the nickname of a group of channels and which channels are in that group. A group will only be visible on the Operation screen if it has been given a nickname. **Homework: Add user setup and connect?**

### Operation

The default screen that the app opens to is the "Operation" (BasicUserOpScreen). Here, all the user needs to do is move the slider underneath the group nickname to change the intensity of those channels. Currently, the app will send an asynchronous command to the Arduino whenever the slider is moved.

---
# Documentation

This application uses React Native with React Navigation, React Redux, Redux-Thunk, Redux-Persist, and React Native BLE PLX. It was made with Expo until BLE functionality needed to be added (Expo does not support Bluetooth as of 2020/10/01).

## Redux

State is managed by React Redux, and as such is the most difficult to parse. There are currently 2 reducers that handle the groups of channels (groupReducer.js) and BLE actions (bleManagerReducer.js).

### Group Reducer (groupReducer.js)

Currently, upon first opening the app, the reducer will use the helper function "**initGroupCreation(int)**" found in "helpers/initGroupCreation.js" to create 10 groups. This number is completely arbitrary and can be increased by changing the input in:

> const initialState = {
>   groups: initGroupCreation(10) 
> }

Each group object has the properties "id: string, circuits: [], intensity: int, nickname: string". When initialized, nickname will be an empty string. Until changed in the Config screen, groups will display their unique id.


**ACTIONS**

If you are unfamiliar with Redux, you can learn more here. **Homework**

The following actions can be dispatched to the group reducer:

>SET_INTENSITY (Automatically called when sending intensity changes over BLE with thunk "updateIntensity". Changes the intensity of all channels within the provided group id. New Intensity must be an int between 0 and 255.)

>SET_NICKNAME (Changes nickname of provided group id.)

>SET_CIRCUITS (Set the circuits controlled by the given group id.)

### **BLE Reducer (bleManagerReducer.js)**

Handles BLE actions, including initiatlizing the Bluetooth Manager. Uses react-native-ble-plx (requires eject from Expo).

This object has the following properties: "bleList: [availableBleDevices], connectedDevice: {currently connected BLE device}, status: string (ex. disconnected, connecting, etc)".

A BLE Manager object is created on initilization, but is called on through Redux actions (both thunk and otherwise).

**ACTIONS**

These actions can be dispatched to the bleManager reducer:

>SCAN_CONNECT_BLE (Scans for available BLE devices and adds them to bleList array, but will not add devices without a visibile name or are already present in list. Will connect to device specified by user.)

>CONNECTED_DEVICE (Updates currently connected device with Device object created by BLE Manager when scanning.)

>UPDATE_STATUS (Updates status of BLE Manager, ex. "disconnected", "connected".)

**THUNK ACTIONS**

Exclusively used for async actions related to BLE Manager and connected Arduino DMX controller.

>startBleScan() (Upon app start, initialize BLE Manager and then dispatch "bleScan()", which actually starts the BLE Manager scanning.)

>bleScan() (Calls on BLE Manager object to begin scanning. Then dispatches "SCAN_CONNECT_BLE".)

>connectDevice() (This is called by the user tapping one of the BLE devices from the list displayed to them. Stops BLE Manager scanning and then attempts to connect, dispatching "UPDATE_STATUS" through connecting process.)

>updateIntensity() (Takes input intensity and channels, converts them to Base64, and sends to appropriate BLE Characteristic.)
>
>Note: the intensity and channels are converted to a string with values (int's only) separated with commas. First value must be the intensity, following values are channels.

> 
