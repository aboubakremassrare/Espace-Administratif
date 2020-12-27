
<template>
    <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <label for="name">Nom de la tache</label>
                    <textarea name="name" id="name" rows="4" class="form-control" v-model="task.name"></textarea>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal"  @click="editTask">Enregistrer</button>
            </div>
            </div>
        </div>
        </div>
    
    </div>
</template>


<script>
    export default {
 
        props:['task'],
        // data(){
        //     return{
        //         name:''
        //     }
        // },
        methods:{
            editTask(){
                axios.patch('http://localhost:8005/task/'+this.task.id+'/edit',{name:this.task.name})
                 .then(response => this.$emit('task-edit',response))
                 .catch(error =>console.log(error))
            }
        },
        // mounted() {
        //     console.log('Component mounted.')
        // }
    }
</script>
