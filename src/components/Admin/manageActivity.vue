<template>
  <div>
    <section id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="maincontent col-lg-9">
            <div class="tab-content mainContent">
              <div id="card" class="tab-pane fade in active">
                <AdminLinks></AdminLinks>
                <div class="tabs-content main-tabs-content">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="tab-content">
                        <div id="activity" class="tab-pane fade in active">
                          <div class="manage-activity-div">
                            <div class="row">
                              <div class="col-lg-8 col-md-6 col-sm-6 col-xs-12">
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
                                    class="createActivity"
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
                                    <h4>Manager: {{userDepartmentManager}}</h4>
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
                                              <th>Assign</th>
                                              <th>Delete</th>
                                            </tr>
                                          </thead>
                                          <tbody id="assignActivity">
                                            <tr
                                              v-for="(actdata,
                                              k) in ActivityData"
                                              :key="k" class="activityRow" v-if="ActivityData[k].activity_name != undefined">

                                              <td v-if="ActivityData[k].activity_name != undefined">
                                                <select v-model="ActivityData[k].activity_name" v-on:change="onChangeActivity($event)">
                                                  <option v-for="(activity, j) in ActivityData" :key="j" v-if="activity.activity_name != undefined">
                                                    {{ activity.activity_name != undefined ?  activity.activity_name : "NA" }}
                                                  </option>
                                                </select>
                                              </td>
                                              <td v-else>
                                                NA
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
                                                    @click="preventIfMoreThanThreeChecked($event)"
                                                    type="checkbox"
                                                    :name="'age' + k + 1"
                                                    checked
                                                    v-model="actdata.my_focus"
                                                  />
                                                </div>
                                                <div class="text-center" v-else>
                                                  <input
                                                    class="myfocus"
                                                    @click="preventIfMoreThanThreeChecked($event)"
                                                    type="checkbox"
                                                    :name="'age' + k + 1"
                                                    v-model="actdata.my_focus"
                                                  />
                                                </div>
                                              </td>

                                              <td>
                                                <div class="text-center">
                                                  <p>
                                                    <i @click="editActivity(k)" class="fa fa-edit" aria-hidden="true"></i>
                                                  </p>
                                                </div>
                                              </td>
                                              <td>
                                                <div class="text-center">
                                                  <p>
                                                    <i @click="deleteActivity(k)" class="fa fa-trash" aria-hidden="true"></i>
                                                  </p>
                                                </div>
                                              </td>

                                            </tr>
                                             <tr class="tfoot">
                                            <td>
                                              <p>
                                                <strong> Total </strong>
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
                                  <div id="finishButtonDiv" style="width: fit-content;margin: 0 auto">
                                    <div class="row">
                                      <div class="col-lg-6">
                                        <p class="finishBtn">
                                          <a class="finishBtn" @click="finishActivity()">Save</a>
                                        </p>
                                      </div>
                                      <div class="col-lg-6">
                                        <p>
                                          <a id="cancel" class="cancleBtn">Cancel</a>
                                        </p>
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import $ from "jquery";
import AdminLinks from './adminLinks.vue';
import axios from "axios";
import { getSession } from "../..//assets/js/util.js";
import Swal from 'sweetalert2';


