<!DOCTYPE html>
<html lang="es">
    <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <link rel="stylesheet" type="text/css" href="vista/css/style.css"></link>
            <link rel="stylesheet" type="text/css" href="vista/css/style-center-pagination.css"></link>
            
            <link rel="stylesheet" type="text/css" href="vista/css/style-center.css"></link>
            <link rel="stylesheet" type="text/css" href="vista/css/style-footer.css"></link>

            <script type="text/javascript" src="vista/js/jquery-2.1.1.js"></script>
            <script type="text/javascript" src="vista/js/function_dom.js"></script>
            <script type="text/javascript" src="vista/js/scripts.js"></script>
           
            
            <title>Blog Arzabal</title>
    </head>
    <body>
        <div id="wrap">
            <div id="banner" class="banner">
                <p>Lab Luzo 0.1</p>
            </div>
            <div id="nav">
                <div id="nav-left">
                    <nav>
                        <ul>
                           <!-- <li><a href="http://localhost:8888/Blog_Arzabal/index.php">Inicio</a></li>-->
                            <li><a href="http://localhost/Blog_Arzabal/index.php">Inicio</a>
                            <li>Categorias</li>	
                            <li>Proyectos</li>
                            <li>Acerca de Mi</li>
                            <li>Curriculum</li>	
                            <li>Contacto</li>	
                        </ul>
                    </nav>
                </div>
                <div id="nav-right">
                    <form method="POST" action="index.php">
                        <div id="nav-login">
                            <div id="nav-login-form">
                                <input type="text" required="required" placeholder="Username" name="login-user">
                                <input type="password" required="required" placeholder="Password" name="login-pass">
                            </div>
                            <div id="nav-login-img">
                                <input type="hidden" name="loguear" value="loguear">
                                <input type="image" src="vista/img/login.png"  name="loguear" width="30" height="30">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div id="name-login">
                <div id="name">
                    <p>Bienvenido #user#</p>
                </div>
            </div>
            <div id="body-center-blog" class="body-center-blog">
                <div id="blog-left">
                    #CONTENIDO#
                </div>
               <aside id="blog-right">
                   #MENU_LEFT#                  
               </aside>                
            </div>
            <div id="pagination-blog">
                
            </div>
        <div class="clear"></div>
        <footer id="footer">
            <p>LAB Luzo Beta 0.1</p>
        </footer>	
        </div>

    </body>
</html>
