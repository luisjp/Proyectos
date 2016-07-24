$( document ).ready(function() {
   
    generate.dom.change_form();
   

    if(generate.dom.comprueba_editable()){
        generate.dom.editar();
        generate.dom.editar_cont();
    }
    
});

