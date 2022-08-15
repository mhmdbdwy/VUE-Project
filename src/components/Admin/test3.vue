<template>
  <div>
    <!-- <section id="main">
         <div class="container-fluid">
            <div class="row">
               <div class="maincontent col-lg-9">
                  <div class="main_header">
                     <div class="container-fluid">
                        <div class="row">
                           <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12">
                              <p>Setup and Administration: Credit Cards</p>
                           </div>
                           <div class="user-profile-name">
                           <div class="col-lg-4 col-md-4 col-sm-6 col-xs-4">
                              <p class="loginText"><i class="fa fa-user-circle-o" aria-hidden="true"></i> Harold james</p>
                           </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>        
      </section> -->
    
    <section id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="maincontent col-lg-9">
            <div class="tab-content mainContent">
              <div id="card" class="tab-pane fade in active">
                <div class="tabs-Div">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-12">
                        <ul class="nav nav-tabs">
                          <li class="active" v-if="isManager || isAdmin">
                            <router-link data-toggle="tab" to="/admin"
                              >Manage Activities</router-link
                            >
                          </li>
                          <li v-if="isAdmin">
                            <router-link data-toggle="tab" to="/operations"
                              >Operations</router-link
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tabs-content main-tabs-content">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="tab-content">
                          <div id="activity" class="tab-pane fade in active">
                            <div class="manage-activity-div">
                              <div class="row">
                                <div
                                  class="col-lg-8 col-md-6 col-sm-6 col-xs-12"
                                >
                                  <div class="selectDiv">
                                    <div class="departmentSelect">
                                      <label>Division</label>
                                      <select>
                                        <option
                                          v-for="(dname, index) in divisonsName"
                                          :key="index"
                                          :value="dname.division_id"
                                        >
                                          {{ dname.division_name }}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div class="selectDiv">
                                    <div class="departmentSelect">
                                      <label>Department</label>
                                      <select>
                                        <option
                                          v-for="(dname, index) in totalDepart"
                                          :key="index"
                                          :value="dname.department_id"
                                        >
                                          {{ dname.department_name }}
                                        </option>
                                      </select>
                                    </div>
                                    <div class="assignBySelect">
                                      <label>Assign By</label>
                                      <select @change="assignEmployee()">
                                        <option>Employee</option>
                                        <option>Activity</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                                >
                                  <div class="create-new-activity">
                                    <button
                                      @click="createActivity()"
                                      class="createActivity"
                                    >
                                      Create New Activity
                                    </button>
                                    <button
                                      class="editActivityText"
                                      @click="editActivity()"
                                    >
                                      Edit Activity Mapping
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div class="assignActivityDiv">
                                <!---- Credit Card Div Start-->
                                <div class="row">
                                  <div class="col-lg-12">
                                    <h4>Credit Cards</h4>
                                    <p>Manager: {{userDepartmentManager}}</p>
                                  </div>
                                </div>
                                <!-- <button class="btn btn-in"  data-toggle="modal" data-target="#deleteModal2">Click</button> -->
                                <div class="tableDiv">
                                  <div class="row">
                                    <div class="col-lg-12">
                                      <div class="table-responsive">
                                        <table class="table table-bordered">
                                          <thead>
                                            <tr>
                                              <th>Employee Name</th>
                                              <th>Assigned Activity</th>
                                              <th colspan="2">
                                                Defined Target For All
                                              </th>
                                              <th colspan="2">Unique Target</th>
                                            </tr>
                                          </thead>
                                          <!-- {{ActivityData}} -->
                                          <tbody
                                            id="assignActivity"
                                            v-for="(actdata, k) in ActivityData"
                                            :key="k"
                                          >
                                            <tr>
                                              <td class="firstTd">
                                                {{ actdata.first_name }}
                                                {{ actdata.last_name }}
                                                <i
                                                  class="fa fa-user"
                                                  aria-hidden="true"
                                                ></i>
                                              </td>

                                              <td class="commonTd rightBorder">
                                                <tr
                                                  v-for="(j,
                                                  k) in actdata.activities"
                                                  :key="k"
                                                >
                                                  <td>
                                                    {{ j.activity_name }}
                                                  </td>
                                                </tr>
                                              </td>

                                              <td class="commonTd">
                                                <tr
                                                  v-for="(j,
                                                  k) in actdata.activities"
                                                  :key="k"
                                                >
                                                  <td>
                                                    {{
                                                      j.general_target
                                                        .assigned_time
                                                    }}
                                                  </td>
                                                </tr>
                                              </td>

                                              <td
                                                class="text-center commonTd rightBorder"
                                              >
                                                <tr
                                                  v-for="(j,
                                                  k) in actdata.activities"
                                                  :key="k"
                                                >
                                                  <td>
                                                    {{
                                                      j.general_target
                                                        .assigned_percentage
                                                    }}
                                                    %
                                                  </td>
                                                </tr>
                                              </td>

                                              <td class="text-center commonTd">
                                                <tr
                                                  v-for="(j,
                                                  k) in actdata.activities"
                                                  :key="k"
                                                >
                                                  <td
                                                    class="text-left"
                                                    style="
                                                      padding: 10px 0 7px 0;
                                                    "
                                                  >
                                                    <input
                                                      type="text"
                                                      :value="
                                                        j.unique_target
                                                          .assigned_time
                                                      "
                                                      style="
                                                        width: 40px;
                                                        border: 0;
                                                      "
                                                      @mouseleave="
                                                        getTotalDefinedTargetTimeByEmp()
                                                      "
                                                    />
                                                  </td>
                                                </tr>
                                              </td>

                                              <td class="text-center commonTd">
                                                <tr
                                                  v-for="(j,
                                                  k) in actdata.activities"
                                                  :key="k"
                                                >
                                                  <td
                                                    class="text-left"
                                                    style="
                                                      padding: 10px 0 7px 0;
                                                    "
                                                  >
                                                    <input
                                                      type="text"
                                                      :value="
                                                        j.unique_target
                                                          .assigned_percentage
                                                      "
                                                      style="
                                                        width: 40px;
                                                        border: 0;
                                                      "
                                                    />
                                                    %
                                                  </td>
                                                </tr>
                                              </td>
                                            </tr>

                                            <tr class="rowBackground">
                                              <td colspan="2">
                                                <strong> Total </strong>
                                                "Cannot exceed 100% or 8.5 h"
                                              </td>

                                              <td class="text-center">
                                                {{
                                                  totalDefineTargetTimeByEmp[k]
                                                }}
                                              </td>

                                              <td class="text-center">
                                                {{
                                                  totalDefineTargetTimePercentByEmp[
                                                    k
                                                  ]
                                                }}
                                              </td>

                                              <td class="text-center">
                                                {{
                                                  totalUniqueTargetTimeByEmp[k]
                                                }}
                                              </td>

                                              <td class="text-center">
                                                {{
                                                  totalUniqueTargetTimePercentByEmp[
                                                    k
                                                  ]
                                                }}
                                              </td>
                                            </tr>

                                            <p
                                              @click="addRow()"
                                              class="addActivity"
                                            >
                                              <i
                                                class="fa fa-plus-circle"
                                                aria-hidden="true"
                                              ></i>
                                              Assign Activity
                                            </p>
                                          </tbody>

                                          <!-- <tfoot class="">
                                                                <tr>
                                                                <td colspan="2"> 
                                                                        <strong>
                                                                        Total
                                                                        </strong>
                                                                        "Cannot exceed 100% or 8.5 h"
                                                                     </td>
                                                                <td class="text-center">6 h 30 m</td>
                                                                <td class="text-center">75%</td>
                                                               <td class="text-center">6 h 30 m</td>
                                                                <td class="text-center">75%</td>
                                                                </tr>
                                                            </tfoot> -->
                                        </table>
                                      </div>
                                      <div
                                        id="totalShowDiv"
                                        class="totalDiv table-responsive"
                                      >
                                        <table>
                                          <tr class="rowBackground">
                                            <td colspan="3">
                                              <p>
                                                <strong>Total</strong>
                                                "Cannot exceed 100% or 8.5 h"
                                              </p>
                                            </td>

                                            <td>
                                              <p class="timeParaText">5h</p>
                                            </td>

                                            <td>
                                              <p class="percentageText">25%</p>
                                            </td>

                                            <td></td>
                                          </tr>
                                        </table>
                                      </div>
                                      <!-- <p id="showText" class="noActivity">There are currently no activites assigned</p> -->
                                      <!-- <p @click="addRow()" class="addActivity"><i class="fa fa-plus-circle" aria-hidden="true"></i> Assign Activity</p> -->
                                    </div>
                                  </div>
                                  <!-- <div id="finishButtonDiv">
                                                      <div class="row">
                                                         <div class="col-lg-6">
                                                            <p>
                                                               <a class="finishBtn">Finish</a>
                                                            </p>
                                                         </div>
                                                         <div class="col-lg-6">
                                                            <p @click="closeDiv()">
                                                               <a class="cancleBtn">Cancel</a>
                                                            </p>
                                                         </div>
                                                      </div>
                                                   </div> -->
                                  <hr />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- </div>
         </div> -->
    </section>
    <!-- modal -->

    <!-- end moadl -->
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import { getSession } from "../../assets/js/util.js";
import "axios-progress-bar/dist/nprogress.css";
import moment from "moment";

// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

export default {
  name: "assignbyempl",
  data() {
    return {
      divisonsName: [],
      DepartmentNames: [],
      ActivityData: [],
      totalDepart: [],
      percentage: "%",
      totalDefineTargetTimeByEmp: [],
      totalDefineTargetTimePercentByEmp: [],
      totalUniqueTargetTimeByEmp: [],
      totalUniqueTargetTimePercentByEmp: [],
      user: JSON.parse(getSession("user")),
    };
  },

  computed: {
    
    getCurrentDateTime: function(){
        return moment().format("HH:mm - MMM, D YYYY");      
    },

    isAdmin: function() {
      // return true;
      if (this.user != undefined) {        
        return this.user.admin; 
      } else{
        return false;
      }
    },

    isManager: function() {
      if (this.user != undefined) {
        if (this.user.employee_type.trim().toLowerCase() === "manager") {        
          return true;
        }else {
          return false;
        }
      } else {
        return false;
      }      
    },

    userDepartmentName: function() {
      if (this.user != undefined) {
        let department = this.user.department;
        if (Object.keys(department).length === 0 && typeof department === 'object') {        
          return department.department_name;
        }else {
          return "";
        }
      } else {
        return "";
      }  
    },

    userDivisionName: function() {
      if (this.user != undefined) {
        let division = this.user.division;
        if (Object.keys(division).length === 0 && typeof division === 'object') {        
          return division.division_name;
        }else {
          return "";
        }
      } else {
        return "";
      }  
    },

    userDepartmentManager: function() {
      if (this.user != undefined) {
        let department = this.user.department;
        if (Object.keys(department).length != 0 && typeof department === 'object') {        
          return department.manager.first_name + " " + department.manager.last_name;
        }else {
          return "";
        }
      } else {
        return "";
      }  
    }

  },

  methods: {
    getUserName: function () {
        if (this.user != undefined) {
        return this.user.first_name + " " + this.user.last_name;
        }
    },

    getTotalDefinedTargetTimeByEmp() {
      console.log(this.ActivityData);
      for (let i = 0; i < this.ActivityData.length; i++) {
        let activities = this.ActivityData[i].activities;
        let totalTime = 0;
        for (let j = 0; j < activities.length; j++) {
          totalTime += activities[j].general_target.assigned_time;
        }
        let q = totalTime / 60;
        let r = totalTime % 60;

        this.totalDefineTargetTimeByEmp.push(q + "h " + r + "m");
      }

      for (let i = 0; i < this.ActivityData.length; i++) {
        let activities = this.ActivityData[i].activities;
        let totalTimePercent = 0.0;
        for (let j = 0; j < activities.length; j++) {
          totalTimePercent += parseFloat(
            activities[j].general_target.assigned_percentage
          );
        }

        this.totalDefineTargetTimePercentByEmp.push(totalTimePercent + "%");
      }

      for (let i = 0; i < this.ActivityData.length; i++) {
        let activities = this.ActivityData[i].activities;
        let totalTime = 0;
        for (let j = 0; j < activities.length; j++) {
          totalTime += activities[j].unique_target.assigned_time;
        }
        let q = totalTime / 60;
        let r = totalTime % 60;

        this.totalUniqueTargetTimeByEmp.push(q + "h " + r + "m");
      }

      for (let i = 0; i < this.ActivityData.length; i++) {
        let activities = this.ActivityData[i].activities;
        let totalTimePercent = 0;
        for (let j = 0; j < activities.length; j++) {
          totalTimePercent += parseFloat(
            activities[j].unique_target.assigned_percentage
          );
        }

        this.totalUniqueTargetTimePercentByEmp.push(totalTimePercent + "%");
      }
    },

    assignEmployee() {
      this.$router.push("/admin");
    },

    setPrecentage(information) {
      return information + "%";
    },

    modalShow() {
      modal.style.display = "block";
    },

    //   deleteRow(){
    //   document.getElementById('menuShow').style.display="none";
    // },

    addRow() {
      // document.getElementById('showText').style.display="none";
      // document.getElementById('finishButtonDiv').style.display="block";
      // document.getElementById('totalShowDiv').style.display="block";
      // var table = document.getElementById("assignActivity");

      var table = document.getElementById("assignActivity");
      var row = table.insertRow(0);
      var cell0 = row.insertCell(0);

      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);

      cell0.innerHTML = "<td></td>";
      cell1.innerHTML =
        "<select><option>Application Processing</option><option>Customer<option>Account Maintainance</option><option>Collection</option><option>Bank Office</option></select>";
      cell2.innerHTML =
        '<div class="multiInputs"><div class="hourMintues"><input placeholder="h" type="number" name=""></div></div>';
      cell3.innerHTML =
        '<div class="multiInputs"><div class="percentageDiv"><input placeholder="25%" type="number" name=""></div></div>';
      cell4.innerHTML =
        '<div class="multiInputs"><div class="hourMintues"><input placeholder="h" type="number" name=""></div></div>';
      cell5.innerHTML =
        '<div class="multiInputs"><div class="percentageDiv"><input placeholder="25%" type="number" name=""></div></div>';
    },

    createActivity() {
      this.$router.push("/newactivity");
      // $('.manage-activity-div').css('display', 'none');
      // $('.newActivity').css('display', 'block');
    },

    addLoanRow() {
      var table = document.getElementById("loanAssignActivity");
      document.getElementById("showLoanText").style.display = "none";
      document.getElementById("finishLoanButtonDiv").style.display = "block";
      document.getElementById("totalLoanShowDiv").style.display = "block";
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      cell1.innerHTML =
        "<select><option>Application Processing</option><option>Customer<option>Account Maintainance</option><option>Collection</option><option>Bank Office</option></select>";
      cell2.innerHTML =
        '<div class="multiInputs"><div class="hourMintues"><input placeholder="h" type="text" name=""><input placeholder="m" type="text" name=""></div><div class="percentageDiv"><input placeholder="25%" type="text" name=""></div></div>';
      cell3.innerHTML =
        '<p>All Employee <i class="fa fa-user" aria-hidden="true"></i></p>';
      cell4.innerHTML =
        '<div class="text-center"><input type="radio" id="age1" name="age" value="30"></div>';
      cell5.innerHTML =
        '<div class="text-center"><i id="moreButton" @click="openMenu" class="fa fa-ellipsis-v" aria-hidden="true"></i></div>';
    },

    closeDiv() {
      document.getElementById("finishButtonDiv").style.display = "none";
    },

    closeLoanDiv() {
      if (
        document.getElementById("finishAllocationButtonDiv").style.display ==
        "block"
      ) {
        document.getElementById("finishAllocationButtonDiv").style.display =
          "none";
      }
      if (
        document.getElementById("finishLoanButtonDiv").style.display == "block"
      ) {
        document.getElementById("finishLoanButtonDiv").style.display = "none";
      }

      if (
        document.getElementById("finish-exsisting-location").style.display ==
        "block"
      ) {
        document.getElementById("finish-exsisting-location").style.display =
          "none";
      }
    },

    openMenu() {
      if (document.getElementById("menuShow").style.display == "block") {
        document.getElementById("menuShow").style.display = "none";
      } else {
        document.getElementById("menuShow").style.display = "block";
      }
    },

    editActivity() {
      console.log("edit activity");
      this.$router.push("/editactivity");
      // $('.manage-activity-div').css('display', 'none');
      // $('.editActivity').css('display', 'block');
    },

    addAllocation() {
      document.getElementById("finishAllocationButtonDiv").style.display =
        "block";
      $(".addAllocationDiv").append(
        '<div class="custom-select"><select><option value="0">Application Processing</option><option value="1">Audi</option><option value="2">BMW</option><option value="3">Citroen</option><option value="4">Ford</option></select><span @click="removedropDown(this)" class="removeText">Remove</span></div>'
      );
    },

    addExsistingAllocation() {
      document.getElementById("finish-exsisting-location").style.display =
        "block";
      $(".select-exsisting").append(
        '<div class="custom-select"><select  class="select-form"><option value="0">Application Processing</option><option value="1">Audi</option><option value="2">BMW</option><option value="3">Citroen</option><option value="4">Ford</option></select><span @click="removedropDown(this)" class="removeText">Remove</span></div>'
      );
    },

    addCustomEntryDiv() {
      $(".create-customentry").append(
        '<div class="custom-field-div"><input type="text" name="custom-field" class="input-form"><span @click="removedropDown(this)" class="removeText">Remove</span></div>'
      );
    },

    removedropDown(x) {
      $(x).parent().remove();
    },

    addCustomEntry() {
      $(".custom-field").append(
        '<div class="custom-field-div"><input type="text" name="custom-field"><span @click="removedropDown(this)" class="removeText">Remove</span></div>'
      );
    },

    getDivisions() {
      axios
        .get("http://devapi.kunin.io:25000/api/v1/v0/divisions?format=names_ids")
        .then((res) => {
          this.divisonsName = res.data.data;
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getactivityData() {
      axios
        .get(
          "http://devapi.kunin.io:25000/api/v1/v0/divisions/9da53e80-c141-11ea-b3de-0242ac130004/departments/all/activities?by=employee"
        )
        .then((res) => {
          // console.log(res.data.data);
          let respdata = res.data.data[0].employees;
          console.log("rest: ", respdata)
          console.log("all data: ", res)
          let empdata = [];
          respdata.forEach((element) => {
            empdata = element.departments;
          });
          let userdetails =  []
          empdata.forEach((single) => {
            userdetails = single.employees;
          });
          this.ActivityData = respdata;
          this.getTotalDefinedTargetTimeByEmp();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getDepartments() {
      axios
        .get(
          "http://devapi.kunin.io:25000/api/v1/v0/divisions/9da53e80-c141-11ea-b3de-0242ac130004/departments"
        )
        .then((res) => {
          let dpt = res.data.data;
          let dptarry = [];
          dpt.forEach((el) => {
            if (el.departments.length > 0) {
              dptarry = el.departments;
              console.log(el.departments);
            }
          });
          this.totalDepart = dptarry;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteModal() {
      $("#deleteModal").modal("show");
    },
  },

  created() {
    this.getDivisions();
    this.getDepartments();
    this.getactivityData();
  },
};
</script>

<style lang="css" scoped>
  #main .maincontent #card .tabs-content .assignActivityDiv .tableDiv {
    max-width: 80% !important;
  }
</style>