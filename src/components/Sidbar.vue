<template>
    <div>
       <section id="main">
         <div class="container-fluid">
            <div class="row">
               <div class="maincontent col-lg-9">
                  <div class="main_header">
                     <div class="container-fluid">
                        <div class="row">
                           <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12">
                              <p v-if="user.employee_type == 'executive'">Executive: {{ user.division.division_name }}</p>
                              <p v-else-if="user.employee_type == 'manager'">Manager: {{ user.department.department_name }}</p>
                              <p v-else>Setup and Administration: {{ user.division.division_name }}</p>
                           </div>
                           <div class="user-profile-name">
                           <div class="col-lg-4 col-md-4 col-sm-6 col-xs-4">
                              <p class="loginText"><i class="fa fa-user-circle-o" aria-hidden="true"></i> {{getUserName}}</p>
                           </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        
      </section>
      
       <section id="main">
         <div class="container-fluid">
            <div class="row">
               <div class="sideNav col-lg-3">
                  <div class="siteName">
                     <h4>Kunin AI</h4>
                  </div>
                  <ul class="nav nav-tabs nav-stacked">
                     <li>
                        <router-link :to="'/' + links[0]" v-if="!user.admin">
                        <img src="../assets/img/topicon.png" alt="" width="80">

                           <!-- <i class="fa fa-tachometer" aria-hidden="true"></i> -->
                        </router-link>
                     </li>
                     <li>
                        <router-link :to="'/' + links[1]"  v-if="!user.admin">
                        <a data-toggle="tab" href="#cerdit-card">
                        <img src="../assets/img/seconicon.png" alt="" width="80">

                           <!-- <i class="fa.. fa-bar-chart" aria-hidden="true"></i> -->
                        </a>
                        </router-link>
                     </li>
                     <li :class="[isInAdminTap ? activeClass :'']" v-if="isAdmin">
                        <router-link to="/admin">
                           <img src="../assets/img/iconeye.png" alt="" width="80">
                        </router-link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
      <section id="main">
         <div class="container-fluid">
            <div class="row">
               
               <div class="maincontent employeecontent col-lg-9">
                  <div class="main_header" v-if="user.employee_type == 'employee'">
                     <div class="container-fluid">
                        <div class="row">
                           <div class="col-lg-8 col-md-8 col-sm-6 col-xs-12">
                              <p>Department: {{ user.department.department_name }}</p>
                           </div>
                           <div class="user-profile-name">
                           <div class="col-lg-4 col-md-4 col-sm-6 col-xs-4">
                              <p class="loginText"><i class="fa fa-user-circle-o" aria-hidden="true"></i> {{getUserName}}</p>
                           </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="manContent">
                    <router-view></router-view>
                  </div>
                </div>
            </div>
            </div>
        
      </section>
    </div>
</template>
<script>
import sidebarMixin from "./sidebarMxin";
import { getSession } from "../assets/js/util.js";
import "axios-progress-bar/dist/nprogress.css";

export default {
   mixins: [sidebarMixin],
   name:"EmplyeDash",

   data() {
      return {      
         user: JSON.parse(getSession("user")),
         links: [],
         isAdmin: false,
      };
   },
   mounted() {
      console.log("the user", this.user);
      if(this.user == null){
         this.$router.push("/");
      }
      if(this.user.employee_type == 'employee'){
         this.links = ['employee', 'emplyedetails'];
      }else if(this.user.employee_type == 'manager'){
         this.links = ['manager', 'mCreditCard']
         this.isAdmin = true;
      }else{
         this.isAdmin = true;
         this.links = ['division', 'creditCard']
      }
   },
   computed: {
    getUserName: function () {
      if (this.user != undefined) {
        return this.user.first_name + " " + this.user.last_name;
      }else{
         return "undifinde"
      }
    },
    isInAdminTap: function() {
      if(this.user.admin && (this.currentPage.includes('admin') || this.currentPage.includes('operations'))){
         return true;
      }else{
         return false;
      }
    }
  }
}
</script>
<style lang="css" scoped>
.siteName{
   height: 72px !important;
}
</style>