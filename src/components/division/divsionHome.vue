<template>
    <div>
      <section id="main">
         <div class="container-fluid">
            <div class="row">
               <div class="maincontent col-lg-9">
                  <div class="tab-content mainContent">
                    <router-view/>
                  </div>
               </div>
            </div>
         </div>
      </section>
      </div>
</template>
<script>
 
export default {
  
   data(){
      return{
         name:"divisionhome",
      }
   },
   methods:{
    
   },
}
</script>