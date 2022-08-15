<template>
    <div class="performance-overview m-t-20">
        <div class="row">
            <div class="col-lg-12">
                <h4>All Notes</h4>
            </div>
        </div>
        
        <div class="table-performance-overview">
            <div class="row">
                <div class="table-responsive">
                    <div class="">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <td @click="sortByDate">
                                        Date Submitted 
                                        <i class="fa fa-angle-down" v-if="isSortByDate" aria-hidden="true"></i>
                                        <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                                    </td>
                                    <td @click="sortByActivityName">
                                        Focus Area 
                                        <i class="fa fa-angle-down" v-if="isSortByActivityName" aria-hidden="true"></i>
                                        <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                                    </td>
                                    <td width="400">Notes</td>
                                    <td @click="sortBySubmittedBy">
                                        Submitted By 
                                        <i class="fa fa-angle-down" v-if="isSortBySubmittedBy" aria-hidden="true"></i>
                                        <i class="fa fa-angle-up" v-else aria-hidden="true"></i>
                                    </td>
                                    <td>
                                        Reply
                                    </td>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(item, u) in notesData" :key="u">
                                    <td style="text-align: left" width="115">
                                        {{ item.date_submitted }}
                                    </td>

                                    <td style="text-align: left">
                                        {{ item.activity_name }}
                                    </td>

                                    <td style="text-align: left" width="200">
                                        {{ item.note }}
                                    </td>

                                    <td style="text-align: left">
                                        {{ item.submitted_by }}
                                    </td>
                                    <td class="text-center" style="font-weight: bold">
                                        <div @click="showNotes(index)">+</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { getSession } from '../assets/js/util.js';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import Swal from 'sweetalert2'

export default {
    name: "Notes",
    props:['name', 'type', 'notesData'],

    data() {
        return {
            envurl: process.env.VUE_APP_KUNIN_API_URL,
            ref: this,
            user: JSON.parse(getSession('user')),
            isSortByDate: false,
            isSortBySubmittedBy: false,
            isSortByActivityName: false,
        }
    },


    computed: {
        getCurrentDateTime: function() {
            return moment().format("HH:mm - MMM, D YYYY");
        },

        getActivityName: function () {
            if (this.selectedNotesActivityData != null) {
                return this.selectedNotesActivityData.activity_name;
            }else{
                return []
            }
        },
    },

    methods: {
        sortByDate: function() {
            if (this.isSortByDate){
                this.isSortByDate = false; 
                this.notesData.sort((a, b) => (new moment(a.date_submitted).format('YYYYMMDD') - new moment(b.date_submitted).format('YYYYMMDD')));
            }else{
                this.notesData.sort((a, b) => (new moment(b.date_submitted).format('YYYYMMDD') - new moment(a.date_submitted).format('YYYYMMDD')));
                this.isSortByDate = true;
                this.isSortBySubmittedBy = false;
                this.isSortByActivityName = false;
            }
            return this.notesData;
        },
        sortBySubmittedBy: function() {
            if (this.isSortBySubmittedBy){
                this.isSortBySubmittedBy = false; 
                this.notesData.sort((a, b) => (a.submitted_by > b.submitted_by) ? -1 : 1);
            }else{
                this.notesData.sort((a, b) => (a.submitted_by > b.submitted_by) ? 1 : -1);
                this.isSortBySubmittedBy = true;
                this.isSortByDate = false;
                this.isSortByActivityName = false;
            }
            return this.notesData;
        },
        sortByActivityName: function() {
            if (this.isSortByActivityName){
                this.isSortByActivityName = false; 
                this.notesData.sort((a, b) => (a.activity_name > b.activity_name) ? -1 : 1);
            }else{
                this.notesData.sort((a, b) => (a.activity_name > b.activity_name) ? 1 : -1);
                this.isSortByActivityName = true;
                this.isSortByDate = false;
                this.isSortBySubmittedBy = false;
            }
            return this.notesData;
        },
        deleteNotes(key, item) { 
            let division = this.user.division.division_id
            let department = this.user.department.department_id
            let activityID = item.activity_id
            let noteID = item.note_id

            const endpoint = "http://" + this.envurl + "/api/v1/divisions/"+division+"/departments/"+department+"/activities/"+activityID+"/notes/"+noteID

            const headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Token "+this.user.access_token
            }

            Swal.fire({
                title: 'Are you sure you want to delete this Notes?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                    .delete(endpoint, {headers: headers} )
                    .then((res) => {                  
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        this.$router.go();
                    })
                    .catch((err) => {
                        console.log("saveNotes: error : ", err);
                    });
                }
            });
        }
        
    },

    created() {
        loadProgressBar();
    }
};

</script>
<style lang="css" scoped>
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