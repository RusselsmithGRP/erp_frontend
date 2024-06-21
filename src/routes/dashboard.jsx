// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ContentPaste from "@material-ui/icons/ContentPaste";
import GridOn from "@material-ui/icons/GridOn";
import PaymentIcon from "@material-ui/icons/Payment";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Settings from "@material-ui/icons/Settings";
import SdStorage from "@material-ui/icons/SdStorage";
import AccountBalance from "@material-ui/icons/AccountBalanceWallet";
import CreditCard from "@material-ui/icons/CreditCard";
import VendorEvaluation from "../views/Vendor/evaluation";
import RequestQuotation from "../views/RequestQuotation/index.js";
import AddQuotation from "../views/RequestQuotation/add.js";
import MyQuotation from "../views/RequestQuotation/myquote.js";
import Pdf from "../views/pdf/pdf";
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
import ReceivingAndInspection from "../views/ReceivingAndInspection/index.js";
import WorkCompletion from "../views/ReceivingAndInspection/WorkCompletion.js";
import RejectionLog from "../views/ReceivingAndInspection/RejectionLog.js";
import ViewRejectedLog from "../views/ReceivingAndInspection/ViewRejectedLog.js";
import receivingView from "../views/ReceivingAndInspection/view.js";
import rejectionLogIndex from "../views/ReceivingAndInspection/rejectionLogIndex.js";
import PurchaseOrder from "../views/PurchaseOrder/index.js";
import PurchaseOrderAdd from "../views/PurchaseOrder/add.js";
import PurchaseOrderView from "../views/PurchaseOrder/view.js";
import AddPurchaseRequisition from "../views/PurchaseRequisition/add.js";
import ViewPurchaseRequisition from "../views/PurchaseRequisition/edit.js";
import ListPurchaseRequisition from "../views/PurchaseRequisition/index.js";
import ListCrud from "../views/Crud/index.js";
import AddCrud from "../views/Crud/add.js";
import EditCrud from "../views/Crud/edit.js";
import ViewCrud from "../views/Crud/add.js";
import Log from "../views/Log/index.js";
import Registration from "../views/RegistrationPage/index.js";
import Permission from "views/Roles/permission.js";
import EditDepartment from "views/Departments/index.js";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ChangePassword from "../views/UserProfile/ChangePassword.jsx";
import importRecords from "../views/importRecords/index";
import updateVendorContract from "../views/Vendor/updateVendorContract";
import openMarket from "../views/OpenMarket/index";
import viewOpenMarket from "../views/OpenMarket/edit";
import update from "../views/PurchaseOrder/update";

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
    path: "/import-records",
    component: importRecords
  },
  {
    path: "/vendorevaluation",
    component: VendorEvaluation
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
  },
  {
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
    path: "/departments/edit/:id",
    component: EditDepartment
  },
  {
    path: "/pdf/:id",
    component: Pdf
  },
  {
    path: "/requisition/add",
    component: AddPurchaseRequisition
  },
  {
    path: "/requisition/view/:id",
    component: ViewPurchaseRequisition
  },
  {
    path: "/quotation",
    component: RequestQuotation
  },
  {
    path: "/quotation/add",
    component: AddQuotation
  },
  {
    path: "/quotation/myquotes",
    component: MyQuotation
  },
  {
    path: "/requisition",
    component: ListPurchaseRequisition
  },
  {
    path: "/receiving",
    component: ReceivingAndInspection
  },
  {
    path: "/rejection/log/index",
    component: rejectionLogIndex
  },
  {
    path: "/rejection/log/:id",
    component: ViewRejectedLog
  },
  {
    path: "/receiving/:id",
    component: receivingView
  },
  {
    path: "/work/completion/:id",
    component: WorkCompletion
  },
  {
    path: "/log/:id",
    component: RejectionLog
  },
  {
    path: "/order",
    component: PurchaseOrder
  },
  {
    path: "/order/add",
    component: PurchaseOrderAdd
  },
  {
    path: "/order/view/:id",
    component: PurchaseOrderView
  },
  {
    path: "/order/update/:id",
    component: update
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
    path: "/crud/edit/:type/:id",
    component: EditCrud
  },
  {
    path: "/crud/:type/",
    component: ListCrud
  },
  {
    path: "/setup/vendor/update",
    component: updateVendorContract
  },
  {
    path: "/openmarket",
    component: openMarket
  },
  {
    path: "/openmarket/view/:id",
    component: viewOpenMarket
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
    path: "/vendor",
    name: "Vendors List",
    icon: ContentPaste,
    component: VendorList
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
        actions: ["index", "add", "edit", "delete", "admin_view"]
      },
      {
        path: "/quotation",
        name: "Request for Quotation",
        mini: "RFQ",
        component: RequestQuotation,
        actions: ["index", "add", "edit", "delete", "admin_view"]
      },
      {
        path: "/quotation/myquotes",
        name: "Quotation Request",
        mini: "RFQ",
        component: MyQuotation,
        actions: ["edit"]
      },
      {
        path: "/order",
        name: "Purchase Order",
        mini: "PO",
        component: PurchaseOrder,
        actions: ["index", "add", "edit", "delete", "admin_view"]
      },
      {
        path: "/receiving",
        name: "Receiving & Inspection",
        mini: "RI",
        component: ReceivingAndInspection,
        actions: ["index"]
      },
      {
        path: "/rejection/log/index",
        name: "Rejection Logs",
        mini: "RL",
        component: rejectionLogIndex,
        actions: ["index"]
      },
      {
        path: "/openmarket",
        name: "Open Market",
        mini: "OM",
        component: openMarket,
        actions: ["index", "add", "edit", "delete", "admin_view"]
      }
    ]
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
        actions: [
          "index",
          "add",
          "edit",
          "view",
          "delete",
          "admin_view",
          "type"
        ]
      }
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
    icon: Settings,
    state: "openSetup",
    views: [
      {
        path: "/crud/departments",
        name: "Departments",
        mini: "D",
        component: ListCrud,
        actions: ["add", "edit", "view", "delete"]
      },
      {
        path: "/crud/roles",
        name: "Roles",
        mini: "R",
        component: ListCrud,
        actions: ["add", "edit", "view", "delete"]
      },
      {
        path: "/crud/expenseheader",
        name: "Expense Header",
        mini: "C",
        component: ListCrud,
        actions: ["add", "edit", "view", "delete"]
      },
      ,
      {
        path: "/crud/locations",
        name: "Locations",
        mini: "C",
        component: ListCrud,
        actions: ["add", "edit", "view", "delete"]
      },
      {
        path: "/user/index",
        name: "Users",
        mini: "U",
        component: ListUsers,
        actions: ["add", "edit", "view", "delete"]
      },
      {
        path: "/setup/vendor/update",
        name: "Vendor Contracts",
        mini: "V",
        component: updateVendorContract,
        actions: ["add", "edit", "view", "delete"]
      }
    ]
  }
];

export const ProcurementMenu = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: HomeIcon
  }
  // {
  //   path: "/vendor/type/approved",
  //   name: "Approved Vendors",
  //   icon: LibraryBooks,
  // }
];
