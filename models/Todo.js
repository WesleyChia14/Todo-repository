 export class Todo {
  
    addTodo(nameToDo){
        var objToDo = {
          nameToDo: nameToDo,
          statusToDo: false
        }

        this.listToDos.push(objToDo);
        localStorage.setItem('listToDos', JSON.stringify(this.listToDos));
    }

    editToDo(id,text){
       var idsedit = id.split("-");
       var idedit = idsedit[1];
      this.listToDos[idedit-1].nameToDo = text;
      localStorage.setItem('listToDos', JSON.stringify(this.listToDos));
    }

    deleteToDo(id){
      // var idstodo = id.split("-");
      // var idtodo = idstodo[1];
      var idtodo = this.getId(id);
      this.listToDos.splice(idtodo-1,1);
      localStorage.setItem('listToDos', JSON.stringify(this.listToDos));
    }
    
    toDoCheck(id){
    var idtodo = this.getId(id);
   
    this.listToDos[idtodo-1].statusToDo = true;
    localStorage.setItem('listToDos', JSON.stringify(this.listToDos));
    }

    undotoDo (id){
      var idtodo = this.getId(id);
     
      this.listToDos[idtodo-1].statusToDo = false;
      localStorage.setItem('listToDos', JSON.stringify(this.listToDos));
    }
    
    
    constructor(){
      var listToDo = localStorage.getItem('listToDos');
      this.listToDos = JSON.parse(listToDo) ? JSON.parse(listToDo) : [];
    } 

     getId (id) {
      var idstodo = id.split("-");
      var idtodo = idstodo[1];
      return idtodo;
    }
}

