<template>
  <div>
    <!-- <div
      class="deptoperations"
      v-for="(operation, inde) in totalOperations"
      :key="inde"
    > -->

    <div class="row">
      <div class="col-lg-12">
        <!-- <h2 class="h2">{{ operation.department_name }}</h2> -->
        <h2 class="h2">{{ selected_department.department_name }}</h2>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <td>Weekly Schedule</td>
                <!-- <td>Day 1</td>
                <td>Day 2</td>
                <td>Day 3</td>
                <td>Day 4</td>
                <td>Day 5</td>
                <td>Day 6</td>
                <td>Day 7</td> -->
                <td>Monday</td>
                <td>Tuesday</td>
                <td>Wednesday</td>
                <td>Thursday</td>
                <td>Friday</td>
                <td>Saturday</td>
                <td>Sunday</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
                <!-- Workinhg Hour Row -->
               
              <tr>
                <td>Expected work hours per day</td>
                <td>
                  <input  id = "Monday1"
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="expactedwork.monday"
                  />
                </td>
                <td>
                  <input id="Tuesday1"
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="expactedwork.tuesday"
                  />
                </td>
                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="expactedwork.wednesday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="expactedwork.thursday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="expactedwork.friday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="expactedwork.saturday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="expactedwork.sunday"
                  />
                </td>

                <td>
                  {{
                    parseFloat(expactedwork.monday) +
                    parseFloat(expactedwork.tuesday) +
                    parseFloat(expactedwork.wednesday) +
                    parseFloat(expactedwork.thursday) +
                    parseFloat(expactedwork.friday) +
                    parseFloat(expactedwork.saturday) +
                    parseFloat(expactedwork.sunday)
                  }}
                </td>
              </tr>
              
              <!-- Lunch break row -->
              <tr>
                <td>Lunch Breaks</td>

                <td>
                  <input id="Monday2"
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="LunchBreak.monday"
                  />
                </td>

                <td>
                  <input id="Tuesday2"
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="LunchBreak.tuesday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="LunchBreak.wednesday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="LunchBreak.thursday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="LunchBreak.friday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="LunchBreak.saturday"
                  />
                </td>

                <td>
                  <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input text-center"
                    v-model="LunchBreak.sunday"
                  />
                </td>

                <td>
                  {{
                    parseFloat(LunchBreak.monday) +
                    parseFloat(LunchBreak.tuesday) +
                    parseFloat(LunchBreak.wednesday) +
                    parseFloat(LunchBreak.thursday) +
                    parseFloat(LunchBreak.friday) +
                    parseFloat(LunchBreak.saturday) +
                    parseFloat(LunchBreak.sunday)
                  }}
                </td>
              </tr>

                <!-- Working Hours + Lunch Break Row -->
              <tr>
                <td>Subtotal - Total Workday</td>

                <td>
                  <div v-if="parseFloat(expactedwork.monday) + parseFloat(LunchBreak.monday) > 24"><span  class="danger">Error</span></div>
                  <div v-else>{{
                    parseFloat(expactedwork.monday) + parseFloat(LunchBreak.monday)
                  }}</div>
                </td>

                <td>
                                    <div v-if="parseFloat(expactedwork.tuesday) + parseFloat(LunchBreak.tuesday) > 24"><span  class="danger">Error</span></div>

                 <div v-else>{{
                    parseFloat(expactedwork.tuesday) + parseFloat(LunchBreak.tuesday)
                  }}</div>
                </td>

                <td>
                                    <div v-if="parseFloat(expactedwork.wednesday) + parseFloat(LunchBreak.wednesday) > 24"><span  class="danger">Error</span></div>

              <div v-else>{{
                    parseFloat(expactedwork.wednesday) + parseFloat(LunchBreak.wednesday)
                  }}</div>
                </td>

                <td>
                                    <div v-if="parseFloat(expactedwork.thursday) + parseFloat(LunchBreak.thursday) > 24"><span  class="danger">Error</span></div>

                 <div v-else>{{
                    parseFloat(expactedwork.thursday) + parseFloat(LunchBreak.thursday)
                  }}</div>
                </td>

                <td>
                                    <div v-if="parseFloat(expactedwork.friday) + parseFloat(LunchBreak.friday) > 24"><span  class="danger">Error</span></div>

                 <div v-else>{{
                    parseFloat(expactedwork.friday) + parseFloat(LunchBreak.friday)
                  }}</div>
                </td>

                <td>
                                    <div v-if="parseFloat(expactedwork.saturday) + parseFloat(LunchBreak.saturday) > 24"><span  class="danger">Error</span></div>

                 <div v-else>{{
                    parseFloat(expactedwork.saturday) + parseFloat(LunchBreak.saturday)
                  }}</div>
                </td>

                <td>
                                    <div v-if="parseFloat(expactedwork.sunday) + parseFloat(LunchBreak.sunday) > 24"><span  class="danger">Error</span></div>

                 <div v-else>{{
                    parseFloat(expactedwork.sunday) + parseFloat(LunchBreak.sunday)
                  }}</div>
                </td>

                <td>
                  {{
                    parseFloat(expactedwork.monday) +
                    parseFloat(LunchBreak.monday) +
                    parseFloat(expactedwork.tuesday) +
                    parseFloat(LunchBreak.tuesday) +
                    parseFloat(expactedwork.wednesday) +
                    parseFloat(LunchBreak.wednesday) +
                    parseFloat(expactedwork.thursday) +
                    parseFloat(LunchBreak.thursday) +
                    parseFloat(expactedwork.friday) +
                    parseFloat(LunchBreak.friday) +
                    parseFloat(expactedwork.saturday) +
                    parseFloat(LunchBreak.saturday) +
                    parseFloat(expactedwork.sunday) +
                    parseFloat(LunchBreak.sunday)
                  }}
                </td>
              </tr>

              <!-- Non Working Time Row -->
              <tr>
                <td>Non - working Time</td>
                <td>
                  <!-- <input
                    type="number" @change="changeHasDone++"
                    class="form-control custom-input"
                    v-model="nonworkingTime.day1"
                  /> -->
                  {{
                      nonworkingTime.day1 = parseFloat(totalhours) - 
                      parseFloat(expactedwork.monday) - 
                      parseFloat(LunchBreak.monday) 
                  }}
                </td>
                <td>
                  {{
                      nonworkingTime.day2 = parseFloat(totalhours) - 
                      parseFloat(expactedwork.tuesday) - 
                      parseFloat(LunchBreak.tuesday) 
                  }}
                </td>
                <td>
                  {{
                      nonworkingTime.day3 = parseFloat(totalhours) - 
                      parseFloat(expactedwork.wednesday) - 
                      parseFloat(LunchBreak.wednesday) 
                  }}
                </td>
                <td>
                  {{
                      nonworkingTime.day4 = parseFloat(totalhours) - 
                      parseFloat(expactedwork.thursday) - 
                      parseFloat(LunchBreak.thursday) 
                  }}
                </td>
                <td>
                  {{
                      nonworkingTime.day5 = parseFloat(totalhours) - 
                      parseFloat(expactedwork.friday) - 
                      parseFloat(LunchBreak.friday) 
                  }}
                </td>
                <td>
                  {{
                      nonworkingTime.day6 = parseFloat(totalhours) - 
                      parseFloat(expactedwork.saturday) - 
                      parseFloat(LunchBreak.saturday) 
                  }}
                </td>
                <td>
                  {{
                      nonworkingTime.day7 = parseFloat(totalhours) - 
                      parseFloat(expactedwork.sunday) - 
                      parseFloat(LunchBreak.sunday) 
                  }}
                </td>
                <td>
                  {{
                    parseFloat(nonworkingTime.monday) +
                    parseFloat(nonworkingTime.tuesday) +
                    parseFloat(nonworkingTime.wednesday) +
                    parseFloat(nonworkingTime.thursday) +
                    parseFloat(nonworkingTime.friday) +
                    parseFloat(nonworkingTime.saturday) +
                    parseFloat(nonworkingTime.sunday)
                  }}
                </td>
              </tr>

              <!-- Total Hours -->
              <tr>
                <td>Total (24 hr period)</td>
                <td>
                  {{
                    parseFloat(totalhours)
                  }}
                </td>
                <td>
                  {{
                    parseFloat(totalhours)
                  }}
                </td>
                <td>
                  {{
                    parseFloat(totalhours)
                  }}
                </td>
                <td>
                  {{
                    parseFloat(totalhours)
                  }}
                </td>
                <td>
                  {{
                    parseFloat(totalhours)
                  }}
                </td>
                <td>
                  {{
                    parseFloat(totalhours)
                  }}
                </td>
                <td>
                  {{
                    parseFloat(totalhours)
                  }}
                </td>
                <td>
                  {{
                    parseFloat(totalhours) +
                    parseFloat(totalhours) + 
                    parseFloat(totalhours) + 
                    parseFloat(totalhours) + 
                    parseFloat(totalhours) + 
                    parseFloat(totalhours) + 
                    parseFloat(totalhours)
                  }}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
