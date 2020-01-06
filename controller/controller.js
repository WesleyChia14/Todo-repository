import {Todo} from '../models/Todo.js'

var txtbox = $('.txtbox');
var footer = $('.footer');
var trash = '.delete';
var check = '.check';
var undo = '.undo';
var input = '.input-todo';
var textinput = '.input-todo';

$(document).ready(function () {
    var todo = new Todo();
    showToDos();
//Events
    txtbox.on("keyup" , function(e){
        var KeyCode = e.keyCode;
        if(KeyCode == 13 && txtbox.val() != "" ) {
           todo = new Todo();
           todo.addTodo(txtbox.val());
           txtbox.val('');
           //console.log(todo.listToDos);
           showToDos();
        }
        
    });

//     $(document).on("keyup", textinput , function (e) {
//         let KeyCode = e.keyCode;
//         if(KeyCode == 13 && $(this).val() != ""){
//           todo = new Todo();
//           let id = $(this).attr('id');
//           let text = $(this).val();
//           todo.editToDo(id,text);
//     }
//    });


    $(document).on("focusout", textinput , function (e) {
        if($(this).val() != ""){
          todo = new Todo();
          let id = $(this).attr('id');
          let text = $(this).val();
          todo.editToDo(id,text);
        }
   });

   $(document).on("dblclick", input, function(){
    let id = $(this).attr('id');
    if ( $(this).attr( "class" ) === 'input-todo' ) {
        $('#'+id).removeAttr( "readonly" );
     } 
   });

   $(document).on("click", trash, function(){
    let id = $(this).parent().attr('id');
    todo = new Todo();
    $('#'+id).remove();
    todo.deleteToDo(id);
    
     showToDos();
   });

   $(document).on("click", check, function(){
    todo = new Todo();
    let id = $(this).parent().attr('id');
    todo.toDoCheck(id);
    $('#'+id).remove();
    showToDos();
   });

   $(document).on("click", undo, function(){
    todo = new Todo();
    let id = $(this).parent().attr('id');
    todo.undotoDo(id);
    $('#'+id).remove();
    showToDos();
   });
   
    function showToDos(){
        todo = new Todo();
        let numItem = 0;
        $('.notcompleted').html("<h3>Not completed</h3>");
        $('.completed').html("<h3>Completed</h3>");
    
        todo.listToDos.forEach(todo => {
            numItem++;
            if(!todo.statusToDo){
                $('.notcompleted').append(
                        '<div class="todo" id="todo-'+numItem+'">' +
                        '<input id="input-'+numItem+'" type="text" class="input-todo" readonly="readonly" value="'+todo.nameToDo+'">' +  
                        '<i class="fas fa-check check" title="Done"></i>' + 
                        '<i class="fas fa-trash-alt delete" title="Delete"></i>' +  
                        '</div>');
            } else {
                $('.completed').append(
                    '<div class="todo " id="todo-'+numItem+'">' +
                    '<input id="input-'+numItem+'" readonly="readonly"  type="text" class="input-todo todo-true"  value="'+todo.nameToDo+'">' +
                    '<i class="fas fa-undo-alt undo" title="Undo"></i>' +
                    '<i class="fas fa-trash-alt delete" title="Delete"></i>' +  
                    '</div>');
            }
        });
        
        NumtoDos();
    }
    

    function NumtoDos(){
        todo = new Todo();
        $('.footer').html("");
        var done=0;
        var notdone = 0;
        if(todo.listToDos.length > 0){
            todo.listToDos.forEach(todo => {
                if(todo.statusToDo === true) {
                  done++;
                }
            });
    
            $('.footer').append('<h5>'+done+' / '+todo.listToDos.length+' To Do(s) completed </h5>');
        }else{
            $('.footer').append('<h5>'+done+' / '+todo.listToDos.length+' To Do(s) completed </h5>');
        }
    }
    
    
});