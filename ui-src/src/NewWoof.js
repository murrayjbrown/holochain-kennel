import React, { Component } from 'react'

class NewWoof extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newWoofText: ''
    }
  }
  updateWoofText = (e) => {
    this.setState({
      newWoofText: e.target.value
    })
  }
  onWoofSubmit = (e) => {
    e.preventDefault()
    if (!this.state.newWoofText) return
    this.props.post(this.state.newWoofText)
    this.setState({
      newWoofText: ''
    })
  }
  render () {
    return (
      <form onSubmit={this.onWoofSubmit} id='woof-form' action=''>
        <input value={this.state.newWoofText} onChange={this.updateWoofText} className='form-control' id='woof' name='woof' type='text' size='64' />
        <button type='submit' id='postWoof' className='btn btn-primary'>Woof</button>
      </form>
    )
  }
}

export default NewWoof
