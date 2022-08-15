<template>
  <div>    
    <headerbar
      title="Setup and Administration: Credit Cards"
      v-bind:username="getUserName">
    </headerbar>

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
                                      <select id="selDivision" v-on:change="onChangeDivision($event)">
                                        <option
                                          v-for="(dname, index) in divisions"
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
                                      <select v-on:change="onChangeDepartment($event)">
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
                                      @click="editActivityMapping()"
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
                                        <table class="table table-bordered activityTable">
                                          <thead>
                                            <tr>
                                              <th>Assign Activity</th>
                                              <th>Assign Time</th>
                                              <th>Assign To</th>
                                              <th>My Focus</th>
                                              <th></th>
                                            </tr>
                                          </thead>
                                          <tbody id="assignActivity">
                                            <tr
                                              v-for="(actdata,
                                              k) in ActivityData"
                                              :key="k" class="activityRow">

                                              <td>
                                                <select v-model="ActivityData[k].activity_name" v-on:change="onChangeActivity($event)">
                                                  <option v-for="(activity, j) in ActivityData" :key="j" >
                                                    {{ activity.activity_name }}
                                                  </option>
                                                </select>
                                              </td>

                                              <td>
                                                <div class="multiInputs">
                                                  <div class="hourMintues">
                                                    <input
                                                      placeholder=""
                                                      type="number"
                                                      name="assigned_time"
                                                      v-model="ActivityData[k].assigned_time_hr"
                                                    />
                                                    <span>h</span>
                                                  </div>
                                                  <div class="percentageDiv">
                                                    <input
                                                      type="number"
                                                      name="assigned_percent"
                                                       v-model="ActivityData[k].assigned_percent"
                                                    /><span>%</span>
                                                  </div>
                                                </div>
                                              </td>

                                              <td>
                                                <p>
                                                  All Employee
                                                  <a
                                                    href="javascript:void(0)"
                                                    @click="assignEmployee()"
                                                    ><i
                                                      :class="{
                                                        'fa fa-user text-color':
                                                          actdata.all_employees ==
                                                          true,
                                                        'fa fa-user ':
                                                          actdata.all_employees ==
                                                          false,
                                                      }"
                                                      aria-hidden="true"
                                                      style="color: gray"
                                                    ></i
                                                  ></a>
                                                </p>
                                              </td>

                                              <td>
                                                <div
                                                  class="text-center"
                                                  v-if="actdata.my_focus == true">
                                                  <input
                                                    class="myfocus"
                                                    @change="preventIfMoreThanThreeChecked($event)"
                                                    type="checkbox"
                                                    :name="'age' + k + 1"
                                                    checked
                                                    v-model="ActivityData[k].my_focus"
                                                  />
                                                </div>
                                                <div class="text-center" v-else>
                                                  <input
                                                    class="myfocus"
                                                    @change="preventIfMoreThanThreeChecked($event)"
                                                    type="checkbox"
                                                    :name="'age' + k + 1"
                                                    v-model="ActivityData[k].my_focus"
                                                  />
                                                </div>
                                              </td>

                                              <td>
                                                <div class="text-center">
                                                  <p>
                                                  <i @click="editActivity(k)" class="fa fa-edit" aria-hidden="true"></i></p>
                                                  <p>
                                                  <i @click="deleteActivity(k)" class="fa fa-trash" aria-hidden="true"></i></p>
                                                </div>
                                              </td>

                                            </tr>
                                             <tr class="tfoot">
                                            <td>
                                              <p>
                                                <strong> Total </strong>
                                                Cannot exceed 100% or 8.5 h
                                              </p>
                                            </td>

                                            <td class="assign-time">
                                            <div class="multiInputs">
                                              <p class="timeParaText">{{getTotalAssignedTime}}<span>h</span></p>
                                              <p class="percentageText">{{getTotalAssignedTimeInPercent}}%</p>
                                            </div>
                                            </td>

                                            <td>
                                            </td>

                                            <td>
                                            </td>

                                            <td>
                                            </td>
                                          </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <!-- <p id="showText" class="noActivity">There are currently no activites assigned</p> -->
                                      <p @click="addRow()" class="addActivity" v-if="hideAssignActivity == false">
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
                                        <p class="finishBtn">
                                          <a class="finishBtn" @click="finishActivity()">Finish</a>
                                        </p>
                                      </div>
                                      <div class="col-lg-6">
                                        <p>
                                          <a id="cancel" class="cancleBtn">Cancel</a>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
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
    </section>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import moment from "moment";
