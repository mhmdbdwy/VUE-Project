<template>
    <div>
        <div class="activity-Table scroll-table">
    <div class="table-card-div">
      <div class="table-div employeeDetailTable">
        <div class="row">
          <div class="col-lg-12">
            <div class="table-responsive">
              <table class="table table-bordered scrollabletable" >
                <thead>
                  <tr class="tooltipRow">
                    <th class="text-center" style="background-color: #fff"></th>
                    <th class="text-center" @click="sortByActivity">
                      <span class="downArrow"
                        ><i
                          class="fa fa-caret-down"
                          aria-hidden="true"
                        ></i></span
                      >Activity
                      <i class="fa fa-angle-down" v-if="isSortByActivity" aria-hidden="true"></i>
                      <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                    </th>
                    <th class="text-center" colspan="2" @click="sortByAssignedTime">
                      Assigned Time 
                      <i class="fa fa-angle-down" v-if="isSortByAssignedTime" aria-hidden="true"></i>
                      <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                    </th>
                    <th class="text-center" colspan="2" @click="sortByAchievedTime">
                      Achieved Time
                      <i class="fa fa-angle-down" v-if="isSortByAchievedTime" aria-hidden="true"></i>
                      <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                    </th>
                    <th class="text-center tooltipTd">
                      High Focus (Time of Day)
                      <span
                        class="infoIcon"
                        @mouseleave="mouseLeave"
                        @mouseover="mouseOver"
                      >
                        <i class="fa fa-info-circle"></i>
                      </span>
                      <span class="tooltipData"
                        >Time period that has the highest focus for the
                        activity. Note if there are multiple times with the same
                        duration the first occurrence is selected.</span
                      >
                    </th>
                    <th class="text-center tooltipTdOne">
                      High Focus (Duration)
                      <span
                        class="infoIcon"
                        @mouseleave="mouseLeaveFirst"
                        @mouseover="mouseOverFirst"
                      >
                        <i class="fa fa-info-circle"></i>
                      </span>
                      <span class="tooltipData"
                        >The highest continuous period of focus time within the
                        activity.</span
                      >
                    </th>
                    <th class="text-center tooltipTdTwo" @click="sortByTotalFocus">
                      Collective Focus Time 
                      <i class="fa fa-angle-down" v-if="isSortByTotalFocus" aria-hidden="true"></i>
                      <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                      <span
                        class="infoIcon"
                        @mouseleave="mouseLeaveSecond"
                        @mouseover="mouseOverSecond"
                      >
                        <i class="fa fa-info-circle"></i>
                      </span>
                      <span class="tooltipData"
                        >The aggregate of all focus time periods with the
                        activity.</span
                      >
                    </th>
                    <th class="text-center">00:00</th>
                    <th class="text-center">01:00</th>
                    <th class="text-center">02:00</th>
                    <th class="text-center">03:00</th>
                    <th class="text-center">04:00</th>
                    <th class="text-center">05:00</th>
                    <th class="text-center">06:00</th>
                    <th class="text-center">07:00</th>
                    <th class="text-center">08:00</th>
                    <th class="text-center">09:00</th>
                    <th class="text-center">10:00</th>
                    <th class="text-center">11:00</th>
                    <th class="text-center">12:00</th>
                    <th class="text-center">13:00</th>
                    <th class="text-center">14:00</th>
                    <th class="text-center">15:00</th>
                    <th class="text-center">16:00</th>
                    <th class="text-center">17:00</th>
                    <th class="text-center">18:00</th>
                    <th class="text-center">19:00</th>
                    <th class="text-center">20:00</th>
                    <th class="text-center">21:00</th>
                    <th class="text-center">22:00</th>
                    <th class="text-center">23:00</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(single_data, index) in activitiesData"
                    :key="index"
                    v-show="assigned_time_zero(single_data)"
                  >
                    {{
                      removearray()
                    }}
                    <td class="text-center" @click="showNotes(index)">
                      <i class="fa fa-file-text-o" aria-hidden="true" v-if="type.trim().toLowerCase() === 'activity-with-notes'"></i>
                    </td>
                    <td class="text-center" >
                      <div
                        :class="{
                          triangle: single_data.has_notes == true,
                        }"
                      ></div>
                      {{ single_data.activity_name }}
                    </td>
                    <td style="width: 120px" class="text-center">
                      {{ setdesignHours(single_data.assigned_time) }}
                    </td>
                    <td style="width: 100px" class="text-center">
                      {{ getAssignedPercentage(single_data.assigned_time) }}%
                    </td>
                    <td
                      :class="{
                        'achrived-target':
                        (
                          (single_data.achieved_time <= (single_data.assigned_time + (single_data.assigned_time * 0.1) ) )
                          &&
                          (single_data.achieved_time >= (single_data.assigned_time - (single_data.assigned_time * 0.1) ) )
                        ),
                        'below-target':
                        (single_data.achieved_time <= (single_data.assigned_time - (single_data.assigned_time * 0.2) ) )
                        ,
                        'exceed-target':  
                        (
                          (single_data.achieved_time > (single_data.assigned_time + (single_data.assigned_time * 0.1) ) )
                          ||
                          (
                            (single_data.achieved_time < (single_data.assigned_time - (single_data.assigned_time * 0.1) ) )
                            &&
                            (single_data.achieved_time > (single_data.assigned_time - (single_data.assigned_time * 0.2) ) )
                          )
                        )
                      }"
                      width="185"
                    >
                      {{ setdesignHours(single_data.achieved_time) }}
                    </td>
                    <td
                      :class="{
                        'achrived-target':
                        (
                          (single_data.achieved_time <= (single_data.assigned_time + (single_data.assigned_time * 0.1) ) )
                          &&
                          (single_data.achieved_time >= (single_data.assigned_time - (single_data.assigned_time * 0.1) ) )
                        ),
                        'below-target':
                        (single_data.achieved_time <= (single_data.assigned_time - (single_data.assigned_time * 0.2) ) )
                        ,
                        'exceed-target':  
                        (
                          (single_data.achieved_time > (single_data.assigned_time + (single_data.assigned_time * 0.1) ) )
                          ||
                          (
                            (single_data.achieved_time < (single_data.assigned_time - (single_data.assigned_time * 0.1) ) )
                            &&
                            (single_data.achieved_time > (single_data.assigned_time - (single_data.assigned_time * 0.2) ) )
                          )
                        )
                      }"
                      width="185"
                    >
                      {{ single_data.achieved_percentage }}%
                    </td>
                    <td class="text-center">
                      {{ highfocustime(single_data.flow) }}
                    </td>
                    <td class="text-center">
                      {{ highfocustimeDefrence(single_data.flow) }}
                    </td>
                    <td class="text-center hi">
                      {{ setdesignHours(single_data.total_focus) }}
                    </td>
                    
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][0]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][0] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][0] + '%',
                              marginLeft: focusHoursMarginArray[index][0] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][1]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][1] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][1] + '%',
                              marginLeft: focusHoursMarginArray[index][1] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][2]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][2] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][2] + '%',
                              marginLeft: focusHoursMarginArray[index][2] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][3]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][3] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][3] + '%',
                              marginLeft: focusHoursMarginArray[index][3] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][4]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][4] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][4] + '%',
                              marginLeft: focusHoursMarginArray[index][4] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][5]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][5] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][5] + '%',
                              marginLeft: focusHoursMarginArray[index][5] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][6]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][6] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][6] + '%',
                              marginLeft: focusHoursMarginArray[index][6] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][7]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][7] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][7] + '%',
                              marginLeft: focusHoursMarginArray[index][7] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][8]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][8] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][8] + '%',
                              marginLeft: focusHoursMarginArray[index][8] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][9]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][9] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][9] + '%',
                              marginLeft: focusHoursMarginArray[index][9] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][10]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][10] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][10] + '%',
                              marginLeft: focusHoursMarginArray[index][10] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][11]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][11] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][11] + '%',
                              marginLeft: focusHoursMarginArray[index][11] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][12]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][12] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][12] + '%',
                              marginLeft: focusHoursMarginArray[index][12] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][13]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][13] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][13] + '%',
                              marginLeft: focusHoursMarginArray[index][13] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][14]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][14] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][14] + '%',
                              marginLeft: focusHoursMarginArray[index][14] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][15]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][15] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][15] + '%',
                              marginLeft: focusHoursMarginArray[index][15] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][16]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][16] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][16] + '%',
                              marginLeft: focusHoursMarginArray[index][16] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][17]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][17] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][17] + '%',
                              marginLeft: focusHoursMarginArray[index][17] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][18]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][18] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][18] + '%',
                              marginLeft: focusHoursMarginArray[index][18] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][19]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][19] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][19] + '%',
                              marginLeft: focusHoursMarginArray[index][19] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][20]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][20] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][20] + '%',
                              marginLeft: focusHoursMarginArray[index][20] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][21]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][21] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][21] + '%',
                              marginLeft: focusHoursMarginArray[index][21] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][22]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][22] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][22] + '%',
                              marginLeft: focusHoursMarginArray[index][22] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                    <td class="text-center">
                      <div v-if="slotHaveBarArray[index][23]">
                        <div
                            class="focusBar"
                            :style="{
                              width: workingHoursArray[index][23] + '%'
                            }"
                        ></div>
                        <div
                            class="workingColor"
                            :style="{
                              width: focusHoursArray[index][23] + '%',
                              marginLeft: focusHoursMarginArray[index][23] + '%',
                            }"
                        ></div>
                      </div>
                    </td>
                  </tr>
                  <div class="open-box col-md-4">
                    <div class="info-Box">
                      <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                      <div class="name-Box">
                        <h4>{{ getLoggedInUserName }}</h4>
                        <p>{{ getCurrentDateTime }}</p>
                      </div>
                    </div>
                    <div class="detail-Box">
                      <p><strong>Activity:</strong> {{ getActivityName }}</p>
                      <p><strong>Employee:</strong> {{ getEmployeeName }}</p>
                    </div>
                    <div class="note-Box">
                      <p>Note</p>
                      <textarea id="notes-box" class="form-control"></textarea>
                      <!-- <p>Rule: When employee click on this "Add note icon" - this box shows up are they directly insert a note. </p> -->
                    </div>
                    <div class="btn-Box">
                      <a @click="addNotes()">Add Note</a>
                      <a @click="closeNotesBox()">Cancel</a>
                    </div>
                  </div>
                </tbody>

                <tfoot>
                  <tr>
                    <td></td>
                    <td colspan="2">Totals (Aggregate)</td>
                    <td class="text-center" colspan="2">{{ gitActivitiesDataTotal(1) }}</td>
                    
                    <td colspan="2" class="text-center">{{ gitActivitiesDataTotal(2) }}</td>
                    
                    <td class="text-center">{{ gitActivitiesDataTotal(3) }}</td>
                    <td class="text-center">5h 30m</td>
                    <td colspan="24"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NotesComponent v-bind:notesData="notesData" v-if="type.trim().toLowerCase() === 'activity-with-notes'"></NotesComponent>
    </div>
  
