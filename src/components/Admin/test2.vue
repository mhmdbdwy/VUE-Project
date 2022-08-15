<template>
  <div>    
    <headerbar
      title="Dashboard Overview: Department Head"
      v-bind:username="getUserName">
    </headerbar>  

    <section id="main">
      <div class="container-fluid">
        <div class="row">
          <div class="maincontent col-lg-9">
            <div class="mainContent">
              <div id="card" class="">
                <div class="tabs-Div">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-12">
                        <ul class="nav nav-tabs">
                          <li
                            :class="[
                              currentPage.includes('admin') ? activeClass : '',
                            ]"
                            v-if="isManager || isAdmin">
                            <router-link data-toggle="tab" to="/admin"
                              >Manage Activities</router-link
                            >
                          </li>
                          <li
                            :class="[
                              currentPage.includes('operations')
                                ? activeClass
                                : '',
                            ]"
                            v-if="isAdmin">
                            <router-link data-toggle="tab" to="/operations"
                              >Operations</router-link
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="main-tabs-content">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="">
                          <div id="activity" class="">
                            <div id="operation" class="">
                              <div class="multiple-select-options">
                                <div class="row">
                                  <div
                                    class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                  >
                                    <div class="selectDiv">
                                      <div class="departmentSelect">
                                        <label>Division</label>
                                        <select v-on:change="onChangeDivision($event)" >
                                          <option
                                            v-for="(division,
                                            index) in divisions"
                                            :key="index"
                                            :value="division.division_id"
                                            >
                                            {{ division.division_name }}
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                                  >
                                    <div class="selectDiv">
                                      <label>Select Department</label>
                                      <select v-on:change="onChangeDepartment($event)">
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
                              </div>
                              <div class="tableDiv">
                                <div class="row">
                                  <div class="col-lg-12">
                                    <h4>Set Hours Of Operations</h4>
                                  </div>
                                </div>
                                <!-- {{ expactedwork.day }} -->
                                <!-- <div v-if="selectedDepartment == 'all'">
                                  <div
                                    class="deptoperations"
                                    v-for="(operation, inde) in totalOperations"
                                    :key="inde"
                                  >
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <h2 class="h2">
                                          {{ operation.department_name }}
                                        </h2>
                                        <div class="table-responsive">
                                          <table class="table table-bordered">
                                            <thead>
                                              <tr>
                                                <td>Weekly Schedule</td>
                                                <td>Day 1</td>
                                                <td>Day 2</td>
                                                <td>Day 3</td>
                                                <td>Day 4</td>
                                                <td>Day 5</td>
                                                <td>Day 6</td>
                                                <td>Day 7</td>
                                                <td>Total</td>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  Expected work hours per day
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="expactedwork.day1"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="expactedwork.day2"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="expactedwork.day3"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="expactedwork.day4"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="expactedwork.day5"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="expactedwork.day6"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="expactedwork.day7"
                                                  />
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day1
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day2
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day3
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day4
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day5
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day6
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day7
                                                    )
                                                  }}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Lunch Breaks</td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="LunchBreak.day1"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="LunchBreak.day2"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="LunchBreak.day3"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="LunchBreak.day4"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="LunchBreak.day5"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="LunchBreak.day6"
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="LunchBreak.day7"
                                                  />
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      LunchBreak.day1
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day2
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day3
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day4
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day5
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day6
                                                    ) +
                                                    parseFloat(LunchBreak.day7)
                                                  }}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  Subtotal - Total Workday
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day1
                                                    ) +
                                                    parseFloat(LunchBreak.day1)
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day2
                                                    ) +
                                                    parseFloat(LunchBreak.day2)
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day3
                                                    ) +
                                                    parseFloat(LunchBreak.day3)
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day4
                                                    ) +
                                                    parseFloat(LunchBreak.day4)
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day5
                                                    ) +
                                                    parseFloat(LunchBreak.day5)
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day6
                                                    ) +
                                                    parseFloat(LunchBreak.day6)
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day7
                                                    ) +
                                                    parseFloat(LunchBreak.day7)
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day1
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day1
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day2
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day2
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day3
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day3
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day4
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day4
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day5
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day5
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day6
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day6
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day7
                                                    ) +
                                                    parseFloat(LunchBreak.day7)
                                                  }}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Non - working Time</td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="
                                                      nonworkingTime.day1
                                                    "
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="
                                                      nonworkingTime.day2
                                                    "
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="
                                                      nonworkingTime.day3
                                                    "
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="
                                                      nonworkingTime.day4
                                                    "
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="
                                                      nonworkingTime.day5
                                                    "
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="
                                                      nonworkingTime.day6
                                                    "
                                                  />
                                                </td>
                                                <td>
                                                  <input
                                                    type="number"
                                                    class="form-control custom-input"
                                                    v-model="
                                                      nonworkingTime.day7
                                                    "
                                                  />
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      nonworkingTime.day7
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day6
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day5
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day4
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day3
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day2
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day1
                                                    )
                                                  }}
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Total (24 hr period)</td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day1
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day1
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day1
                                                    )
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day2
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day2
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day2
                                                    )
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day3
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day3
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day3
                                                    )
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day4
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day4
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day4
                                                    )
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day5
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day5
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day5
                                                    )
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day6
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day6
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day6
                                                    )
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day7
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day7
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day7
                                                    )
                                                  }}
                                                </td>
                                                <td>
                                                  {{
                                                    parseFloat(
                                                      expactedwork.day1
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day1
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day1
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day2
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day2
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day2
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day3
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day3
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day3
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day4
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day4
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day4
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day5
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day5
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day5
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day6
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day6
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day6
                                                    ) +
                                                    parseFloat(
                                                      expactedwork.day7
                                                    ) +
                                                    parseFloat(
                                                      LunchBreak.day7
                                                    ) +
                                                    parseFloat(
                                                      nonworkingTime.day7
                                                    )
                                                  }}
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                    <div id="finishTableButtonDiv">
                                      <div class="row">
                                        <div class="col-lg-6">
                                          <p>
                                            <a
                                              class="finishBtn"
                                              onClick="document.getElementById('saveModal').style.display='block'"
                                              >Save</a
                                            >
                                          </p>
                                        </div>
                                        <div class="col-lg-6">
                                          <p @click="closeDiv()">
                                            <a
                                              class="cancleBtn"
                                              onClick="document.getElementById('cancelModal').style.display='block'"
                                              >Cancel</a
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div class="activity-target">
                                      <div class="container-fluid">
                                        <div class="row">
                                          <div class="col-lg-12">
                                            <h4>
                                              Set Activity Target Threshold
                                            </h4>
                                          </div>
                                        </div>
                                        <div class="input-percentage">
                                          <span class="plus-minus-text"
                                            >+/-</span
                                          >
                                          <input
                                            type="text"
                                            name="percentage"
                                            class="input-form"
                                            :value="
                                              operation.schedules[0].threshold
                                            "
                                            style="
                                              padding-left: 58px;
                                              font-size: 15px;
                                            "
                                          />
                                        </div>
                                        <div id="finishTargetButtonDiv">
                                          <div class="row">
                                            <div class="col-lg-6">
                                              <p>
                                                <a
                                                  class="finishBtn"
                                                  onClick="document.getElementById('saveModal').style.display='block'"
                                                  >Save</a
                                                >
                                              </p>
                                            </div>
                                            <div class="col-lg-6">
                                              <p @click="closeDiv()">
                                                <a
                                                  class="cancleBtn"
                                                  onClick="document.getElementById('cancelModal').style.display='block'"
                                                  >Cancel</a
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="optimal-div">
                                      <div
                                        class="container-fluid"
                                        style="margin-bottom: 35px"
                                      >
                                        <div class="row">
                                          <div class="col-lg-12">
                                            <h4>
                                              Set Optimal Duration Of Activity
                                              Flow State
                                            </h4>
                                          </div>
                                        </div>
                                        <div class="multi-input">
                                          <div class="row">
                                            <div class="col-lg-6">
                                              <label>DURATION</label>
                                              <div class="input-percentage">
                                                <span class="plus-minus-text"
                                                  >+/-</span
                                                >
                                                <input
                                                  type="text"
                                                  name="percentage"
                                                  class="input-form"
                                                  :value="
                                                    operation.schedules[0].flow
                                                      .duration
                                                  "
                                                  style="
                                                    padding-left: 58px;
                                                    font-size: 15px;
                                                  "
                                                />
                                              </div>
                                            </div>
                                            <div class="col-lg-6">
                                              <label>THRESHOLD</label>
                                              <div class="input-percentage">
                                                <span class="plus-minus-text"
                                                  >+/-</span
                                                >
                                                <input
                                                  type="text"
                                                  name="percentage"
                                                  class="input-form"
                                                  :value="
                                                    operation.schedules[0].flow
                                                      .threshold
                                                  "
                                                  style="
                                                    padding-left: 58px;
                                                    font-size: 15px;
                                                  "
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div id="finishOptimalButtonDiv">
                                          <div class="row">
                                            <div class="col-lg-6">
                                              <p>
                                                <a
                                                  class="finishBtn"
                                                  onClick="document.getElementById('saveModal').style.display='block'"
                                                  >Save</a
                                                >
                                              </p>
                                            </div>
                                            <div class="col-lg-6">
                                              <p @click="closeDiv()">
                                                <a
                                                  class="cancleBtn"
                                                  onClick="document.getElementById('cancelModal').style.display='block'"
                                                  >Cancel</a
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> -->
                                <!-- single dpt selected value -->
                                <!-- <div v-else>
                                  <div
                                    class="deptoperations"
                                    v-for="(operation, inde) in totalOperations"
                                    :key="inde"
                                  >
                                    <div
                                      v-if="
                                        operation.department_id ==
                                        selectedDepartment
                                      "
                                    >
                                      <div class="row">
                                        <div class="col-lg-12">
                                          <h2 class="h2">
                                            {{ operation.department_name }}
                                          </h2>
                                          <div class="table-responsive">
                                            <table class="table table-bordered">
                                              <thead>
                                                <tr>
                                                  <td>Weekly Schedule</td>
                                                  <td>Day 1</td>
                                                  <td>Day 2</td>
                                                  <td>Day 3</td>
                                                  <td>Day 4</td>
                                                  <td>Day 5</td>
                                                  <td>Day 6</td>
                                                  <td>Day 7</td>
                                                  <td>Total</td>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    Expected work hours per day
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .work_hours[0]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .work_hours[1]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .work_hours[2]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .work_hours[3]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .work_hours[4]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .work_hours[5]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .work_hours[6]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[0]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[1]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[2]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[3]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[4]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[5]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[6]
                                                      )
                                                    }}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>Lunch Breaks</td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .breaks[0]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .breaks[1]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .breaks[2]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .breaks[3]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .breaks[4]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .breaks[5]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    <input
                                                      type="number"
                                                      class="form-control custom-input"
                                                      :value="
                                                        operation.schedules[0]
                                                          .breaks[6]
                                                      "
                                                    />
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[0]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[1]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[2]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[3]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[4]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[5]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[6]
                                                      )
                                                    }}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    Subtotal - Total Workday
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[0]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[0]
                                                      )
                                                    }}
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[1]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[1]
                                                      )
                                                    }}
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[2]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[2]
                                                      )
                                                    }}
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[3]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[3]
                                                      )
                                                    }}
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[4]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[4]
                                                      )
                                                    }}
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[5]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[5]
                                                      )
                                                    }}
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[6]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[6]
                                                      )
                                                    }}
                                                  </td>
                                                  <td>
                                                    {{
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[0]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[0]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[1]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[1]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[2]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[2]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[3]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[3]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[4]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[4]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[5]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[5]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .work_hours[6]
                                                      ) +
                                                      parseFloat(
                                                        operation.schedules[0]
                                                          .breaks[6]
                                                      )
                                                    }}
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>Non - working Time</td>
                                                  <td>15</td>
                                                  <td>15</td>
                                                  <td>15</td>
                                                  <td>15</td>
                                                  <td>15</td>
                                                  <td>24</td>
                                                  <td>24</td>
                                                  <td>123</td>
                                                </tr>
                                                <tr>
                                                  <td>Total (24 hr period)</td>
                                                  <td>24</td>
                                                  <td>24</td>
                                                  <td>24</td>
                                                  <td>24</td>
                                                  <td>24</td>
                                                  <td>24</td>
                                                  <td>24</td>
                                                  <td>168</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                      <div id="finishTableButtonDiv">
                                        <div class="row">
                                          <div class="col-lg-6">
                                            <p>
                                              <a
                                                class="finishBtn"
                                                onClick="document.getElementById('saveModal').style.display='block'"
                                                >Save</a
                                              >
                                            </p>
                                          </div>
                                          <div class="col-lg-6">
                                            <p @click="closeDiv()">
                                              <a
                                                class="cancleBtn"
                                                onClick="document.getElementById('cancelModal').style.display='block'"
                                                >Cancel</a
                                              >
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="activity-target">
                                        <div class="container-fluid">
                                          <div class="row">
                                            <div class="col-lg-12">
                                              <h4>
                                                Set Activity Target Threshold
                                              </h4>
                                            </div>
                                          </div>
                                          <div class="input-percentage">
                                            <span class="plus-minus-text"
                                              >+/-</span
                                            >
                                            <input
                                              type="text"
                                              name="percentage"
                                              class="input-form"
                                              :value="
                                                operation.schedules[0].threshold
                                              "
                                              style="
                                                padding-left: 58px;
                                                font-size: 15px;
                                              "
                                            />
                                          </div>
                                          <div id="finishTargetButtonDiv">
                                            <div class="row">
                                              <div class="col-lg-6">
                                                <p>
                                                  <a
                                                    class="finishBtn"
                                                    onClick="document.getElementById('saveModal').style.display='block'"
                                                    >Save</a
                                                  >
                                                </p>
                                              </div>
                                              <div class="col-lg-6">
                                                <p @click="closeDiv()">
                                                  <a
                                                    class="cancleBtn"
                                                    onClick="document.getElementById('cancelModal').style.display='block'"
                                                    >Cancel</a
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="optimal-div">
                                        <div
                                          class="container-fluid"
                                          style="margin-bottom: 35px"
                                        >
                                          <div class="row">
                                            <div class="col-lg-12">
                                              <h4>
                                                Set Optimal Duration Of Activity
                                                Flow State
                                              </h4>
                                            </div>
                                          </div>
                                          <div class="multi-input">
                                            <div class="row">
                                              <div class="col-lg-6">
                                                <label>DURATION</label>
                                                <div class="input-percentage">
                                                  <span class="plus-minus-text"
                                                    >+/-</span
                                                  >
                                                  <input
                                                    type="text"
                                                    name="percentage"
                                                    class="input-form"
                                                    :value="
                                                      operation.schedules[0]
                                                        .flow.duration
                                                    "
                                                    style="
                                                      padding-left: 58px;
                                                      font-size: 15px;
                                                    "
                                                  />
                                                </div>
                                              </div>
                                              <div class="col-lg-6">
                                                <label>THRESHOLD</label>
                                                <div class="input-percentage">
                                                  <span class="plus-minus-text"
                                                    >+/-</span
                                                  >
                                                  <input
                                                    type="text"
                                                    name="percentage"
                                                    class="input-form"
                                                    :value="
                                                      operation.schedules[0]
                                                        .flow.threshold
                                                    "
                                                    style="
                                                      padding-left: 58px;
                                                      font-size: 15px;
                                                    "
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div id="finishOptimalButtonDiv">
                                            <div class="row">
                                              <div class="col-lg-6">
                                                <p>
                                                  <a
                                                    class="finishBtn"
                                                    onClick="document.getElementById('saveModal').style.display='block'"
                                                    >Save</a
                                                  >
                                                </p>
                                              </div>
                                              <div class="col-lg-6">
                                                <p @click="closeDiv()">
                                                  <a
                                                    class="cancleBtn"
                                                    onClick="document.getElementById('cancelModal').style.display='block'"
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
                                </div> -->
                              
                                <div v-if="selectedDepartment == null ">
                                  <div v-for="(dept, index) in totalDepart"
                                      :key="index">
                                    <SetOperationHourComponent 
                                      v-bind:selected_division="selectedDivision"
                                      v-bind:selected_department="dept" 
                                      v-bind:divisions="divisions"
                                      v-bind:departments="totalDepart">
                                    </SetOperationHourComponent>
                                  </div>
                                </div>
                                <div v-else>
                                  <SetOperationHourComponent 
                                    v-bind:selected_division="selectedDivision"
                                    v-bind:selected_department="selectedDepartment" v-bind:divisions="divisions"
                                    v-bind:departments="totalDepart">
                                  </SetOperationHourComponent>
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
      <!-- Save Dialog -->
      <div
        id="saveModal"
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
                onclick="document.getElementById('saveModal').style.display='none'"
              >
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
                        <a
                          onclick="document.getElementById('saveModal').style.display='none'"
                          >Yes, Save</a
                        >
                        <a
                          onclick="document.getElementById('saveModal').style.display='none'"
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
        <!-- Finish Modal End -->
      </div>
      <!-- Dialog box for finish button -->

      <!-- Cancel Dialog -->
      <div
        id="cancelModal"
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
                onclick="document.getElementById('cancelModal').style.display='none'"
              >
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
                        <a
                          onclick="document.getElementById('cancelModal').style.display='none'"
                          >Yes, Cancel</a
                        >
                        <a
                          onclick="document.getElementById('cancelModal').style.display='none'"
                          class="cancelDelete"
                          >No</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Cancel Modal End -->
      </div>
      <!-- Dialog box for Cancle button -->
    </section>
  </div>
