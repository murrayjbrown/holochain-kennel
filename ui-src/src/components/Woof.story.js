import React from 'react'
import { MemoryRouter } from 'react-router'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import { specs, describe, it } from 'storybook-addon-specifications'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Woof from './Woof'
import expect from 'expect'

configure({ adapter: new Adapter() })

storiesOf('Woof', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('With 2 woofs', () => {
    const post = {'message': 'Eric', 'author': 'author', 'stamp': 1516273525437}
    return getWoof(post)  
  })

function getWoof (post) {
  return (
    <Woof getPost={action('clicked')} post={post} />
  )
}
