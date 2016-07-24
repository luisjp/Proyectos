<?php
   
    class users extends database
    {
        private $user;
        private $pass;
        
        public function __construct($u,$p) {
            $this->user = $u;
            $this->pass = $p;
        }
        
        function comprobar()
        {
            $this->conectar();
            $query = $this->consulta("Select pass from users_blog where user_name = '".$this->user."' ");
            $this->disconnect();
            if($this->numero_de_filas($query))
            {
                while($psts = $this->fetch_assoc($query))
                {
                    if( strcmp($this->pass,$psts["pass"]) == 0 )
                            return true;
                    else    
                            return false;

                }
                
            }
            else {
                return false;
            }
        }
        
        public static function session_destroy()
        {
            session_destroy();
        }
        
    }
?>