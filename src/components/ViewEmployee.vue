<template>
    <div id="view-employee">
        <h3><br></h3>
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{name}}</h4>
            </li>
            <li class="collection-item">Employee ID#: {{emp_id}}</li>
            <li class="collection-item">Department: {{dept}}</li>
            <li class="collection-item">Position: {{position}}</li>
        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteEmployee" class="btn red">Delete</button>


        <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'edit-employee', params: {emp_id: emp_id}}" class="btn-floating btn-large waves-effect waves-light green">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
  name: 'view-employee',
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
      deleteEmployee(){
          if(confirm('Are you sure?')){
              db.collection('employees').where('emp_id', '==', this.$route.params.emp_id).get().then(querySnapshot =>{
              querySnapshot.forEach(doc =>{
                  doc.ref.delete()
                  this.$router.push('/')
                })
            })
          }
      }
  }
}
</script>
