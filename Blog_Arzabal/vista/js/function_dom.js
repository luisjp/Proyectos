var generate = generate || {};

generate.dom = {
    el:"",
    html:"",
    id:"",
    tag:"",
    text:"",
    logueado: false,
    
    crea_Elemento : function(elm_ini,el,html)
    {
        var tmp = document.createElement(el);
        var txt = document.createTextNode(html.toUpperCase());
        tmp.appendChild(txt);
     
        return tmp;
    },
    get_Id : function(id)
    {
         return this.id = document.getElementById(id);
    },
    tag_name : function(tag)
    {
         return this.tag = document.getElementsByTagName(tag);
    },
    create_text: function(text)
    {
        return this.text = document.createTextNode(text);
    },
    change_form : function()
    {
  
        if(generate.dom.tag_name("b")[0].getAttribute("user")=="select")
        {
            this.logueado= true;
            logueado = true;
            var form = generate.dom.get_Id("nav-login-form");
            var inputs = generate.dom.tag_name("input");

            form.removeChild(inputs[0]);
            form.removeChild(inputs[0]);
            
            generate.dom.get_Id("nav-login-img").removeChild(generate.dom.tag_name("input")[0]);
            
            return form.appendChild(generate.dom.crea_Elemento("nav-login-form","label",generate.dom.tag_name("b")[0].innerHTML));
        } else{
            return "";
        } 
    }
};

generate.dom.comprueba_editable = function()
{
    if(this.logueado){
        if($("edit").attr("edit-title")=="off"){
           $("edit").attr("edit-title","on");
           $( "<a class='edit'> [ Edit ]</a>" ).insertAfter( "a#title-post" );
           $( "<a style='float:right;' class='edit'> [ Edit ]</a>" ).insertAfter( "p#content-post");
        }
        return true;
        
    }else{
        return false;
    }
};
generate.dom.editar = function()
{
    $("h3 a.edit").click(function(e){
        e.preventDefault();
        var txt_final="";
        var id_post = $(this).parent().find("a[href]").attr('href').split("=");
       
        var txt = $(this).parent('h3').text().split("[ Edit ]");
        $(this).parent().parent().append("<input type='text' id='new-title' value='"+txt[0]+"'>");
        $(this).parent('h3').remove(); 
        
        $("#new-title").keypress(function(e){
            
            txt_final = $("#new-title").val();

            if(e.which == 13) {
               $(this).parent("#post-title").append("<h3> <a id='title-post' href='index.php?select_post="+id_post[1]+"'>"+txt_final+"</a><a class='edit'> [ Edit ]</a><edit edit-title='on'></edit></h3>");            
               connect_ajax(txt_final,id_post[1]);
               $(this).remove(); 
            }            
        });
    }); 
    
    
    function connect_ajax(valor,id){
       
        $.post("http://localhost:8888/Blog_Arzabal/vista/js/ajax/script.php", {Id_title: valor, id:id}) ;
  
    }
};
generate.dom.editar_cont = function()
{
    $("#post-content a.edit").click(function(e){
        e.preventDefault();
        var txt_final="";
        var id_post = $(this).parent("#post-content").find("p#content-post").attr('identify').split("=");
        
        var txt = $(this).parent("#post-content").find("#content-post").html();
         

        $(this).parent('#post-content').append("<textarea rows='4' cols='110' id='new-content'> "+txt+"</textarea>");
     
        $(this).parent('#post-content').find("textarea#new-content").insertAfter($(this).parent('#post-content').find("div.imagen-post"));
        $(this).parent('#post-content').find("p#content-post").remove(); 
        
        $("#new-content").keypress(function(e){
            
            txt_final = $("#new-content").val();
           
            if(e.which == 13) {
               $(this).parent("#post-content").append("<p identify="+id_post+"' id='content-post'>"+txt_final+"</p>");            
               $(this).parent('#post-content').find("p#content-post").insertAfter($(this).parent('#post-content').find("div.imagen-post"));
               
                connects_ajax(txt_final,id_post);
               $(this).remove(); 
            }            
        });
        
    }); 
    
    
    function connects_ajax(valor,id){
        
        $.ajax({
            //url: "http://localhost:8888/Blog_Arzabal/vista/js/ajax/script.php", 
            url: "http://localhost/Blog_Arzabal/vista/js/ajax/script.php", 
            type: "POST",
            dataType: "text",
            data: "Id_cont="+valor+"&id="+id
         });   
    }
};