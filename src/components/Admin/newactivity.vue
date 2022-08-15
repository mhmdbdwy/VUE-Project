<template>
  <div>
    <section id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="maincontent col-lg-9" style="margin-left: 20px;">
            <div class="mainContent">
              <div id="card" class="">
                <AdminLinks></AdminLinks>
                <div class="main-tabs-content">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="">
                          <div id="activity" class="">
                            <!-- Edit Screen -->
                            <div class="newActivity">
                              <div class="container-fluid">
                                <div class="row">
                                  <div class="col-lg-12">
                                    <h4>Select Division and Department for Mapping</h4>
                                  </div>
                                </div>
                                <div class="create-activity-form-div">
                                  <div class="form-Div">
                                    <div class="select-division-departmet">
                                      
                                      <div class="row m-t-20" style="margin-bottom: 20px">
                                        <div class="col-lg-6">
                                          <p class="same-text-label">
                                            DIVISION
                                          </p>
                                          <select class="select-form" style="color: #12727d"  v-on:change="onChangeDivision($event)">
                                             <option v-for="(division, index) in divisions"
                                             :key="index" :value="division.division_id">
                                            {{ division.division_name }}
                                             </option>
                                          </select>
                                        </div>

                                        <div class="col-lg-6">
                                          <p class="same-text-label">
                                            DEPARTMENT
                                          </p>
                                          <select class="select-form" style="color: #12727d" v-on:change="onChangeDepartment($event)">
                                             <option value="all">All</option>
                                             <option
                                                v-for="(dname, index) in totalDepart"
                                                :key="index"
                                                :value="dname.department_id">
                                                   {{ dname.department_name }}
                                             </option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <p class="same-text-label">
                                          NAME NEW ACTIVITY
                                        </p>
                                        <input
                                          type="text"
                                          name="activity"
                                          class="input-form"
                                          v-model="actvityName"
                                        />
                                      </div>
                                    </div>
                                    <div class="allocate-activity-div">
                                      <div class="row">
                                        <div class="col-lg-12">
                                          <h5 style="margin-top: 20px">
                                            Map Windows
                                          </h5>
                                        </div>
                                      </div>
                                      <div class="row" style="margin-top: 0">
                                        <div class="col-lg-5">
                                        <h5 class="text-center" style="font-size: 12px">Available Windows</h5>
                                          <div class="box-option-list list-items-left">
                                            <ul>
                                              <li v-for="item in leftList" @click="moveItemRight(item.id)" :key="item.id">{{ item.text }}</li>
                                            </ul>
                                          </div>
                                        </div>
                                        <div class="col-lg-2"></div>
                                        <div class="col-lg-5">
                                        <h5 class="text-center" style="font-size: 12px">Mapped Windows</h5>
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
                                            id="customListItemCA"
                                          />
                                        </div>
                                        <div class="col-lg-3">
                                          <button class="AddEntryCustomly" @click="addToList">Add Entry</button>
                                        </div>
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
                                        <!---->
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
    
    <!-- Cancel MOdal -->
    <!-- <div id="cancelModal" class="modal fade in" role="dialog" style="display: none">
      <div class="modal-dialog">        
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close"
              onclick="document.getElementById('cancelModal').style.display='none'">
              Close
            </button>
          </div>
          <div class="modal-body">
            <h4 class="modal-title">
              Are you sure you want to cancel these updates?
            </h4>
            <p></p>
            <div class="buttonDiv">
              <div class="container-fluid p-0">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="finishButtonDiv">
                      <a onclick="document.getElementById('cancelModal').style.display='none'">Yes, Cancel</a>
                      <a onclick="document.getElementById('cancelModal').style.display='none'" class="cancelDelete" >No</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    
    <!-- Delete Modal End -->
    <!-- <div id="finishModal" class="modal fade in" role="dialog" style="display: none">
      <div class="modal-dialog">        
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" onclick="document.getElementById('finishModal').style.display='none'">
              Close
            </button>
          </div>
          <div class="modal-body">
            <h4 class="modal-title">
              Are you sure you want to save these changes?
            </h4>
            <p></p>
            <div class="buttonDiv">
              <div class="container-fluid p-0">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="finishButtonDiv">
                      <a onclick="document.getElementById('finishModal').style.display='none'">Yes, Save</a>
                      <a onclick="document.getElementById('finishModal').style.display='none'" class="cancelDelete" >Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- Delete Modal End -->
  </div>
