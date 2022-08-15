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
                              <p>Setup and Administration</p>
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
            <div class="mainContent">
              <div id="card" class="">
                <AdminLinks></AdminLinks>
                <div class="tabs-content main-tabs-content">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="tab-content">
                          <div id="activity" class="tab-pane fade active in">
                            <!--  Edit Screen -->
                            <div class="editActivity" style="display: block">
                              <div class="container-fluid p-0">
                                <div class="row">
                                  <div class="col-lg-12">
                                    <h4>Select Division and Department for Mapping</h4>
                                  </div>
                                </div>
                                <div class="drop-down-div">
                                  <div class="row">
                                    <div class="col-lg-6">
                                      <p class="same-text-label">DIVITION</p>
                                      <select
                                        class="select-form"
                                        style="color: #12727d"
                                        v-on:change="onChangeDivision($event)"
                                      >
                                        <option
                                          v-for="(division,
                                          index) in divisonsName"
                                          :key="index"
                                          :value="division.division_id"
                                          >
                                          {{ division.division_name }}
                                        </option>
                                      </select>
                                    </div>
                                    <div class="col-lg-6">
                                      <p class="same-text-label">DEPARTMENT</p>
                                      <select
                                        class="select-form"
                                        style="color: #12727d"
                                        v-on:change="onChangeDepartment($event)"
                                      >
                                        <option value="all">All</option>
                                        <option
                                          v-for="(dname, index) in totalDepart"
                                          :key="index"
                                          :value="dname.department_id"
                                        >
                                          {{ dname.department_name }}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div class="drop-down-div">
                                  <div class="row">
                                    <div class="col-lg-12">
                                      <p class="same-text-label">Select Activity</p>
                                      <select class="select-form form-control" v-on:change="gitActivities($event)">
                                        <option
                                          value=""
                                          v-for="(actdata, k) in ActivityData"
                                          :key="k"
                                        >
                                          {{ actdata.activity_name }}
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                    <!-- {{Allocations}} -->
                                    
                                  <h4>Map Windows</h4>
                                  <div class="row" style="margin-top: 0">
                                    <div class="col-lg-5">
                                    <h5 class="text-center">Available Windows</h5>
                                      <div class="box-option-list list-items-left">
                                        <ul>
                                          <li v-for="item in leftList" @click="moveItemRight(item.id)" :key="item.id">{{ item.text }}</li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div class="col-lg-2"></div>
                                    <div class="col-lg-5">
                                    <h5 class="text-center">Mapped Windows</h5>
                                      <div class="box-option-list list-items-right">
                                        <ul>
                                          <li v-for="item in rightList" @click="moveItemLeft(item.id)" :key="item.id">{{ item.text }}</li>
                                        </ul>
                                      </div>
                                    </div>
              
                                    <div class="col-lg-12">
                                      <p>Create Custom Entry</p>
                                      <div class="create-customentry row">
                                        <div class="custom-field-div col-lg-6">
                                          <input
                                            type="text"
                                            name="custom-field"
                                            class="input-form"
                                            id="customListItemEA"
                                          />
                                        </div>
                                        <div class="col-lg-3">
                                          <button class="AddEntryCustomly" @click="addToList">Add Entry</button>
                                        </div>
                                      </div>
                                      
                                    </div>
                                  </div>
                                  <div id="finishAllocationButtonDiv" style="width: fit-content;margin: 10px auto 0">
                                        <div class="row">
                                          <div class="col-lg-6">
                                            <p>
                                              <a
                                                v-on:click="onFinsh()"
                                                class="finishBtn"
                                                >Save</a
                                              >
                                            </p>
                                          </div>
                                          <div class="col-lg-6">
                                            <!-- <p onclick="closeLoanDiv()"> -->
                                            <p>
                                              <a
                                                onclick="document.getElementById('cancelModal1').style.display='block'"
                                                class="cancleBtn"
                                                >Cancel</a
                                              >
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
import axios from "axios";
import moment from "moment";
import AdminLinks from './adminLinks.vue';
import { getSession } from "../..//assets/js/util.js";
import "axios-progress-bar/dist/nprogress.css";
import Swal from 'sweetalert2';

