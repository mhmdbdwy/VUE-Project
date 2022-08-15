import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "../views/Login.vue";
import sidbar from "../components/Sidbar.vue";

// Admin
import manageActivity from "../components/Admin/manageActivity.vue";
import operations from "../components/Admin/operations.vue"
import newactivity from "../components/Admin/newactivity.vue";
import editactivity from "../components/Admin/editactivity.vue";
import assignbyempl from "../components/Admin/assignbyemployee.vue";
// Division
import divisionHome from "../components/division/divsionHome.vue";
import divsionfront from "../components/division/divisionfirstpage.vue";
import divisioncredit from "../components/division/divisioncredit.vue";
import creditlanding from "../components/division/creditlanding.vue";
import dAllEmployee from "../components/division/dallemployee.vue";
import Notfound from "../views/Notfound.vue";
// Manager
import managerFirst from "../components/Manager/managHome.vue";
import ManagerFront from "../components/Manager/managerFront.vue";
import ManagerCreditCard from "../components/Manager/managercreditCard.vue";
import mActivity from "../components/Manager/allActivitycredit.vue";
import mAllEmployee from "../components/Manager/managerAllEmployee.vue";
// Employee
import EmpAllActivity from "../components/employee/allActivity.vue";
import EmployeeDetails from "../components/employee/emplyeedetails.vue";
import EmpAllActivityByWeek from "../components/employee/activitiesByWeek.vue";
import EmpAllActivityByMonth from "../components/employee/activitiesByMonth.vue";
import SingleEmp from "../components/Manager/single_employee.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Login
  },
  // Admin
  {
    path: "/admin",
    component: sidbar,
    name: "AdminDashboard",
    children: [
      {
        path: "",
        component: manageActivity,
        name: "ManageAdminActivity"
      },
      {
        path: "/assignbyempl",
        component: assignbyempl,
        name: "assignbyempl",
      },
      {
        path: "/newactivity",
        component: newactivity,
        name: "newactivity"
      },
      {
        path: "/editactivity",
        component: editactivity,
        name: "editactivity"
      },

      {
        path: "/operations",
        component: operations,
        name: "operations"
      }
    ]
  },
  // Division
  {
    path: "/division",
    name: "DivisionDash",
    component: sidbar,
    children: [{
        path: "",
        component: divisionHome,
        name: "divisionhome",
        children: [{
            path: "",
            component: divsionfront,
            name: "DivisionFirstpage",
          },
          {
            path: "/creditCard",
            component: divisioncredit,
            name: "divsioncredit",
          },
          {
            path: "/creditlanding",
            component: creditlanding,
            name: "divsioncreditLanding",
          }, {
            path: "/dallemployee",
            component: dAllEmployee,

          }
        ]
    }]
  },
  // Manager
  {
    path: "/manager",
    name: "managerdashboard",
    component: sidbar,
    children: [
      {
        path: "",
        component: managerFirst,
        name: "managerHomePage",
        children: 
        [
          {
            path: "",
            component: ManagerFront,
            name: "managerhome",
          }
        ]
      },
      {
        path: "/mCreditCard",
        component: ManagerCreditCard,
        name: "managercreditCard",
        children: [{
          path: "",
          component: mActivity,
          name: "managerAllactivity",
        },
        {
          path: "/MAllEmployee",
          component: mAllEmployee,
          name: "managerallEmployee"
        }
  ]
      },
      {
        path: "/empDetail",
        name: "SingleEmployee",
        component: SingleEmp
      }
    ]
  },
  // Employee
  {
    path: "/employee",
    name: "Employee",
    component: sidbar,
    children: [
      {
        path: "",
        name: "EmployeeDashboard",
        component: EmpAllActivityByWeek
      },
      {
        path: "/emplyedetails",
        name: "employee details",
        component: EmployeeDetails
      },
      {
        path: "/empAllActivitydetails",
        name: "employee week over week",
        component: EmpAllActivity
      },
      {
        path: "/EmpAllActivityByMonth",
        name: "employee week over week",
        component: EmpAllActivityByMonth
      }
    ]
  },
  // not found
  {
    path: '/:catchAll(.*)',
    component: Notfound,
    name: 'notFound',
    meta: {
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router