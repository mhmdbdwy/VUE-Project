<template>
  <div>
    <section id="main">
      <div id="cerdit-card" class="tab-pane fade in active">
        <div class="common-main-div">
          <p @click="setActivity()" class="backIcon" style="display: block">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </p>
          <label>Department</label>
          <h4>Credit Card</h4>
          <div class="multiple-select">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label class="w-100">Display View By:</label>
                <select class="display-view-by" v-on:change="setActivity()">
                  <option>All Employee</option>
                  <option>Activity</option>
                </select>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label class="w-100">Select Date Range:</label>
                <div class="calender-Div" @click="calenderBoxShow()">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  <span class="changeText">{{ resDateText }}</span>
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </div>
                <div class="calender-Box">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-6">
                        <label>From</label>
                        <div class="from-Calender">
                          <!-- <i class="fa fa-calendar" aria-hidden="true"></i>
                                          <span>06/10/20</span> -->
                          <date-picker
                            v-model="time1"
                            valueType="format"
                            width="150"
                          ></date-picker>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <label>To</label>
                        <div class="from-Calender">
                          <date-picker
                            v-model="time2"
                            valueType="format"
                            width="150"
                            @change="
                              calenderBoxShow();
                              changeDateText(4);
                            "
                          ></date-picker>
                          <!-- <i for="#date-input" class="fa fa-calendar" aria-hidden="true"></i>
                                          <span>06/10/20</span>
                                          <input style="display: none;" id="date-input" type="date" name="to-date"> -->
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div
                          class="commonDiv"
                          @click="
                            calenderBoxShow();
                            changeDateText(1);
                          "
                        >
                          <p class="dayText">Today</p>
                        </div>
                        <div
                          class="commonDiv"
                          @click="
                            calenderBoxShow();
                            changeDateText(2);
                          "
                        >
                          <p class="weekText dayText">Week over Week</p>
                        </div>
                        <div
                          class="commonDiv"
                          @click="
                            calenderBoxShow();
                            changeDateText(3);
                          "
                        >
                          <p class="dayText">Month over Month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="selectMonth">
                <div class="col-lg-6 m-t-20">
                  <label class="w-100">Select Month:</label>
                  <select class="display-view-by">
                    <option>June 2020</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="employee-Table" style="display: block">
          <div class="table-card-div allEmployee">
            <div class="row">
              <div class="col-lg-12">
                <div class="table-responsive">
                  <div class="footer"></div>
                  <table class="table table-bordered">
                    <thead>
                      <tr class="tooltipRow">
                        <th
                          class="text-center"
                          style="background-color: #fff"
                        ></th>
                        <th class="text-center">All Employee</th>
                        
                        <th class="text-center" colspan="2">Assigned Time</th>
                        <th class="text-center" colspan="2">Achieved Time</th>
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
                            >Descriptor of what the column. The description will
                            be available upon hover.</span
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
                            >Descriptor of what the column. The description will
                            be available upon hover.</span
                          >
                        </th>
                        <th class="text-center tooltipTdTwo">
                          Collective Focus Time
                          <span
                            class="infoIcon"
                            @mouseleave="mouseLeaveSecond"
                            @mouseover="mouseOverSecond"
                          >
                            <i class="fa fa-info-circle"></i>
                          </span>
                          <span class="tooltipData"
                            >Descriptor of what the column. The description will
                            be available upon hover.</span
                          >
                        </th>
                        <th class="text-center">07:00</th>
                        <th class="text-center">08:00</th>
                        <th class="text-center">09:00</th>
                        <th class="text-center">10:00</th>
                        <th class="text-center">11:00</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data, i) in empData" :key="i">
                        {{
                          removearray()
                        }}

                        <td class="text-center">
                          <i
                            @click="openBox()"
                            class="fa fa-file-text-o"
                            aria-hidden="true"
                          ></i>
                        </td>
                        <td
                          class="text-center"
                          @click="employeTable()"
                          style="position: relative"
                        >
                          <div :class="{ triangle: data.notes == true }"></div>
                          {{ data.first_name }} {{ data.last_name }}
                        </td>
                        
                        <td style="text-align: left; width: 100px">
                          {{ data.assigned_time }} h
                        </td>
                        <td style="text-align: left; width: 100px">
                          {{ data.assigned_percentage }}%
                        </td>
                        <td
                          style="text-align: left; width: 100px"
                          :class="{
                            'achrived-target':
                              data.assigned_time == data.achieved_time,
                            'below-target':
                              data.assigned_time > data.achieved_time,
                            'exceed-target':
                              data.assigned_time < data.achieved_time,
                          }"
                        >
                          {{ data.achieved_time }} h
                        </td>
                        <td
                          style="text-align: left; width: 100px"
                          :class="{
                            'achrived-target':
                              data.assigned_time == data.achieved_time,
                            'below-target':
                              data.assigned_time > data.achieved_time,
                            'exceed-target':
                              data.assigned_time < data.achieved_time,
                          }"
                        >
                          {{ data.achieved_percentage }}%
                        </td>
                        <td class="text-center">
                          {{ highfocustime(data.flow) }}
                        </td>
                        <td class="text-center">
                          {{ highfocustimeDefrence(data.flow) }}
                        </td>
                        <td class="text-center">
                          {{ getHourse(data.total_focus) }}
                        </td>
                        <!-- <td class="text-center">
                          <div v-if="data.periods[7]">
                            <div
                              class="focusBar"
                              :style="{
                                width: Setdesign(data.periods[7].working),
                                marginLeft: mrgin,
                              }"
                            ></div>
                            <div
                              class="workingColor"
                              :style="{
                                width: Setdesign(data.periods[7].focus),
                                marginLeft: mrgin,
                              }"
                            ></div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div v-if="data.periods[8]">
                            <div
                              class="focusBar"
                              :style="{
                                width: Setdesign(data.periods[8].working),
                                marginLeft: mrgin,
                              }"
                            ></div>
                            <div
                              class="workingColor"
                              :style="{
                                width: Setdesign(data.periods[8].focus),
                                marginLeft: mrgin,
                              }"
                            ></div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div v-if="data.periods[9]">
                            <div
                              class="focusBar"
                              :style="{
                                width: Setdesign(data.periods[9].working),
                                marginLeft: mrgin,
                              }"
                            ></div>
                            <div
                              class="workingColor"
                              :style="{
                                width: Setdesign(data.periods[9].focus),
                                marginLeft: mrgin,
                              }"
                            ></div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div v-if="data.periods[10]">
                            <div
                              class="focusBar"
                              :style="{
                                width: Setdesign(data.periods[10].working),
                                marginLeft: mrgin,
                              }"
                            ></div>
                            <div
                              class="workingColor"
                              :style="{
                                width: Setdesign(data.periods[10].focus),
                                marginLeft: mrgin,
                              }"
                            ></div>
                          </div>
                        </td>
                        <td class="text-center">
                          <div v-if="data.periods[11]">
                            <div
                              class="focusBar"
                              :style="{
                                width: Setdesign(data.periods[11].working),
                                marginLeft: mrgin,
                              }"
                            ></div>
                            <div
                              class="workingColor"
                              :style="{
                                width: Setdesign(data.periods[11].focus),
                                marginLeft: mrgin,
                              }"
                            ></div>
                          </div>
                        </td> -->
                      </tr>
                      <div class="open-box col-md-4">
                        <div class="info-Box">
                          <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                          <div class="name-Box">
                            <h4>Manager</h4>
                            <p>14:08 - July 2, 2020</p>
                          </div>
                        </div>
                        <div class="detail-Box">
                          <p>
                            <strong>Activity:</strong> Application Processing
                          </p>
                          <p><strong>Employee:</strong> Anna Thampson</p>
                        </div>
                        <div class="note-Box">
                          <p>Note</p>
                          <p>
                            Rule: When employee click on this "Add note icon" -
                            this box shows up are they directly insert a note.
                          </p>
                        </div>
                        <div class="btn-Box">
                          <a @click="openBox()">Add Note</a>
                          <a @click="openBox()">Cancel</a>
                        </div>
                      </div>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td class="text-center"></td>
                        <td class="text-center" colspan="2">
                          Totals (Aggregate)
                        </td>
                        <td class="text-center">22 h</td>
                        <td class="text-center"></td>
                        <td class="text-center">17 h</td>
                        <td class="text-center" colspan="2"></td>
                        <td class="text-center">5 h</td>
                        <td class="text-center">14 h</td>
                        <td class="text-center" colspan="7"></td>
                      </tr>
                    </tfoot>
                  </table>
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
import $ from "jquery";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { getSession } from "../..//assets/js/util.js";