export default {
  name: "editactivity",
  components: {AdminLinks},
  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      changeHasDone: 0,
      leftList: [
          {
            id: '123',
            text: 'option 1'
          },
          {
            id: '133',
            text: 'option 2'
          },
          {
            id: '143',
            text: 'option 3'
          }
        ],
        rightList: [
          {
            id: '223',
            text: 'option 21'
          },
          {
            id: '233',
            text: 'option 22'
          },
          {
            id: '243',
            text: 'option 23'
          }
        ],
      selectedDepartment: null,
      selectedActivitiesID: null,
      selectedDivision: null,
      totalOperations: [],
      divisonsName: [],
      totalDepart: [],
      selected: "all",
      Allocations: [],
      selectOptions: [
        {
          selectAllocation: "",
        },
      ],
      customEntry: [
        {
          custom: "",
        },
      ],
      actvityName: "",
      division_id: "",
      dept_id: "6aa1a220-c142-11ea-b3de-0242ac130004",
      allocationName: [],

      DepartmentNames: [],
      ActivityData: [],

      percentage: "%",
      user: JSON.parse(getSession("user")),
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
    }

  },

  methods: {
    addToList() {
       let input = document.getElementById("customListItemEA");
       let id = Math.random() * 100;
       let listItem = {
         id: id,
         text: input.value
       }
       this.leftList.push(listItem);
     },
    moveItemRight: function(item){
      this.changeHasDone += 1;
       let z;
       let x = this.leftList.filter(i => {
         if(i.id == item){
           z = i;
           return false;
         }else{
           return true;
         }
       });
       this.leftList = x;
       this.rightList.push(z);
     },
     moveItemLeft: function(item){
       this.changeHasDone += 1;
       let z;
       let x = this.rightList.filter(i => {
         if(i.id == item){
           z = i;
           return false;
         }else{
           return true;
         }
       });
       this.rightList = x;
       this.leftList.push(z);
     },
    gitActivities(e){
      this.selectedActivitiesID = e.target.value;
    },
    onChangeDepartment(event) {
      let department = null;
      let departmentID = event.target.value;
      if(departmentID == "all"){
        this.selectedDepartment = {department_id: "all"}
      }else{
        this.totalDepart.forEach(element => {
          if(element.department_id === departmentID) {
            department = element;
          }
        });
        this.selectedDepartment = department;
      }
      this.getactivityData();
    },
    onChangeDivision(event) {
      let divisionID = event.target.value;
      this.divisonsName.forEach(element => {
        if(element.division_id === divisionID) {
          return this.selectedDivision = element;
        }
      });
      this.getDepartments(divisionID);
    },
    getUserName: function () {
        if (this.user != undefined) {
            return this.user.first_name + " " + this.user.last_name;
        }
    },
    addAlloc() {
      this.selectOptions.push({ selectAllocation: "" });
    },
    removeAlloc(index) {
      this.selectOptions.splice(index, 1);
    },
    removeCustom(index) {
      this.customEntry.splice(index, 1);
    },

    createActivity() {
      this.$router.push("/newactivity");
    },
    addCustomEntry() {
      this.customEntry.push({ custom: "" });
    },

    getactivityData() {
      console.log(this.user);
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/departments/" + this.selectedDepartment.department_id + "/activities";
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
          console.log("activities: ", res.data.data);
          this.ActivityData = res.data.data.activities;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllocation() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/departments/all/activities";
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
          let allocatedData = res.data.data.departments;
          console.log(allocatedData);
          let Allocation = [];
          allocatedData.forEach((elem) => {
            Allocation = elem.allocations;
          });
          this.Allocations = Allocation;
        }).catch((err) => {
          console.log("the error: ",err);
        });
    },

    getDivisions() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/all?format=names_ids";
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
          this.divisonsName = res.data.data.divisions;
          this.selectedDivision = this.divisonsName[0];
          this.getDepartments(this.selectedDivision.division_id);
          console.log("division: ", this.divisonsName);
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
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onFinsh() {
      const data = new FormData();
      var allocat = this.selectOptions;
      var custom = this.customEntry;

      // for server side api
      let send_Allocation = [];
      let send_custom = [];
      allocat.forEach((element) => {
        if (element.selectAllocation) {
          send_Allocation.push(element.selectAllocation);
        }
      });
      custom.forEach((csels) => {
        send_custom.push(csels.custom);
      });
      console.log(send_custom);

      data.append("name", this.actvityName);
      data.append("allocation", this.selectOptions);
      data.append("custom_allocations", this.customEntry);
      // console.log(data);
      // console.log(allocat);
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.selectedDivision.division_id + "/departments/" + this.selectedDepartment.department_id + "/activities/" + this.selectedActivitiesID;

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      };
      axios
        .post(
          endpoint,
          {headers: headers},
          {
            name: this.actvityName,
            allocations: send_Allocation,
            custom_allocations: send_Allocation,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getDivisions();
  },
  beforeDestroy() {
    if(this.changeHasDone > 0) {
    Swal.fire({
      title: '',
      text: "Are you sure you want to leave the page?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save'
    }).then(result => {
      console.log(result);
    })
  }
  }
};
</script>
<style scoped>
.editActivity {
  background-color: #fafafa !important;
}
.box-option-list{
  margin: 0;
}
.AddEntryCustomly{
  width: 100%;
  padding: 10px;
  background-color: #2A3A4B;
  color: #fff;
  text-align: center;
  border: none;
  margin-top: 10px;
  border-radius: 5px;
}
.custom-field-div input{
  width: 100%;
  margin: 0;
}
</style>