import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import '../../setupTests';
import TestRows from './TestRows';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { shallow } from 'enzyme'

describe ('<TestRows />', () => {
    it('works', () => {
        const wrap = shallow(
          <TestRows/>
        )
        wrap.setProps({ name: 'Domain' })
        wrap.setState({ show: true })
      
        expect(wrap.props('name')).toEqual('Domain')
        expect(wrap.state('show')).toEqual(true)
      })
  })
