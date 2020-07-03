/*@jsx createElement */
'use strict'

import { createElement, render, useState, useEffect, useRef } from 'rax'
import DriverUniversal from 'driver-universal'
import View from 'rax-view'
import SwipeX from 'rax-swipex'

const Demo = () => {
  const [continuous, setContinuous] = useState(true)
  let swipeXRef = useRef(null)

  useEffect(() => {
    document.documentElement.style.width = '100%'
    document.documentElement.style.height = '100%'
    document.body.style.width = '100%'
    document.body.style.height = '100%'

    console.log('[swipeX] public methods >>> ', swipeXRef.methods)
  })

  const transitionEnd = index => {
    if (index === 4) {
      setContinuous(false)
    }
  }

  const swipeOptions = { framework: 'rax', direction: 'vertical', transitionEnd, continuous }

  return (
    <Fragment>
      <SwipeX
        ref={ref => (swipeXRef = ref)}
        swipeOptions={swipeOptions}
        containerStyle={{ width: '100%', height: '100%' }}
        wrapperStyle={{ width: '100%', height: '100%' }}>
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
    width: '100%',
    height: '100%',
    float: 'left',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    background: '#188eee',
    color: '#fff',
  },
  toggle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 80,
    fontSize: 30,
    lineHeight: 1,
    textAlign: 'center',
    color: '#fff',
    border: '1px solid #999',
  },
}

render(<Demo />, document.body, { driver: DriverUniversal })