import headerbar from "../headerbar.vue";
import { getSession } from "../..//assets/js/util.js";
import "axios-progress-bar/dist/nprogress.css";
import Swal from 'sweetalert2';

// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
export default {
  components: { headerbar },
  name: "ManageAdminActivity",
  data() {
    return {
      //divisonsName: [],
      divisions: null,
      selectedDivision: null,

      //DepartmentNames: [],
      departments: null,
      selectedDepartment: null,

      ActivityData: [],
      totalDepart: [],
      percentage: "%",
      user: JSON.parse(getSession("user")),
      hideAssignActivity: false
    };
  },

  computed: {
    

    getCurrentDateTime: function(){
        return moment().format("HH:mm - MMM, D YYYY");      
    },

    isAdmin: function() {
      //return true;
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
    },

    getTotalAssignedTime() {
      let totalAssignedTime = 0.00;
      this.ActivityData.forEach(element => {
        totalAssignedTime += parseFloat(element.assigned_time_hr);
      });
      return totalAssignedTime;
    },

    getTotalAssignedTimeInPercent() {
      let totalAssignedTimeInPercent = 0.00;
      this.ActivityData.forEach(element => {
        totalAssignedTimeInPercent += parseFloat(element.assigned_percent);
      });
      return totalAssignedTimeInPercent;
    }

  },

  methods: {
    getUserName: function () {
      if (this.user != undefined) {
        return this.user.first_name + " " + this.user.last_name;
      }
    },
    setPrecentage(information) {
      return information + "%";
    },

    preventIfMoreThanThreeChecked(event) {
      if ($(".myfocus:checked").length > 3) {
        event.target.checked = false;
        let selectedDivision = $("#selDivision option:selected").text();
        let msg = "Only 3 focus areas are allowed for " + selectedDivision;
        // $("#modal-title").html(msg);
        // $("#errorlModal").show();
        Swal.fire(
          '',
          msg,
          'error'
        );
      }
    },

    assignEmployee() {
      this.$router.push("/assignbyempl");
    },

    modalShow() {
      modal.style.display = "block";
    },

    addRow() { 
      let newActivity = {
        activity_id: "",
        activity_name: "Application Processing",
        all_employees: false,
        assigned_percent: 0,
        assigned_time: 0,
        assigned_time_hr: 0,
        my_focus: false,
      };
      this.ActivityData.push(newActivity);
    },


    createActivity() {
      //this.$router.push("/newactivity");      
      this.$router.push({name: 'newactivity', params:{ division: this.selectedDivision, department: this.selectedDepartment}})  
    },

    editActivity(index) {
      console.log("edit activity");
      let activity = this.ActivityData[index];
      //this.$router.push("/editactivity");
      this.$router.push({name: 'editactivity', params:{ division: this.selectedDivision, department: this.selectedDepartment, activity: activity}})      
    },

    deleteActivity(index) {
      let activity = this.ActivityData[index];
      
      Swal.fire({
        title: '',
        text: "Are you sure you want to delete the activity "+activity.activity_name+"?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save'
      }).then((result) => {
        if(result.isConfirmed) {
          if(activity.activity_id === '') {
            this.ActivityData.splice(index, 1);
            console.log("After Delete", this.ActivityData);
          } else {        
            const endpoint = "http://devapi.kunin.io:25000/api/v1/divisions/" + this.selectedDivision.division_id + "/departments/" + this.selectedDepartment.department_id + "/activities/" + activity.activity_id

            console.log(endpoint);

            const headers = {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
              "Authorization": "Token "+this.user.access_token
            };

            axios
            .delete(endpoint, {headers: headers})
            .then((res) => {          
              console.log("Selected Division >> ", this.selectedDivision);
              this.ActivityData.splice(index, 1);
              Swal.fire(
                '',
                'Activity deleted successfully',
                'error'
              );
              console.log(res)
            })
            .catch((err) => {
              console.log(err);
              Swal.fire(
                '',
                'Oops! something went wrong, '+err.message,
                'error'
              );
            });

          }
        }
      })
    },

    editActivityMapping() {      
      this.$router.push({name: 'editactivity', params:{ division: this.selectedDivision, department: this.selectedDepartment, activity: null}})  
    },
    
    getDivisions() {
      const endpoint = "http://devapi.kunin.io:25000/api/v1/divisions/all";
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };

      axios
        .get(endpoint, {headers: headers})
        .then((res) => {          
          this.divisions =  res.data.data.divisions;
          this.selectedDivision = this.divisions[0];
          console.log("Selected Division >> ", this.selectedDivision);
          this.getDepartments(this.selectedDivision.division_id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onChangeDivision(event) {
      let divisionID = event.target.value;
      this.divisions.forEach(element => {
        if(element.division_id === divisionID) {
          return this.selectedDivision = element;
        }
      });
      console.log("Selected Division >> ", this.selectedDivision);
      this.getDepartments(divisionID);
    },

    getactivityData() {
      const endpoint = "http://devapi.kunin.io:25000/api/v1/divisions/" + this.selectedDivision.division_id + "/departments/" + this.selectedDepartment.department_id + "/activities";

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };

      axios
        .get(endpoint, {headers: headers})
        .then((res) => {          
          let data = res.data.data.activities;
          
          data.forEach(element => {
            element['assigned_time_hr'] = element.assigned_time/60;
          });
          this.ActivityData = data;
          console.log("Activity Data >> ",this.ActivityData);
        }).then(()=>{
          
          document.querySelectorAll(".percentageDiv input").forEach(function(elm){  
              let elmWidth = (elm.value.length + 1) * 7 
              elm.style.width += elmWidth + "px"
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getDepartments(divisionID) {
      const endpoint = "http://devapi.kunin.io:25000/api/v1/divisions/"+divisionID+"/departments/all";

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };
      axios
        .get(
          endpoint, {headers: headers}
        )
        .then((res) => {          
          this.totalDepart = res.data.data.departments;
          this.selectedDepartment = this.totalDepart[0]; 
          this.getactivityData();  
        }).then(()=>{
          document.querySelectorAll(".hourMintues input").forEach(function(elm){
    console.log(elm.value.length)
});
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onChangeDepartment(event) {
      let departmentID = event.target.value;
      this.totalDepart.forEach(element => {
        if(element.department_id === departmentID) {
          return this.selectedDepartment = element;
        }else {
          this.selectedDepartment = null;
        }
      });
      console.log("Selected Department >> ", this.selectedDepartment);
    },

    onChangeActivity(event) {
      let activityName = event.target.value.trim().toLowerCase();
      let isExists = false;
      this.ActivityData.forEach(element => {
        if(element.activity_name.trim().toLowerCase() === activityName) {
          isExists = true;
          
        }
      });
      if(isExists) {
        Swal.fire(
          'Duplicate Activity',
          'Selected Activity already exists',
          'error'
        );
      }
    },

    async finishActivity() {

      let totalAssignedTime = this.getTotalAssignedTime;      

      if(totalAssignedTime > 8.5 ) {
        Swal.fire(
          '',
          "Total Assigned Time can not be more than 8.5 hours",
          'error'
        );
      }else {
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Token "+this.user.access_token
        };
        

        this.ActivityData.forEach(element => {
          const endpoint = "http://devapi.kunin.io:25000/api/v1/divisions/" + this.selectedDivision.division_id+ "/departments/" + this.selectedDepartment.department_id+ "/activities/"+element.activity_id;

          let data = JSON.stringify(
            {
              "activity": {
                "assigned_time": element.assigned_time_hr * 60
              }
            }
          );
          console.log("Data > ", data);
          let result = this.updateActivityAllocation(endpoint, data, headers)
          console.log("Result > ", result);

        });
      }
    },

    async updateActivityAllocation(endpoint, data, headers) {
      await axios
      .patch(
        endpoint, data, {headers: headers}
      )
      .then((res) => {          
        console.log("Inside async > ", res);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  },

  created() {
    document.querySelectorAll(".hourMintues input").forEach(function(elm){
    console.log(elm.value.length)
});
    this.getDivisions();
  },
};
</script>
<style scoped>
.totalDiv .timeParaText {
    font-size: 15px;
    padding: 0px 30px !important;
}

#activity p {
  display: inline-block;
}

.totalDiv {
  display: block;
}

.activityTable tr td{
  background-color: #ffffff !important;
}
</style>
