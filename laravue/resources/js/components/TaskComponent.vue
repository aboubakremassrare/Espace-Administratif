<template>
    <div class="container">

        <div class="form-row">
            <div class="col-row">
                <input type="text" class="form-control" @keyup="searchTask" v-model="searchtask" placeholder="Chercher ...">
            </div>
        </div>
        <add-task @task-added="refresh"></add-task>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="task of tasks.data" :key="task.id">
             <a href="#">{{task.name}}</a>
             <div>
                 <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" @click="getTask(task.id)">
                   Edit
                 </button>

                 <button type="button" class="btn btn-danger"  @click="deleteTask(task.id)">
                   Delete
                 </button>
             </div>
            
          </li>
        </ul>
        <edit-task v-bind:task="task" @task-edit="refresh"></edit-task>

        <pagination :data="tasks" @pagination-change-page="getResults"></pagination>

    </div>
</template>


<script>
    export default {

        data(){
            return{
                tasks:{},
                task:{},
                searchtask:''
            }
        },
        created(){
            axios.get('http://localhost:8005/task')
                 .then(response => this.tasks=response.data)
                 .catch(error =>console.log(error))
        },
        methods: {
		   getResults(page = 1) {
			axios.get('http://localhost:8005/task?page=' + page)
				.then(response => {
					this.tasks = response.data;
				});
            },
            refresh(tasks){
                this.tasks=tasks.data
            },
            deleteTask(id){
                axios.delete('http://localhost:8005/task/'+id)
				.then(response => {
                    this.tasks = response.data;
                })
                .catch(error => console.log(error));
            },
            getTask(id){
                axios.get('http://localhost:8005/task/'+id+'/edit')
				.then(response => {
                    this.task = response.data;
				});

            },
            searchTask(){

            }
	    },

        mounted() {
            console.log('Component mounted.')
        },
    
    }
</script>
