## rax-swipex

## Install

```
$ npm install rax-swipex --save
```

## Usage

```
import MyComponent from 'rax-swipex';
```

## API

### Props

|name|type|default|describe|
|:---------------|:--------|:----|:----------|
|name|String|''|describe|

### Function

|name|param|return|describe|
|:---------------|:--------|:----|:----------|
|name|Object|/|describe|

## Example

```
import { createElement, render } from 'rax';
import DriverUniversal from 'driver-universal';
import MyComponent from 'rax-swipex';

render(<MyComponent />, document.body, { driver: DriverUniversal });
```
