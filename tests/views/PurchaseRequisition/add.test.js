import React from 'react';
//import renderer from 'react-test-renderer';
import Add  from './../../../src/views/PurchaseRequisition/add';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import {shallow} from 'enzyme';

const mockStore = configureMockStore();
const store = mockStore({auth:{user:{}}, loader:{}});

it('purchase requisition form is displaying', ()=>{
    const tree = shallow(
        <Provider store={store}>
            <Add />
         </Provider>
         );
    console.log(tree);
});