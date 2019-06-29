import React from 'react';
import WorkReferences from './../../../../src/views/Vendor/workReferences';
import { shallow, mount, render, configure } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: WorkReferences', () => {
    it('error string before submit action should be undefined', ()=> {
        const wrapper = shallow(
                    <Provider store={store}>
                <WorkReferences />
        </Provider>);
        const initialErorString = wrapper.error_str;
        expect(initialErorString).toEqual(undefined)
    });  
    it('should render correctly in "debug" mode', () => {
        const component = shallow(
        <Provider store={store}>
        <WorkReferences debug />
        </Provider>
        );
        expect(component).toMatchSnapshot();
    });
    it('simulates submit click events', () => {
        const mockCallBack = sinon.spy();
        const wrapper2 = shallow((<Provider store={store}>
            <WorkReferences />
            </Provider>));
        wrapper2.find('Button#button-submit').simulate('click');
        expect(mockCallBack).toHaveProperty('callCount', 1);
    });
        
});