<div class="row">
  <div class="col-md-6">
    <div class="activity-target">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <h4>Set Activity Target Threshold</h4>
            <div class="input-percentage">
              <span class="plus-minus-text">+/-</span>              
              <input
                type="text"
                name="percentage"
                class="input-form"
                v-model="TargetThreshold"
                style="width:50px;padding-left: 58px; font-size: 15px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="optimal-div">
      <div class="container-fluid" style="margin-bottom: 35px">
        <div class="row">
          <div class="col-lg-12">
            <h4>Set Optimal Duration Of Activity Flow State</h4>
          </div>
        </div>
        <div class="multi-input">
          <div class="row">
            <div class="col-lg-6">
              <label>DURATION</label>
              <div class="input-percentage">
                <span class="plus-minus-text">+/-</span>
                <input
                    type="text"
                    name="percentage"
                    class="input-form"
                    v-model="FlowDuration"
                    style="padding-left: 58px; font-size: 15px"
                  />                
              </div>
            </div>
            <div class="col-lg-6">
              <label>THRESHOLD</label>
              <div class="input-percentage">
                <span class="plus-minus-text">+/-</span>
                <input
                    type="text"
                    name="percentage"
                    class="input-form"
                    v-model="FlowThreshold"
                    style="padding-left: 58px; font-size: 15px"
                  />                
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </div>
</div>
    
    <div id="finishOptimalButtonDiv" style="width: fit-content;margin: 0 auto">
      <div class="row">
        <div class="col-lg-6">
          <p>
            <a
              class="finishBtn"
              @click="saveOperationHours()"
              >Save</a>
          </p>
        </div>
        <div class="col-lg-6">
          <p @click="cancel()">
            <a class="cancleBtn">Cancel</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import JQuery from "jquery";