</template>
<style lang="css" scope>
.main-tabs-content {
  margin-top: 25px;
}
</style>
<script>
import axios from "axios";
import moment from "moment";
import sidebarMixin from "../sidebarMxin";
import headerbar from "../headerbar.vue";
import SetOperationHourComponent from '../SetOperationHourComponent.vue';
import { getSession } from "../..//assets/js/util.js";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";

export default {
  components: { headerbar, SetOperationHourComponent },
  name: "operations",
  mixins: [sidebarMixin],
  data() {
    return {
      selectedDepartment: null,
      totalOperations: [],
      //divisonsName: [],
      divisions: null,
      totalDepart: [],
      selected: "all",
      totalhours: 24,
      deptHours: [],
      
      user: JSON.parse(getSession("user")),
      selectedDivision: null
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
    getUserName: function () {
      if (this.user != undefined) {
        return this.user.first_name + " " + this.user.last_name;
      }
    },
    closeDiv() {
      //   alert("do whatever you want")
      console.log("Cancel Button Clicked");
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
      let department = null;
      let departmentID = event.target.value;
      this.totalDepart.forEach(element => {
        if(element.department_id === departmentID) {
          department = element;
        }
      });
      this.selectedDepartment = department;
      console.log("Selected Department >> ", this.selectedDepartment);
    }

  },

  created() {    
    loadProgressBar();
    this.getDivisions();
    //this.getHoursOpertation();    
  },
  
};
</script>
<style lang="css" scoped>
.custom-input {
  border: none;
  width: 80px;
  padding: 0px;
  margin: 0px;
}

#nprogress .bar {
  z-index: 1200 !important;
}
</style>