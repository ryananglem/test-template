import './home.component.css'

import { IState } from 'app/state/store'
import * as React from 'react'
import { connect } from 'react-redux'

export interface IHomeProps {
  currentTime?: Date
}

function Home (props: IHomeProps) {
  const { currentTime } = props
  const timeDOM = currentTime ?
  <h2>{currentTime.toString()}</h2> :
  <h2>initialising</h2>
  return (
    <div>
      <h1>The current time is</h1>
      {timeDOM}
    </div>
  )
}

function mapStateToProps (state: IState) {
  return {
    currentTime: state.system.time
  }
}

export default connect(mapStateToProps)(Home)
