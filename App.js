
// @flow
'use-strict'

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Marker } from 'react-native-maps'
import ClusteredMapView from 'react-native-maps-super-cluster'
import { generateRandomPoints, generateRandomPoint } from './generator'  

const italyCenterLatitude = 41.8962667,
      italyCenterLongitude = 11.3340056,
      radius = 600000 
export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pins: []
    }

    this.reload = this.reload.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.renderMarker = this.renderMarker.bind(this)
  }

  componentDidMount() {
    this.reload()
  }

  reload = () => {
    const pins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50, this.state.pins.length)
    this.setState({ pins })
  }

  loadMore = () => {
    const pins = generateRandomPoints({latitude: italyCenterLatitude, longitude: italyCenterLongitude}, radius, 50, this.state.pins.length)
    this.setState({ pins: this.state.pins.concat(pins) })
  }

  renderMarker = (pin) => {
    return (
      <Marker key={pin.id} coordinate={pin.location} />
    )
  }

  render() {
    return (
      <View style={styles.container} style={{flex: 1}}>

        {/* Cluster Map Example */}
        <ClusteredMapView
          style={{flex: 1}}
          data={this.state.pins}
          textStyle={{ color: '#65bc46' }}
          initialRegion={{latitude: italyCenterLatitude, longitude: italyCenterLongitude, latitudeDelta: 12, longitudeDelta: 12 }}
          containerStyle={{backgroundColor: 'white', borderColor: '#65bc46'}}
          renderMarker={this.renderMarker} >
        </ClusteredMapView>

        {/* Header - Control Test Bar */}
        <View style={styles.controlBar}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.reload}>
            <Text style={styles.text}>Reload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.loadMore}>
            <Text style={styles.text}>Load more</Text>
          </TouchableOpacity>
        </View>

        <Image 
          source={require('./simbol.png')}
          style={{position: 'absolute', bottom: 8, right: 8, width: 64, height: 64}}
          resizeMode='contain' />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  controlBar: {
    top: 24,
    left: 25,
    right: 25,
    height: 40,
    borderRadius: 4,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between', 
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
})