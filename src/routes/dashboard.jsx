// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ContentPaste from "@material-ui/icons/ContentPaste";
import GridOn from '@material-ui/icons/GridOn';
import PaymentIcon from '@material-ui/icons/Payment';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Settings from '@material-ui/icons/Settings';
import SdStorage from '@material-ui/icons/SdStorage';
import AccountBalance from '@material-ui/icons/AccountBalanceWallet';
import CreditCard from '@material-ui/icons/CreditCard';
import RequestQuotation from "../views/RequestQuotation/index.js";

// core components/views
import LoginPage from "../views/LoginPage/index.js";
import DashboardPage from "../views/Dashboard/Dashboard.jsx";
import UserProfile from "../views/UserProfile/UserProfile.jsx";
import ListUsers from "../views/UserProfile/ListUsers.jsx";
import AddUser from "../views/UserProfile/AddUser.jsx";
import EditUser from "../views/UserProfile/EditUser.jsx";
import VendorList from "../views/Vendor/index.js";
import AddVendor from "../views/Vendor/add.js";
import ViewVendor from "../views/Vendor/view.js";
import PurchaseOrder from "../views/PurchaseOrder/index.js";
import AddPurchaseRequisition from "../views/PurchaseRequisition/add.js";
import ListPurchaseRequisition from "../views/PurchaseRequisition/index.js";
import ListCrud from "../views/Crud/index.js";
import AddCrud from "../views/Crud/add.js";
import ViewCrud from "../views/Crud/add.js";
import Log from "../views/Log/index.js";
import Registration from "../views/RegistrationPage/index.js";
import Permission from "views/Roles/permission.js";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChangePassword from "../views/UserProfile/ChangePassword.jsx"

/* import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx"; */

export const dashboardRoutes = [
  {
    path: "/dashboard",
    component: DashboardPage
  },
   {
    path: "/user",
    component: UserProfile
  },
  {
    path: "/user/index",
    component: ListUsers
  },
  {
    path: "/user/add",
    component: AddUser
  },
  {
    path: "/user/edit/:id",
    component: EditUser
  },
  {
    path: "/vendor/view/:id",
    component: ViewVendor
  },{
    path: "/vendor/type/:type",
    component: VendorList
  },
  {
    path: "/vendor",
    component: VendorList
  },
  {
    path: "/vendor/add",
    component: AddVendor
  },
  {
    path: "/roles/permission/:id",
    component: Permission
  },
  {
    path: "/requisition/add",
    component: AddPurchaseRequisition
  },
  {
    path: "/quotation",
    component: RequestQuotation
  },
  {
    path: "/requisition",
    component: ListPurchaseRequisition
  },
  {
    path: "/purchaseorder",
    component: PurchaseOrder
  }, 
  {
    path: "/changepassword",
    component: ChangePassword
  }, 
  {
    path: "/log",
    component: Log
  },
  {
    path: "/crud/add/:type",
    component: AddCrud
  },
  {
    path: "/crud/view/:type/:id",
    component: ViewCrud
  },
  {
    path: "/crud/:type/",
    component: ListCrud
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export const AdminMenu = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard
  },
 {
   collapse: true,
   path: "/budgets",
   name: "Budgets",
   state: "openBudgets",
   icon: PaymentIcon,
   views: [
    {
      path: "#",
      name: "Annual Budget",
      mini: "AB",
      component: ListPurchaseRequisition
    },
    {
      path: "#",
      name: "Monthly Budget",
      mini: "MB",
      component: ListPurchaseRequisition
    },
    {
      path: "#",
      name: "Supplementary Budget",
      mini: "SB",
      component: ListPurchaseRequisition
    }
   ]
 },
 {
   collapse: true,
   path: "/inventorymgt",
   name: "Inventory Mgt.",
   state: "openInventoryMgt",
   icon: SdStorage,
   views: [
    {
      path: "#",
      name: "Store Requisition",
      mini: "SR",
      component: ListPurchaseRequisition
    },
    {
      path: "#",
      name: "Gate Pass",
      mini: "GP",
      component: ListPurchaseRequisition
    }
   ]
 },
 {
  collapse: true,
  path: "/purchasing",
  name: "Purchasing",
  state: "openComponents",
  icon: GridOn,
  views: [
    {
      path: "/requisition",
      name: "Purchase Requisition",
      mini: "PR",
      component: ListPurchaseRequisition,
      actions: ['add', 'edit', 'delete', 'admin_view']
    },
    {
      path: "/request_for_quotation",
      name: "Request for Quotation",
      mini: "RFQ",
      component: RequestQuotation,
      actions: ['add', 'edit', 'delete', 'admin_view' ]
    },
    {
      path: "/purchase_order",
      name: "Purchase Order",
      mini: "PO",
      component: PurchaseOrder,
      actions: ['add', 'edit', 'delete', 'admin_view']
    }]
  },
  {
    collapse: true,
    path: "/qualitymgt",
    name: "Quality Mgt.",
    state: "openQualityMgt",
    icon: ContentPaste,
    views: [
          {
            path: "/vendor",
            name: "Vendors Mgt",
            mini: "VM",
            component: VendorList,
            actions: ['add', 'edit','view', 'delete', 'admin_view' ]
          },
    ]
  }, 
   {
    collapse: true,
    path: "/salesmgt",
    name: "Sales Management",
    state: "openSalesMgt",
    icon: ContentPaste,
    views: [
     {
       path: "#",
       name: "Sales Order",
       mini: "SO",
       component: ListPurchaseRequisition
     },
     {
       path: "#",
       name: "Quotation",
       mini: "Q",
       component: ListPurchaseRequisition
     }
    ]
  },
 {
   path: "/Setup",
   collapse: true,
   name: "Setup",
   icon:  Settings,
   state: "openSetup",
   views: [
    {
      path: "/crud/departments",
      name: "Departments",
      mini: "D",
      component: ListCrud,
      actions: ['add', 'edit','view', 'delete' ]
    },{
      path: "/crud/roles",
      name: "Roles",
      mini: "R",
      component: ListCrud,
      actions: ['add', 'edit','view', 'delete']
    },
    {
      path: "/user/index",
      name: "Users",
      mini: "U",
      component: ListUsers,
      actions: ['add', 'edit','view', 'delete']
    }
  ]
 },
];


