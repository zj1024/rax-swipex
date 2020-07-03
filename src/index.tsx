import Rax, { createElement, Component } from 'rax'
import View from 'rax-view'
import SwipeX from 'swipex'

import isEqual from 'lodash.isequal'

enum EDirection {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

interface ISwipeXOptions {
  auto?: number | undefined
  startSlide?: number
  speed?: number
  widthOfSiblingSlidePreview?: number
  continuous?: boolean
  disableScroll?: boolean
  stopPropagation?: boolean
  direction?: EDirection
  swiping?: (res: number) => void
  callback?: (index: number, element: Element) => void
  transitionEnd?: (index: number, element: Element) => void
  debounce?: boolean
}

interface ISwipeXProps {
  swipeOptions: ISwipeXOptions
  [key: string]: any
}

interface ISwipeXMethods {
  setup: () => void
  slide: (to?: number, speed?: number) => void
  prev: () => void
  next: () => void
  stop: () => void
  getPos: () => number
  getNumSlides: () => number
  kill: () => void
}

export default class extends Component {
  methods: ISwipeXMethods
  containerEl: HTMLElement
  props: ISwipeXProps
  lastIndex: number

  componentDidMount() {
    setTimeout(() => {
      this.methods = SwipeX(this.containerEl, { ...this.props.swipeOptions, framework: 'rax' })
    }, 100)
  }

  componentDidUpdate(prevProps: ISwipeXProps) {
    const { swipeOptions, children } = this.props
    const shouldUpdateSwipeInstance =
      prevProps.children.length !== children.length ||
      !isEqual(prevProps.swipeOptions, swipeOptions)
    if (shouldUpdateSwipeInstance) {
      this.lastIndex = this.methods.getPos()
      this.methods.kill()
      this.methods = SwipeX(this.containerEl, this.props.swipeOptions)
      this.methods.slide(this.lastIndex)
    }
  }

  componentWillUnmount() {
    this.methods.kill()
    this.methods = void 0
  }

  next() {
    this.methods.next()
  }

  prev() {
    this.methods.prev()
  }

  slide(to?: number, speed?: number) {
    this.methods.slide(to, speed)
  }

  getPos() {
    return this.methods.getPos()
  }

  getNumSlides() {
    return this.methods.getNumSlides()
  }

  render() {
    const { children, containerStyle, wrapperStyle } = this.props
    return (
      <View
        ref={(ref: Rax.Ref) => (this.containerEl = ref)}
        style={{ ...styles.swipex, ...containerStyle }}>
        <View style={{ ...styles.swipexWrap, ...wrapperStyle }}>{children}</View>
      </View>
    )
  }
}

const styles: Rax.CSSProperties = {
  swipex: {
    overflow: 'hidden',
    visibility: 'hidden',
  },
  swipexWrap: {
    overflow: 'hidden',
    position: 'relative',
    display: 'block',
    flexDirection: 'unset',
    flexShrink: 'unset',
    alignContent: 'unset',
  },
}
