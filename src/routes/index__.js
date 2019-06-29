import React from 'react';
import {  Route } from 'react-router-dom';
import  VendorsIndex  from '../components/Vendor/index';
import  VendorsAdd from '../components/Vendor/add';
import Typography from '@material-ui/core/Typography';
import  PurchaseRequisitionIndex  from '../components/PurchaseRequisition/index';
import  RequestQuotationIndex  from '../components/RequestQuotation/index';
import  PurchaseRequisitionsAdd from '../components/PurchaseRequisition/add';
import  PurchaseRequisitionsPurchase from '../components/PurchaseRequisition/purchase';
import  BudgetIndex  from '../components/Budgets/index';

export const routeItems = (
    <div>
        <Route path="/" />
        <Route path="/vendors" exact component={VendorsIndex} />
        <Route path="/vendors/add" exact  component={VendorsAdd} />
        <Route path="/RequestQuotation" exact component={RequestQuotationIndex} />
        <Route path="/PurchaseRequisition" exact component={PurchaseRequisitionIndex} />
        <Route path="/PurchaseRequisition/add" exact  component={PurchaseRequisitionsAdd} />
	    <Route path="/PurchaseRequisition/purchase" exact  component={PurchaseRequisitionsPurchase} />
        <Route path="/Budgets" exact  component={BudgetIndex} />
    </div>
);
