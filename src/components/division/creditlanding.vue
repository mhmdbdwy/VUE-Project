<template>
  <div>
    <div id="card" class="tab-pane fade in active">
      <div class="tabs-Div">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <ul class="nav nav-tabs">
                <li class="active">
                  <router-link data-toggle="tab" to="/admin"
                    >Manage Activities</router-link
                  >
                </li>
                <li>
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
                      <div class="col-lg-8 col-md-6 col-sm-6 col-xs-12">
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
                            <select>
                              <option>Activity</option>
                              <option>Employee</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
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
                          <p>Manager: Harold James</p>
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
                                    <th class="text-center">Assign Activity</th>
                                    <th class="text-center">Assign Time</th>
                                    <th class="text-center">Assign To</th>
                                    <th class="text-center">My Focus</th>
                                  </tr>
                                </thead>
                                <tbody id="assignActivity">
                                  <tr
                                    v-for="(actdata, k) in ActivityData"
                                    :key="k"
                                  >
                                    <td class="text-center">
                                      <select>
                                        <option value="">
                                          {{ actdata.activity_name }}
                                        </option>
                                        <option>Application Processing</option>
                                        <option>Customer</option>
                                        <option>Account Maintainance</option>
                                        <option>Collection</option>
                                        <option>Bank Office</option>
                                      </select>
                                    </td>
                                    <td class="text-center">
                                      <div class="multiInputs">
                                        <div class="hourMintues">
                                          <input
                                            placeholder="h"
                                            type="number"
                                            name=""
                                            :value="actdata.assigned_time"
                                          />
                                          <input
                                            placeholder="m"
                                            type="number"
                                            name=""
                                          />
                                        </div>
                                        <div class="percentageDiv">
                                          <input
                                            type="text"
                                            name=""
                                            :value="
                                              setPrecentage(
                                                actdata.assigned_percent
                                              )
                                            "
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td class="text-center">
                                      <p>
                                        All Employee
                                        <i
                                          :class="{
                                            'fa fa-user text-color':
                                              actdata.all_employees == true,
                                            'fa fa-user ':
                                              actdata.all_employees == false,
                                          }"
                                          aria-hidden="true"
                                        ></i>
                                      </p>
                                    </td>
                                    <td class="text-center">
                                      <div
                                        class="text-center"
                                        v-if="actdata.my_focus == true"
                                      >
                                        <input
                                          type="radio"
                                          :name="'age' + k + 1"
                                          checked
                                        />
                                      </div>
                                      <div class="text-center" v-else>
                                        <input
                                          type="radio"
                                          :name="'age' + k + 1"
                                        />
                                      </div>
                                    </td>
                                    <td class="text-center">
                                      <div class="text-center">
                                        <i
                                          @click="openMenu()"
                                          class="fa fa-ellipsis-v"
                                          aria-hidden="true"
                                        ></i>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div
                              id="totalShowDiv"
                              class="totalDiv table-responsive"
                            >
                              <table>
                                <tr>
                                  <td class="text-center">
                                    <p>
                                      <strong> Total </strong>
                                      "Cannot exceed 100% or 8.5 h"
                                    </p>
                                  </td>
                                  <td class="text-center">
                                    <p class="timeParaText">5h</p>
                                  </td>
                                  <td class="text-center">
                                    <p class="percentageText">25%</p>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!-- <p id="showText" class="noActivity">There are currently no activites assigned</p> -->
                            <p @click="addRow()" class="addActivity">
                              <i
                                class="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>
                              Assign Activity
                            </p>
                          </div>
                        </div>
                        <div id="finishButtonDiv">
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
                        </div>
                        <div id="menuShow" class="menuDiv">
                          <ul>
                            <li
                              onclick="document.getElementById('deleteModal').style.display='block'"
                              @click="openMenu()"
                            >
                              <i class="fa fa-trash-o" aria-hidden="true"></i>
                              Delete Activity
                            </li>
                            <li @click="editActivity()">
                              <i
                                class="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                              Edit Activity
                            </li>
                          </ul>
                        </div>
                        <hr />
                      </div>

                      <div
                        id="deleteModal"
                        class="modal fade in"
                        role="dialog"
                        style="display: none"
                      >
                        <div class="modal-dialog">
                          <!-- Modal content-->
                          <div class="modal-content">
                            <div class="modal-header">
                              <button
                                type="button"
                                class="close"
                                onclick="document.getElementById('deleteModal').style.display='none'"
                              >
                                Close
                              </button>
                            </div>
                            <div class="modal-body">
                              <h4 class="modal-title">
                                Are you sure you want to delete this activity?
                              </h4>
                              <p></p>
                              <div class="buttonDiv">
                                <div class="container-fluid p-0">
                                  <div class="row">
                                    <div class="col-lg-12">
                                      <div class="finishButtonDiv">
                                        <a
                                          onclick="document.getElementById('deleteModal').style.display='none'"
                                          >Yes, Delete Activity</a
                                        >
                                        <a
                                          onclick="document.getElementById('deleteModal').style.display='none'"
                                          class="cancelDelete"
                                          >Cancel</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Delete Modal End -->
                      </div>
                      <!-- ingin enf -->
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
</template>
<script>
import $ from "jquery";
import axios from "axios";
import { getSession } from "../..//assets/js/util.js";

export default {
  name: "divsioncreditLanding",
  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      divisonsName: [],
      DepartmentNames: [],
      ActivityData: [],
      totalDepart: [],
      percentage: "%",
      user: JSON.parse(getSession("user")),
    };
  },

  methods: {
    setPrecentage(information) {
      return information + "%";
    },
    //   deleteRow(){
    //   document.getElementById('menuShow').style.display="none";
    // },
    addRow() {
      //   document.getElementById('showText').style.display="none";
      document.getElementById("finishButtonDiv").style.display = "block";
      document.getElementById("totalShowDiv").style.display = "block";
      var table = document.getElementById("assignActivity");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      cell1.innerHTML =
        "<select><option>Application Processing</option><option>Customer<option>Account Maintainance</option><option>Collection</option><option>Bank Office</option></select>";
      cell2.innerHTML =
        '<div class="multiInputs"><div class="hourMintues"><input placeholder="h" type="number" name=""><input placeholder="m" type="number" name=""></div><div class="percentageDiv"><input placeholder="25%" type="number" name=""></div></div>';
      cell3.innerHTML =
        '<p>All Employee <i class="fa fa-user" aria-hidden="true"></i></p>';
      cell4.innerHTML =
        '<div class="text-center"><input type="radio" id="age1" name="age" value="30"></div>';
      cell5.innerHTML =
        '<div class="text-center"><i @click="openMenu()" class="fa fa-ellipsis-v" aria-hidden="true"></i></div>';
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
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/all";
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };
      axios
        .get(
          endpoint,
          {headers: headers}
        )
        .then((res) => {
          this.divisonsName = res.data.data;
           console.log("the data: ",res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getactivityData() {
      console.log("hello");
      axios
        .get(
          "http://" + this.envurl + "/api/v1/v0/divisions/9da53e80-c141-11ea-b3de-0242ac130004/departments/9da53e80-c141-11ea-b3de-0242ac130004/activities"
        )
        .then((res) => {
          // console.log(res.data.data);
          this.ActivityData = res.data.data.activities;
          console.log('the date: ' , res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDepartments() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/departments";
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };
      axios
        .get(
          endpoint,
          {headers: headers}
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
.tableDiv {
  overflow: auto;
}
</style>

