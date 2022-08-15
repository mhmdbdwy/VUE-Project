<template>
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
                    <router-link data-toggle="tab" to="/admin">
                        Manage Activities
                    </router-link>
                </li>
                <li 
                :class="[
                    currentPage.includes('operations') ? activeClass : '',
                ]"
                v-if="isAdmin">
                    <router-link data-toggle="tab" to="/operations">
                        Operations
                    </router-link>
                </li>
            </ul>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import sidebarMixin from "../sidebarMxin";
import { getSession } from "../..//assets/js/util.js";
export default {
    mixins: [sidebarMixin],
    data(){
        return{
            user: JSON.parse(getSession("user")),
        };
    },
    computed: {
        isAdmin: function() {
            //return true;
            if (this.user != undefined) {        
                return true; 
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
        }
    }
}
</script>