</template>
<script>
import $ from "jquery";
import axios from "axios";
import moment from "moment";
import NotesComponent from "./NotesComponent.vue";
import { getSession } from '../assets/js/util.js';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';


export default {
  components: { NotesComponent },
  name: "Activity",
  props: ["name", "type","focusHoursMarginArray", "activitiesData", "notesData", "workingHoursArray", "focusHoursArray", "slotHaveBarArray"],

  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      datax: undefined,
      ref: this,
      isSortByActivity: false,
      isSortByAssignedTime: false,
      isSortByAchievedTime: false,
      isSortByTotalFocus: false,
      //activitiesData: {},
      SingleemployeeData: [],
      notesDetails: {},
      width: null,
      mrgin: null,
      time1: null,
      time2: null,
      resDateText: null,
      definetime: 0,
      notesSubmitters: {},
      forLogArray: [],

      selectedNotesIndex: 0,
      selectedNotesActivityData: null,
      user: JSON.parse(getSession('user'))
    };
  },

  mounted() {
    this.getActivity;
    
  },

  computed: {
    getCurrentDateTime: function () {
      return moment().format("HH:mm - MMM, D YYYY");
    },

    getEmployeeName: function () {
      return this.user.first_name + " " + this.user.last_name;
    },

    getLoggedInUserName: function () {
        if(this.user != null) { 
            return this.user.first_name + " " + this.user.last_name;
        }else {
            return "";
        }
    },

    getActivityName: function () {
      if (this.selectedNotesActivityData != null) {
        return this.selectedNotesActivityData.activity_name;
      } else {
          return "";
      }
    },
  },

  methods: {
    gitActivitiesDataTotal: function(prop) {
      let sum = 0;
      if (prop == 1){
        for(let x = 0; x < this.activitiesData.length; x++){
          sum += this.activitiesData[x].assigned_time;
        }
        let result = this.setdesignHours(sum);
        return result;
      }else if (prop == 2){
        for(let x = 0; x < this.activitiesData.length; x++){
          sum += this.activitiesData[x].achieved_time;
        }
        let result = this.setdesignHours(sum);
        return result;
      }else{
        return "10 h 50 m"
      }
    },
    sortByActivity: function() {
      if (this.isSortByActivity){
        this.isSortByActivity = false; 
        this.activitiesData.sort((a, b) => (a.activity_name > b.activity_name) ? -1 : 1);
      }else{
        this.activitiesData.sort((a, b) => (a.activity_name > b.activity_name) ? 1 : -1);
        this.isSortByActivity = true;
        this.isSortByAssignedTime = false;
        this.isSortByAchievedTime = false;
        this.isSortByTotalFocus = false;
      }
      return this.activitiesData;
    },
    sortByAssignedTime: function() {
      if (this.isSortByAssignedTime){
        this.isSortByAssignedTime = false; 
        this.activitiesData.sort((a, b) => (a.assigned_time > b.assigned_time) ? -1 : 1);
      }else{
        this.activitiesData.sort((a, b) => (a.assigned_time > b.assigned_time) ? 1 : -1);
        this.isSortByAssignedTime = true;
        this.isSortByActivity = false;
        this.isSortByAchievedTime = false;
        this.isSortByTotalFocus = false;
      }
      return this.activitiesData;
    },
    sortByAchievedTime: function() {
      if (this.isSortByAchievedTime){
        this.isSortByAchievedTime = false; 
        this.activitiesData.sort((a, b) => (a.achieved_time > b.achieved_time) ? -1 : 1);
      }else{
        this.activitiesData.sort((a, b) => (a.achieved_time > b.achieved_time) ? 1 : -1);
        this.isSortByAchievedTime = true;
        this.isSortByActivity = false;
        this.isSortByAssignedTime = false;
        this.isSortByTotalFocus = false;
      }
      return this.activitiesData;
    },
    sortByTotalFocus: function() {
      if (this.isSortByTotalFocus){
        this.isSortByTotalFocus = false; 
        this.activitiesData.sort((a, b) => (a.total_focus > b.total_focus) ? -1 : 1);
      }else{
        this.activitiesData.sort((a, b) => (a.total_focus > b.total_focus) ? 1 : -1);
        this.isSortByTotalFocus = true;
        this.isSortByActivity = false;
        this.isSortByAssignedTime = false;
        this.isSortByAchievedTime = false;
      }
      return this.activitiesData;
    },
    assigned_time_zero(x){
      return !(x.assigned_time == 0);
    },
    mouseOver() {
      $(".tooltipTd .tooltipData").css("display", "block");
    },

    mouseLeave() {
      $(".tooltipTd .tooltipData").css("display", "none");
    },

    mouseOverFirst() {
      $(".tooltipTdOne .tooltipData").css("display", "block");
    },

    mouseLeaveFirst() {
      $(".tooltipTdOne .tooltipData").css("display", "none");
    },

    mouseOverSecond() {
      $(".tooltipTdTwo .tooltipData").css("display", "block");
    },

    mouseLeaveSecond() {
      $(".tooltipTdTwo .tooltipData").css("display", "none");
    },

    toconvertArray(data) {
        let arrayfor = [];
        if (data!=null) {
            var test = JSON.stringify(data);
            var test2 = JSON.parse(test);
            for (var i in test2) {
                var test3 = Object.values(test2[i]);
                arrayfor.push(test3[0]);
            }
            return arrayfor;
        }else{
            return arrayfor;
        }
      
    },

    removearray() {
      this.forLogArray = [];
    },

    highfocustime(data) {
      if (data.length < 1) {
        return "0";
      }
      var starttime = data[0];
      var endtime = data[1];

      var startreturn = moment(starttime, "H:mm").format("H:mm");
      var returnEndrtime = moment(endtime, "H:mm").format("H:mm");
      return startreturn + " - " + returnEndrtime;
    },

    highfocustimeDefrence(data) {
      if (data.length < 1) {
        return "0";
      }
      var x = data[0];
      var y = data[1];

      var now = "04/09/2013 " + y;
      var then = "04/09/2013 " + x;

      //    return d;
      var timedurations = moment
        .utc(
          moment(now, "DD/MM/YYYY H:mm").diff(moment(then, "DD/MM/YYYY H:mm"))
        )
        .format("H:mm");
      var beforsp = timedurations.split(":");
      var hrs = beforsp[0];
      var mint = beforsp[1];
      var retunmint = 0;
      var returnhrs = 0;
      if (mint == 0) {
        retunmint = "";
      } else {
        retunmint = mint + " m";
      }
      if (hrs == 0) {
        returnhrs = "";
      } else {
        returnhrs = hrs + " h ";
      }
      return returnhrs + retunmint;
    },

    dattimeformate(data) {

      return moment.utc(data).format("MM/DD/YYYY");
    },

    setdesignHours(mins) {
      if (mins < 1) {
        return mins + " h";
      }
      if (mins / 60 < 1) {
        return mins + " m";
      }
      var h = (mins / 60) | 0,
        m = mins % 60 | 0;
      if (m > 0) {
        return h + " h " + m + "m";
      } else {
        return h + " h";
      }
      // moment.utc().hours(h).minutes(m).format("hh:mm");
      //  return moment(mins, 'minutes').format('HH:mm');
    },
    getAssignedPercentage(data){
      let sum = 0;
      for(let x = 0; x < this.activitiesData.length; x++){
        sum += this.activitiesData[x].assigned_time;
      }
      let result = (data / sum) * 100;
      let x = Math.round(result);
      return x;
    },
    
    renderTd() {
      function dynamicWidth(){
        let tBody = document.querySelector(".table-performance-overview tbody");
        if(tBody) {
          document.querySelector(".table-performance-overview tbody").firstElementChild.children.forEach((elem)=>{
            document.querySelectorAll(".table-performance-overview thead > tr td").forEach((element)=>{
                element.style.width = elem.offsetWidth+"px";
            })
          })
        }
        
      }
      dynamicWidth();

      window.addEventListener("resize",function(){
        dynamicWidth()
      })

      let btnBox = document.querySelector(".btn-Box");
      if(btnBox){
        btnBox.addEventListener('click',function(){
          document.querySelector(".table-performance-overview table").setAttribute("style","border-collapse: separate;")
        });
      }
      
      let empTable = document.querySelectorAll(".employeeDetailTable table tr td i");
      if(empTable) {
        empTable.forEach((elem)=>{
          elem.addEventListener("click",function(e){
            const popHeight = 300;
            let checkPosition = innerHeight - popHeight
            if(e.clientY > checkPosition) {
              document.querySelector(".open-box").style.top = (e.clientY - 210)+"px";
            }else {
              document.querySelector(".open-box").style.top = e.clientY+"px";
            }
            document.querySelector(".open-box").style.left = e.clientX+40+"px";
            document.querySelector(".open-box").style.position = "fixed";
          });
        });  
      }
           
    },

    showNotes(index) {
      this.selectedNotesIndex = index;
      $("#notes-box").val("");
      if (this.activitiesData.length > 0) {
        this.selectedNotesActivityData = this.activitiesData[index];
        
        if ($(".open-box").css("display") == "block") {
          $(".open-box").css("display", "none");
        } else {
          $(".open-box").css("display", "block");
        }
      }
      
    },

    addNotes() {
      let user_notes = $("#notes-box").val().trim();
      let obj = null;

      if (user_notes.length > 0) {
        if (this.selectedNotesActivityData != null) {
          let notesObj = null;
          let notesFound = false;
          for (let i = 0; i < this.notesDetails.length; i++) {
            if (this.notesDetails[i].activity_name ==this.selectedNotesActivityData.activity_name) {
              notesObj = {
                date: moment(),
                note: user_notes,
                submitter: {
                  first_name: this.user.first_name,
                  last_name: this.user.second_name,
                  user_id: this.user.user_id,
                },
              };
              this.notesDetails[i].notes.push(notesObj);

              obj = {
                activity_id: this.selectedNotesActivityData.activity_id,
                activity_name: this.selectedNotesActivityData.activity_name,
                submitted_by:
                  notesObj.submitter.first_name +
                  " " +
                  notesObj.submitter.last_name,
                note: user_notes,
                date_submitted: moment().format("MM/D/YYYY"),
              };

              this.notesData.push(obj);                        
              notesFound = true;
              break;
            }
          }

          if (notesFound === false) {
            // Create notesDetails

            let notesDetail = {
              activity_id: this.selectedNotesActivityData.activity_id,
              activity_name: this.selectedNotesActivityData.activity_name,
              notes: [
                {
                  date: moment(),
                  note: user_notes,
                  submitter: {
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                    user_id: this.user.user_id,
                  },
                },
              ],
            };

            
            obj = {
              activity_id: notesDetail.activity_id,
              activity_name: notesDetail.activity_name,
              submitted_by:
                notesDetail.notes[0].submitter.first_name +
                " " +
                notesDetail.notes[0].submitter.last_name,
              note: user_notes,
              date_submitted: moment().format("MM/D/YYYY"),
            };
            this.notesData.push(obj);
          }

          this.selectedNotesActivityData.notes = true;

          this.saveNotes(obj);    

        }
      } else {
        alert("Please enter the notes.");
      }
    },

    closeNotesBox() {
      $(".open-box").css("display", "none");
    },

    

    saveNotes(noteObj) {
      let division = this.user.division.division_id
      let activityID = noteObj.activity_id
      
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+division+"/activities/"+activityID+"/notes"

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Token "+this.user.access_token
      }

      let note = {'note': {'note': noteObj.note}}
      
      axios
        .post(endpoint, note, {headers: headers} )
        .then((res) => {                  
          $("#t" + this.selectedNotesIndex).show();
          $(".open-box").css("display", "none");
          this.$router.go();
        })
        .catch((err) => {
          console.log("saveNotes: error : ", err);
        });
    }

  },

  created() { 
    this.renderTd(this);
    loadProgressBar();
    
  },
};
</script>
<style lang="css" scoped>
.table-bordered>tbody>tr>td{
  border-bottom: none !important;
}
.calender-Box {
  top: 63%;
  left: 90%;
  min-width: 510px !important ;
}
#manager .table-performance-overview,
.employeecontent #cerdit-card .table-performance-overview {
  width: 100%;
  margin-left: 20px;
  max-width: 80% !important;
}
.scroll-table {
  overflow: auto;
}
</style>