export default {
  components: {AdminLinks},
  data(){
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      //divisonsName: [],
      divisions: null,
      selectedDivision: null,

      //DepartmentNames: [],
      departments: null,
      selectedDepartment: {},

      ActivityData: [],
      totalDepart: [],
      percentage: "%",
      user: JSON.parse(getSession("user")),
      hideAssignActivity: false
    }
  },
  computed: {

    userDepartmentManager: function() {
      if (this.user != undefined) {
        let department = this.selectedDepartment;
        if (Object.keys(department).length != 0) {        
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
    addRow() {
           //start of function to get all possible activities
     const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.selectedDivision.division_id + "/departments/all/activities";

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };
  
/*
      axios
        .get(endpoint, {headers: headers})
        .then((res) => { 
          alert(res);         
          let data = res.data.data.activities;
          data.forEach(element => {
            alert(element['activity_name']);
          });
          this.ActivityData = data;
     
        });
*/
   axios
        .get(endpoint, {headers: headers})
        .then((res) => {     
                
          let data = res;
           
          
          console.log("MO: ", data);
       
        })
        .catch((err) => {
          console.log(err);
        });

     //end
    
  
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

      
        cell0.innerHTML =
        "<select><option>Application Processing</option><option>Customer<option>Account Maintainance</option><option>Collection</option><option>Bank Office</option></select>";
      cell1.innerHTML = '<div class="multiInputs"> <div class="hourMintues"> <input placeholder="" type="number" name="assigned_time" v-model="ActivityData[k].assigned_time_hr" /> <span>h</span> </div> <div class="percentageDiv"> <input type="number" name="assigned_percent" v-model="ActivityData[k].assigned_percent" /><span>%</span></div></div>';
      cell2.innerHTML = '<p> All Employee <a href="javascript:void(0)" @click="assignEmployee()"><i :class="{ "fa fa-user text-color": actdata.all_employees == true, "fa fa-user ": actdata.all_employees == false, }" aria-hidden="true" style="color: gray" ></i ></a></p>';
      cell3.innerHTML = '<div class="text-center" v-if="actdata.my_focus == true"> <input class="myfocus" @change="preventIfMoreThanThreeChecked($event)" type="checkbox" :name="age + k + 1" v-model="actdata.my_focus" /> </div>';
      cell4.innerHTML = '<div class="text-center"><p><i style="float:none;" @click="editActivity(k)" class="fa fa-edit" aria-hidden="true"></i></p></div>';
		cell5.innerHTML = '<td style="background-color: white;"><div class="text-center"><p><i style="float:none;" @click="deleteActivity(k)" class="fa fa-trash" aria-hidden="true"></i></p></div></td>';
    },
    createActivity() {
      this.$router.push("/newactivity");
      // $('.manage-activity-div').css('display', 'none');
      // $('.newActivity').css('display', 'block');
    },
    assignEmployee() {
      this.$router.push("/assignbyempl");
    },
    onChangeDivision(event) {
      let divisionID = event.target.value;
      this.divisions.forEach(element => {
        if(element.division_id === divisionID) {
          return this.selectedDivision = element;
        }
      });
      this.getDepartments(divisionID);
      this.getactivityData();
    },
    onChangeDepartment(event) {
      let departmentID = event.target.value;
      this.totalDepart.forEach(element => {
        if(element.department_id == departmentID) {
          return this.selectedDepartment = element;
        }
      });
      this.getactivityData()
    },
    editActivity(index) {
      let activity = this.ActivityData[index];
      //this.$router.push("/editactivity");
      this.$router.push({name: 'editactivity', params:{ division: this.selectedDivision, department: this.selectedDepartment, activity: activity}})      
    },
    onChangeActivity(event) {
      let activityName = event.target.value.trim().toLowerCase();
      let isExists = false;
      this.ActivityData.forEach(element => {
        if(element.activity_name == activityName) {
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
    getDivisions() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/all?format=names_ids";
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };

      axios
        .get(endpoint, {headers: headers})
        .then((res) => {          
          this.divisions =  res.data.data.divisions;
          console.log("divisions: ", res);
          this.selectedDivision = this.divisions[0];
          this.getDepartments(this.selectedDivision.division_id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDepartments(divisionID) {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+divisionID+"/departments/all";

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
});
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editActivityMapping() {      
      this.$router.push({name: 'editactivity', params:{ division: this.selectedDivision, department: this.selectedDepartment, activity: null}})  
    },

    
    async finishActivity() {

      let totalAssignedTime = this.getTotalAssignedTime;      
      console.log("total assigned: ", totalAssignedTime)
      if(totalAssignedTime > 118.5 ) {
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
          const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.selectedDivision.division_id+ "/departments/" + this.selectedDepartment.department_id+ "/activities/"+element.activity_id;
          console.log("current activity focus: ", element);
          let data = JSON.stringify(
            {
              "activity": element
            }
          );
          let result = this.updateActivityAllocation(endpoint, data, headers)

        });
      }
    },
    preventIfMoreThanThreeChecked(event) {
      if ($(".myfocus:checked").length > 3) {
        event.target.checked = false;
        event.srcElement.checked = false;
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
      console.log(event);
      console.log(event.target.checked);
      console.log(event.srcElement.checked);
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
          } else {        
            const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.selectedDivision.division_id + "/departments/" + this.selectedDepartment.department_id + "/activities/" + activity.activity_id


            const headers = {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
              "Authorization": "Token "+this.user.access_token
            };

            axios
            .delete(endpoint, {headers: headers})
            .then((res) => {          
              this.ActivityData.splice(index, 1);
              Swal.fire(
                '',
                'Activity deleted successfully',
                'error'
              );
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
    getactivityData() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.selectedDivision.division_id + "/departments/" + this.selectedDepartment.department_id + "/activities";

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
          console.log("activities data: ", data);
          console.log("current department data: ", this.selectedDepartment);
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
  },
  created() {
    this.getDivisions();
  }
}
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
#assignActivity tr td:last-child,
.activityTable tr td{
  background-color: #ffffff !important;
}
</style>