</template>
<script>
import axios from "axios";
import AdminLinks from './adminLinks.vue';
import { getSession } from '../..//assets/js/util.js'
import 'axios-progress-bar/dist/nprogress.css'
import Swal from 'sweetalert2';

export default {
   name:"newactivity",
   components: {AdminLinks},
   data(){
      return{
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
         selectedDivision: null,
         selectedDepartment: null,
         totalOperations: [],
         //divisonsName: [],
         divisions: null,
         totalDepart: [],
         
         //selected: 'all',
         Allocations:[],
         selectOptions:[{
            selectAllocation:'',
         }],
         customEntry:[
            {
               custom:'',
            }
         ],
         actvityName:'',
         division_id: '',
         dept_id: '',
         allocationName:[],
         user: JSON.parse(getSession('user'))        
         
      }
   },
   
  
   methods:{
     addToList() {
       
       let input = document.getElementById("customListItemCA");
       let id = Math.random() * 100;
       let listItem = {
         id: id,
         text: input.value
       }
       this.leftList.push(listItem);
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
        getUserName: function(){
            if(this.user != undefined) { 
                return this.user.first_name + " " + this.user.last_name;
            }      
      },
      addAlloc(){
         this.selectOptions.push({ selectAllocation: '' });
      },

      removeAlloc(index){
         this.selectOptions.splice(index, 1);
      },
      
      removeCustom(index){
         this.customEntry.splice(index, 1);
      },
    

      addCustomEntryDiv(){
         this.customEntry.push({custom:''});
      },
      
      getAllocation(divisionID, departmentID){

        if(departmentID === undefined || departmentID === ''){
          departmentID = 'all';
        }

        const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+divisionID+"/departments/"+departmentID+"/activities/all/allocations";

        const headers = {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Authorization": "Token "+this.user.access_token
        };
        // "http://devapi.kunin.io:45000/api/v1/v0/divisions/9da53e80-c141-11ea-b3de-0242ac130004/departments/9da53e80-c141-11ea-b3de-0242ac130004/activities/all/allocations"
        
        axios.get(endpoint, {headers: headers})
        .then((res)=>{
          let allocatedData=res.data.data;
          let Allocation=[];
          allocatedData.forEach(elem => {
            Allocation=elem.allocations;
          });
          this.Allocations=Allocation;
        })
        .catch((err) => {
          console.log(err);
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
        if(this.selectedDepartment === null) {
          this.getAllocation(this.selectedDivision.division_id, '');
        } else {
          this.getAllocation(this.selectedDivision.division_id, this.selectedDepartment.department_id);
        }
        
      },

      

      createActivity() {
         Swal.fire({
            title: '',
            text: "Are you sure you want to save these changes?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Save'
         }).then((result) => {
            if (result.isConfirmed) {
               console.log("Selected Division", this.selectedDivision);
               console.log("Selected Department", this.selectedDepartment);

               const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+this.selectedDivision.division_id+"/departments/"+this.selectedDepartment.department_id+"/activities";

               const headers = {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                  "Authorization": "Token "+this.user.access_token
               };

               let activity = {
                  "rulename": this.actvityName,
                  "assigned_time": 373,
                  "assigned_percent": 74,
                  "assignee": this.user.user_id,
                  "type": "Department"
               }

               console.log("Endpoint => ", endpoint);
               console.log("headers => ", headers);

               axios
               .patch(
                  endpoint, activity, {headers: headers}
               )
               .then((res) => {
                  console.log("Response >> ", res);
                  Swal.fire(
                  '',
                  'Activity has been saved successfully.',
                  'success'
                  );
               }).catch((err) => {
                  console.log(err);
                  Swal.fire(
                  '',
                  'Something went wrong.',
                  'error'
                  );
               });

            }
         })
      }
   },

   created(){
      //this.getAllocation();
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
    
}
</script>

<style>
.box-option-list{
  margin: 10px;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  height: 120px;
  overflow: scroll;
  border: 2px solid #AAAAAA;
}
.box-option-list ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
.box-option-list ul li{
  margin-bottom: 10px
}
.box-option-list ul li:last-child{
  margin: 0
}
.create-activity-form-div .form-Div .allocate-activity-div{
  max-width: 100% !important;
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
  width: 100%
}
</style>