export default {
  components: { DatePicker },
  time1: null,
  time2: null,

  name: "managerallEmployee",
  data() {
    return {
      envurl: process.env.VUE_APP_KUNIN_API_URL,
      empData: [],
      time1: null,
      time2: null,
      resDateText: null,
      user: JSON.parse(getSession("user")),
    };
  },
  mounted() {
    let todayDate = new Date();
    let month = todayDate.toUTCString("default", { month: "short" });
    let date = month;
    let dateText = "Today" + ", " + moment(date).format('MMM-DD-YYYY');

    if (localStorage.getItem("dateText")) {
      const tempText = localStorage.getItem("dateText");
      this.resDateText = tempText;
    } else {
      localStorage.setItem("dateText", dateText);
      const tempText = localStorage.getItem("dateText");
      this.resDateText = tempText;
    }
  },
  methods: {
    changeDateText(d) {
      if (d == 1) {
        let todayDate = new Date();
        let month = todayDate.toUTCString("default", { month: "short" });
        let date = month;
        const dateText = "Today" + ", " + moment(date).format('MMM-DD-YYYY');
        this.resDateText = dateText;
      } else if (d == 2) {
        const dateText = "Week over Week";
        this.resDateText = dateText;
      } else if (d == 3) {
        const dateText = "Month over Month";
        this.resDateText = dateText;
      } else {
        let date1 = new Date(this.time1);
        const month1 = date1.toLocaleString('default', { month: 'short'});
        let day1 = date1.toUTCString('default', { day: '2-digit'});
        let year1 = date1.toLocaleString('default', { year: 'numeric'});
        let resDate1 = month1 + '-' + day1 + '-' + year1;

        let date2 = new Date(this.time2);
        const month2 = date2.toLocaleString('default', { month: 'short'});
        let day2 = date2.toUTCString('default', { day: '2-digit'});
        let year2 = date2.toLocaleString('default', { year: 'numeric'});
        
        let resDate2 = month2 + '-' + day2 + '-' + year2;

        const dateText = moment(resDate1).format('MMM-DD-YYYY') + " to " + moment(resDate2).format('MMM-DD-YYYY');
        this.resDateText = dateText;
      }
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
    
    removearray() {
      this.forLogArray = [];
    },
    highfocustimeDefrence(data) {
      console.log("data:", data);
      if (!data) {
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
    getEmpData() {
      const endpoint = "http://" + this.envurl + "/api/v1/divisions/" + this.user.division.division_id + "/departments/all/activities/all?format=aggregate+hourly&date=today&by=employee";
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
          let EmData = res.data.data.employees;
          console.log("employee data: ", EmData);
          this.empData = EmData;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    employeTable() {
      this.$router.push("/empDetail");
    },
    highfocustime(data) {
      if (!data) {
        return "0";
      }
      var starttime = data[0];
      var endtime = data[1];

      var startreturn = moment(starttime, "H:mm").format("H:mm");
      var returnEndrtime = moment(endtime, "H:mm").format("H:mm");
      return startreturn + " - " + returnEndrtime;
    },
    calenderBoxShow() {
      if ($(".calender-Box").css("display") === "block") {
        $(".calender-Box").css("display", "none");
      } else {
        $(".calender-Box").css("display", "block");
      }
    },
    setActivity() {
      this.$router.push("/creditCard");
    },
    Setdesign(design) {
      if (design == "" || design == null) {
        return 0 + "%";
      }

      let compare;
      let setmrgin;
      let x;
      let y;
      x = design[0] + 1;
      y = design[1];
      compare = ((y - x) / 60) * 100;
      if (x > 0) {
        setmrgin = (x / 60) * 100;
        this.mrgin = setmrgin + "%";
      } else {
        this.mrgin = x;
      }

      return compare.toFixed(1) + "%";
    },
    getHourse(mins) {
      if (mins / 60 < 1) {
        return mins + "m";
      }
      var h = (mins / 60) | 0,
        m = mins % 60 | 0;
      return moment.utc().hours(h).minutes(m).format("hh:mm");
      //   return moment.utc().startOf('day').add(minutes, 'minutes').format('hh:mm')
    },
    openBox() {
      if ($(".open-box").css("display") == "block") {
        $(".open-box").css("display", "none");
      } else {
        $(".open-box").css("display", "block");
      }
    },
  },
  created() {
    this.getEmpData();
  },
};
</script>
<style lang="css" scoped>
#cerdit-card .calender-Box {
  top: 63%;
  left: 90%;
  min-width: 515px;
}
.employee-Table {
  overflow: auto;
}
</style>