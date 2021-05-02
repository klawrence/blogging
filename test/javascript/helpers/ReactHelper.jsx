import {configure, mount} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-17'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() })

export function display(component) {
  return mount(component)
}

export async function displayConnected(component) {
  const connected = mount(component)

  await resolveAllPromises()
  connected.update()

  return connected
}

export function assert_select(component, selector, expectation=1) {
  const selected = component.find(selector)
  switch(typeof(expectation)) {
    case 'string':
      expect(selected.text()).toEqual(expectation)
      break
    case 'number':
      expect(selected.length).toEqual(expectation)
      break
    default:
      expect(expectation).toEqual('string or number')
      break
  }
}

// Need to call component.update() before doing assert checks on html after an async call
export const resolveAllPromises = () => new Promise(setImmediate)
