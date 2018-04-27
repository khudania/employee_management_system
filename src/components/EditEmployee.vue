<template>
    <div id="edit-employee">
        <h3>Edit Employee</h3>
         <div class="row">
            <form @submit.prevent="updateEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="emp_id" required>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                      
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="dept" required>
                     
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                     
                    </div>
                </div>
                <button type="submit" class="btn green darken-1">Submit</button>
                <router-link to="/" class="btn grey">Cancle</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
  name: 'edit-employee',
  data(){
      return{
          emp_id : null,
          name : null,
          dept : null,
          position : null
      }
  },
  beforeRouteEnter (to, from, next){
      db.collection('employees').where('emp_id', '==', to.params.emp_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              next(vm => {
                  vm.emp_id = doc.data().emp_id
                  vm.name = doc.data().name
                  vm.dept = doc.data().dept
                  vm.position = doc.data().position
              })
          })
      })
  },
  watch: {
      '$route': 'fetchData'
  },
  methods : {
      fetchData(){
          db.collection('employees').where('emp_id', '==', this.$route.params.emp_id).get().then(querySnapshot =>{
              querySnapshot.forEach(doc =>{
                  this.emp_id = doc.data().emp_id
                  this.name = doc.data().name
                  this.dept = doc.data().dept
                  this.position = doc.data().position
              })
          })
      },
      updateEmployee(){
          db.collection('employees').where('emp_id', '==', this.$route.params.emp_id).get().then(querySnapshot =>{
              querySnapshot.forEach(doc =>{
                  doc.ref.update({
                      emp_id : this.emp_id,
                      name: this.name,
                      dept : this.dept,
                      position : this.position
                  })
                  .then(() => {
                      this.$router.push({name: 'view-employee', params: {emp_id: this.emp_id}})
                  })
              })
          })
      }
  }
}
</script>