import $ from "jquery";
import moment from "moment";
import "vue2-datepicker/index.css";
import { getSession } from "../assets/js/util.js";
// import { loadProgressBar } from "axios-progress-bar";
// import "axios-progress-bar/dist/nprogress.css";
import sidebarMixin from "../components/sidebarMxin";
import Swal from 'sweetalert2';



export default {
  components: {},
  name: "SetOperationHourComponent",
  mixins: [sidebarMixin],
  props: [
    "departments",
    "divisions",
    "selected_department",
    "selected_division",
    "name",
    "type",
    "data",
  ],

  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      user: JSON.parse(getSession("user")),
      changeHasDone: 0,
      expactedwork: {        
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },

      LunchBreak: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },

      TargetThreshold: 0,
      FlowDuration:0 ,
      FlowThreshold: 0,
      scheduleID: '',

      nonworkingTime: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      },

      totalOperations: [],
      totalhours: 24,
      
    };
  },

  mounted() {
/*
$('#Monday1,#Monday2').on('input', function () {
    




var Wednesday1 = $("#Wednesday1").val();
var Wednesday2 = $("#Wednesday2").val();
var WednesdaySum = parseInt(Wednesday1) + parseInt(Wednesday2);

var Thursday1 = $("#Thursday1").val();
var Thursday2 = $("#Thursday2").val();
var ThursdaySum = parseInt(Thursday1) + parseInt(Thursday2);

var Friday1 = $("#Friday1").val();
var Friday2 = $("#Friday2").val();
var FridaySum = parseInt(Friday1) + parseInt(Friday2);

var Saturday1 = $("#Saturday1").val();
var Saturday2 = $("#Saturday2").val();
var SaturdaySum = parseInt(Saturday1) + parseInt(Saturday2);

var Sunday1 = $("#Sunday1").val();
var Sunday2 = $("#Sunday2").val();
var SundaySum = parseInt(Sunday1) + parseInt(Sunday2);

*/

 /* 
var Monday1 = $("#Monday1").val();
var Monday2 = $("#Monday2").val();
var MondaySum = parseInt(Monday1) + parseInt(Monday2);
    if ((Monday1 !== '') && (Monday1.indexOf('.') === -1)) {
        if(MondaySum > 24){ alert ("Monday can't be more than 24");
        $("#Monday1").val(0);
        $("#Monday2").val(0);
         }
                    }

});

$('#Tuesday1,#Tuesday2').on('input', function () {
var Tuesday1 = $("#Tuesday1").val();
var Tuesday2 = $("#Tuesday2").val();
var TuesdaySum = parseInt(Tuesday1) + parseInt(Tuesday2);
        if ((Tuesday1 !== '') && (Tuesday1.indexOf('.') === -1)) {
        if(TuesdaySum > 24){ alert ("Tuesday can't be more than 24");
        $("#Tuesday1").val(0);
         $("#Tuesday2").val(0);
         }
                    }
});
*/

$('input[name="percentage"]').on('input', function() {
  // Let's match only digits.
  var num = this.value;
  if (num > 100) {
    alert("it's not allowed to be more than 100 Percentage.");
    this.value = 0;
  }
});


$('input[type="number"]').on('input', function() {
  // Let's match only digits.
  var num = this.value;
  if (num > 24) {
    alert("Expected work hours per day cannot exceed 24.");
    this.value = 0;
  }
});
//end of mounted
  },

  computed: {
    getCurrentDateTime: function() {
      return moment().format("HH:mm - MMM, D YYYY");
    },

    getLoggedInUserName: function() {
      if (this.user != null) {
        return this.user.first_name + " " + this.user.last_name;
      } else {
        return "";
      }
    },

    totalWorkingHours: function() {
      let totalHours = parseFloat(this.expactedwork.monday) +
      parseFloat(this.expactedwork.tuesday) +
      parseFloat(this.expactedwork.wednesday) +
      parseFloat(this.expactedwork.thursday) +
      parseFloat(this.expactedwork.friday) +
      parseFloat(this.expactedwork.saturday) +
      parseFloat(this.expactedwork.sunday)

      return totalHours;
    }
  },

  methods: {
    totalDepartments() {
      return this.departments;
    },

    getHoursOpertation() {
      let endpoint = "";

      if(this.selected_department == null) {
        endpoint = "http://" + this.envurl + "/api/v1/divisions/"+this.selected_division.division_id+"/departments/all/schedules";
      } else {
        endpoint = "http://" + this.envurl + "/api/v1/divisions/"+this.selected_division.division_id+"/departments/"+this.selected_department.department_id+"/schedules";
      }
      
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
          let operationArray = res.data.data;
          let operations = [];

          operations = operationArray.schedule;

          this.expactedwork.monday = operations.monday.work_hours;
          this.expactedwork.tuesday = operations.tuesday.work_hours;
          this.expactedwork.wednesday = operations.wednesday.work_hours;
          this.expactedwork.thursday = operations.thursday.work_hours;
          this.expactedwork.friday = operations.friday.work_hours;
          this.expactedwork.saturday = operations.saturday.work_hours;
          this.expactedwork.sunday = operations.sunday.work_hours;

          this.LunchBreak.monday = operations.monday.breaks;
          this.LunchBreak.tuesday = operations.tuesday.breaks;
          this.LunchBreak.wednesday = operations.wednesday.breaks;
          this.LunchBreak.thursday = operations.thursday.breaks;
          this.LunchBreak.friday = operations.friday.breaks;
          this.LunchBreak.saturday = operations.saturday.breaks;
          this.LunchBreak.sunday = operations.sunday.breaks;

          this.TargetThreshold = operations.monday.target_threshold;
          this.FlowDuration = operations.monday.flow_duration ;
          this.FlowThreshold = operations.monday.flow_threshold;

          this.scheduleID = operations.id;
          
          this.totalOperations = operations;
          
        })
        .catch((err) => {
          console.log(err);
        });
    },

    saveOperationHours() {
      Swal.fire({
        title: '',
        text: "Are you sure you want to save these changes?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Save'
      }).then((result) => {
        if (result.isConfirmed) {

          let totalHours = this.totalWorkingHours;
          let endpoint = '';
          
          if (totalHours >= 168) {
            Swal.fire(
            '',
              'Total number of working hours cannot be more than 168',
              'error'
            );
            return;
          }
//department_id: this.selected_department.department_id,
          let data = JSON.stringify(
            { 
            "schedule":{
              target_threshold: this.TargetThreshold,
              flow_duration: this.FlowDuration,
              flow_threshold: this.FlowThreshold,
              
              monday:	{
                work_hours: this.expactedwork.monday,
                breaks: this.LunchBreak.monday
              },
              tuesday: {
                work_hours: this.expactedwork.tuesday,
                breaks: this.LunchBreak.tuesday
              },
              wednesday: {
                work_hours: this.expactedwork.wednesday,
                breaks: this.LunchBreak.wednesday
              },
              thursday: {
                work_hours: this.expactedwork.thursday,
                breaks: this.LunchBreak.thursday
              },
              friday: {
                work_hours: this.expactedwork.friday,
                breaks: this.LunchBreak.friday
              },
              saturday: {
                work_hours: this.expactedwork.saturday,
                breaks: this.LunchBreak.saturday
              },
              sunday: {
                work_hours: this.expactedwork.sunday,
                breaks: this.LunchBreak.sunday
              }
            }
          });

          const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Token "+this.user.access_token
          };

          

          if(this.totalOperations.length === 0) {
            // Create Schedule
            endpoint = "http://" + this.envurl + "/api/v1/divisions/"+this.selected_division.division_id+"/departments/"+this.selected_department.department_id+"/schedules";
            

            axios
            .post(
              endpoint, data, {headers: headers}
            )
            .then((res) => {
              Swal.fire(
              '',
                'Hours of operation has been created successfully.',
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

          } else {
            // Update Schedule
            endpoint = "http://" + this.envurl + "/api/v1/divisions/"+this.selected_division.division_id+"/departments/"+this.selected_department.department_id+"/schedules/"+this.scheduleID;

            
            axios
            .patch(
              endpoint, data, {headers: headers}
            )
            .then((res) => {
              Swal.fire(
              '',
                'Hours of operation has been updated successfully.',
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

        }
      })
    },

    cancel() {
      Swal.fire({
        title: '',
        text: "Are you sure you want to cancel the changes?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.getHoursOpertation();
        }
      });
    },
      Morethan24hours() {
      // Use sweetalert2
      this.$swal('More Than 24 hours !');
    }
  },

  created() {
    //loadProgressBar();
    this.getHoursOpertation();
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
<style lang="css" scoped>
    .custom-input {
        border-style:none;
        border: none;
        border-color: transparent;
        outline: none;
        width: 80px;
        padding: 0px;
        margin: 0px;
    }

    .text-center {
        text-align: center;
    }

    input:focus, textarea:focus, select:focus{
        outline: none;
    }
.input-percentage input{
    width: 90px !important;
    padding-left: 52px !important;
    font-size: 15px !important;
    max-width: 100% !important;

}
</style>

