import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateProjectModal from './CreateProjectModal';
import { Modal } from 'semantic-ui-react';
import '@testing-library/jest-dom/extend-expect';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
} from '@testing-library/dom';

configure({ adapter: new Adapter() });

describe('<CreateProjectModal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CreateProjectModal />);
  });

  it('should render one Modal when props.show == true', () => {
    expect(wrapper.find(Modal)).toHaveLength(1);
  });
  it('should render one Modal when props.show == true', () => {
    wrapper.setProps({ open: false });
    expect(wrapper.find('.p')).toMatchInlineSnapshot(`ShallowWrapper {}`);
  });
});
