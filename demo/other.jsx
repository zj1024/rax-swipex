/*@jsx createElement */
'use strict'

import { createElement, render, useEffect, useRef } from 'rax'
import DriverUniversal from 'driver-universal'
import View from 'rax-view'
import SwipeX from 'rax-swipex'

const Other = () => {
  let swipeXRef = useRef(null)

  useEffect(() => {
    console.log('[swipeX] public methods >>> ', swipeXRef.methods)
  })

  const swipeOptions = { framework: 'rax', direction: 'vertical', debounce: true }

  return (
    <Fragment>
      <SwipeX ref={ref => (swipeXRef = ref)} swipeOptions={swipeOptions}>
        <View style={styles.item}>1</View>
        <View style={styles.item}>2</View>
        <View style={styles.item}>3</View>
        <View style={styles.item}>4</View>
        <View style={styles.item}>5</View>
      </SwipeX>
    </Fragment>
  )
}

const styles = {
  item: {
    width: 600,
    height: 800,
    float: 'left',
    position: 'relative',
    background: '#188eee',
    color: '#fff',
  },
  toggle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    fontSize: 30,
    border: '1px solid #999',
  },
}

render(<Other />, document.body, { driver: DriverUniversal })
