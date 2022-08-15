<template>
  <div class="home" style="background-color:#f5f8fa;">
        <section id="main">
         <div class="container-fluid p-0">
            <div class="row">
               <div class="loginContent col-lg-12">
                  <!-- Modal -->
                  <div id="myModal" >
                    <div class="modal-dialog">
                      <!-- Modal content-->
                      <div class="modal-content">
                        <div class="modal-header">
                           <div class="container-fluid">
                              <div class="row">
                                 <div class="col-lg-4 login-logo">
                                    Login
                                 </div>
                                
                                 <div class="col-lg-8">
                                    <h4 class="welcomeTxt">WELCOME!</h4>
                                 </div>
                              </div>
                           </div>
                          <!-- <button type="button" class="close" data-dismiss="modal">&times;</button>
                          <h4 class="modal-title">Modal Header</h4> -->
                        </div>
                        <div class="modal-body">
                          <div class="formDiv">
                             <div class="row">
                                <div class="col-lg-12">
                                   <label>Email</label>
                                  <input required type="email" name="email" class="input-form" v-model="userEmail">
                                </div>
                             </div>
                             <div class="row">
                                <div class="col-lg-12">
                                  <label>Password</label>
                                  <input required type="password" name="password" class="input-form" v-model="userPassword">
                                </div>
                             </div>
                              <div class="row">
                                <div class="col-lg-12">
                                   <button class="loginBtn" @click="Login()">Login</button>
                                   <button class="forgetBtn">Forgot Password ?</button>
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
// // import $ from "jquery";
// // import boostrap from "bootstrap";
import Swal from 'sweetalert2';
import axios from "axios";
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { setSession } from '../assets/js/util.js';


import 'axios-progress-bar/dist/nprogress.css';

export default {  
    name: 'genralLogin',
   
    data(){
        return{
           envurl: process.env.VUE_APP_KUNIN_API_URL,
            userEmail: '',
            userPassword: ''
        }
    },
    created() {
      loadProgressBar()
   },
    methods: {
        Login() {
            const endpoint = 'http://' + this.envurl + '/api/v1/users/login'

            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }

            const data = {
                'user': {
                    'email': this.userEmail,
                    'password': this.userPassword
                }
            }
            
         axios.post(endpoint,data, {headers: headers}).then((res)=>{
            setSession('user', JSON.stringify(res.data.user))
            let employee_type = res.data.user.employee_type.trim().toLowerCase()
            let isAdmin = res.data.user.admin
            if(isAdmin == true){
               console.log("hi")
               this.$router.push("/admin");
            }else{
               switch(employee_type) {
                  case 'executive':                                    
                     this.$router.push("/division");
                     break
                  case 'manager':
                     if(!isAdmin){
                        this.$router.push("/manager");
                     }
                     break;
                  case 'employee':
                     this.$router.push("/employee");
                     break               
               }
            }
            
         }).catch((err)=>{
            Swal.fire({title: 'Sorry could not authenticate. Please enter the valid email & password', icon: 'error'});
            console.log(err)
         })
        }
    }
}
</script>
