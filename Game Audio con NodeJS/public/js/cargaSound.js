var buffer;
window.onload=function()
{        
     

  var socket = io.connect('http://172.20.17.220:8888');
  
  $('#Gtema').keyup(function(event){
    socket.emit('enviarTema', this.value );
  });

  socket.on("connect", function() {
      socket.emit("nick", prompt("Cual es tu nombre?"));
  });

  socket.on("nicks", function(nicks) {
    $("#users ").html('');
    for (var i = 0; i < nicks.length; i++) {

      $("<div class='user'><span>"+nicks[i]+"</span> </div>").appendTo("#users");

    }
  });
  socket.on("temas", function(temas) {

    $('#Gtema').val(temas)
  });

        window.AudioContext =
          window.AudioContext ||
          window.webkitAudioContext;
        
        var audioCtx = null,
          usingWebAudio = true;
        if (typeof AudioContext !== 'undefined') {
          audioCtx = new AudioContext();
        } else if (typeof webkitAudioContext !== 'undefined') {
          audioCtx = new webkitAudioContext();
        } else {
          usingWebAudio = false;
        }
        var source, gainNode;
        

        var filter = audioCtx.createBiquadFilter();
        
        var request = new XMLHttpRequest();
        request.open("GET", "../sounds/metro.wav", true);
        request.responseType = "arraybuffer";

        request.addEventListener("load", function ()
        {
          audioCtx.decodeAudioData(request.response, startShow, error);
        });
        request.send();
        
        var request0 = new XMLHttpRequest();
        request0.open("GET", "../sounds/batery.wav", true);
        request0.responseType = "arraybuffer";
                
        request0.addEventListener("load", function ()
        {
          audioCtx.decodeAudioData(request0.response, startBatery, error);
        });
        request0.send();

        var request1 = new XMLHttpRequest();
        request1.open("GET", "../sounds/platillo.wav", true);
        request1.responseType = "arraybuffer";    
        request1.addEventListener("load", function ()
        {
          audioCtx.decodeAudioData(request1.response, startHit, error);
        });
        request1.send();

        var request2 = new XMLHttpRequest();
        request2.open("GET", "../sounds/guitar.wav", true);
        request2.responseType = "arraybuffer"; 
        request2.addEventListener("load", function ()
        {
          audioCtx.decodeAudioData(request2.response, startGuitar, error);
        });
        request2.send();
        
        var request3 = new XMLHttpRequest();
        request3.open("GET", "../sounds/piano.wav", true);
        request3.responseType = "arraybuffer";   
        request3.addEventListener("load", function ()
        {
          audioCtx.decodeAudioData(request3.response, startPiano, error);
        });
        request3.send();


        function playBattery(bufferBatery)
        {
          if (source && source.playbackState == source.PLAYING_STATE)
              source.stop(0);
          else
          {
            
            filter.type = 0; // LOWPASS
            filter.frequency.value = 5000;
            // Connect source to filter, filter to destination.
            source = audioCtx.createBufferSource();
            gainNode = audioCtx.createGain();
            source.buffer = bufferBatery;
            source.connect(filter);             
            source.connect(gainNode);
            filter.connect(audioCtx.destination);
            gainNode.connect(audioCtx.destination);
            var elFreqD=document.getElementById('elFreqDrums').value;
            var minValue = 40;
            var maxValue = audioCtx.sampleRate / 2;
            var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
            var multiplier = Math.pow(2, numberOfOctaves * (elFreqD - 1.0));

            filter.frequency.value = maxValue * multiplier; 
            
            var elQualD=document.getElementById('elQualDrums').value;
            filter.Q.value = elQualD * 30;                       
            source.start(0);

          }
        }
        function playPlatillo(bufferHit)
        {
          if (source && source.playbackState == source.PLAYING_STATE)
              source.stop(0);
          else
          {
            
            filter.type = 0; // LOWPASS
            filter.frequency.value = 5000;
            // Connect source to filter, filter to destination.
            source = audioCtx.createBufferSource();
            gainNode = audioCtx.createGain();
            source.buffer = bufferHit;
            source.connect(filter);             
            source.connect(gainNode);
            filter.connect(audioCtx.destination);
            gainNode.connect(audioCtx.destination);
            var elFreqH=document.getElementById('elFreqH').value;
            var minValue = 40;
            var maxValue = audioCtx.sampleRate / 2;
            var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
            var multiplier = Math.pow(2, numberOfOctaves * (elFreqH - 1.0));

            filter.frequency.value = maxValue * multiplier; 
            
            var elQualH=document.getElementById('elQualH').value;
            filter.Q.value = elQualH * 30;                       
            source.start(0);

          }
        }
        function playGuitar(bufferGuitar)
        {
          if (source && source.playbackState == source.PLAYING_STATE)
              source.stop(0);
          else
          {
            
            filter.type = 0; // LOWPASS
            filter.frequency.value = 5000;
            // Connect source to filter, filter to destination.
            source = audioCtx.createBufferSource();
            gainNode = audioCtx.createGain();
            source.buffer = bufferGuitar;
            source.connect(filter);             
            source.connect(gainNode);
            filter.connect(audioCtx.destination);
            gainNode.connect(audioCtx.destination);
            var elFreqG=document.getElementById('elFreqG').value;
            var minValue = 40;
            var maxValue = audioCtx.sampleRate / 2;
            var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
            var multiplier = Math.pow(2, numberOfOctaves * (elFreqG - 1.0));

            filter.frequency.value = maxValue * multiplier; 
            
            var elQualG=document.getElementById('elQualG').value;
            filter.Q.value = elQualG * 30;                       
            source.start(0);

          }
        } 
        function playPiano(bufferPiano)
        {
          if (source && source.playbackState == source.PLAYING_STATE)
              source.stop(0);
          else
          {
            filter.type = 0; // LOWPASS
            filter.frequency.value = 5000;
            // Connect source to filter, filter to destination.
            source = audioCtx.createBufferSource();
            gainNode = audioCtx.createGain();
            source.buffer = bufferPiano;

            source.connect(filter);             
            source.connect(gainNode);
            filter.connect(audioCtx.destination);
            gainNode.connect(audioCtx.destination);

            var elFreqP = document.getElementById('elFreqP').value;
            var minValue = 40;
            var maxValue = audioCtx.sampleRate / 2;
            var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
            var multiplier = Math.pow(2, numberOfOctaves * (elFreqP - 1.0));

            filter.frequency.value = maxValue * multiplier; 

            var elQualP=document.getElementById('elQualP').value;
            filter.Q.value = elQualP * 30;
                                 
            source.start(0);
            
          }
        }                         
        function playMetro(buffer)
        {
          if (source && source.playbackState == source.PLAYING_STATE)
              source.stop(0);
          else
          {
            source = audioCtx.createBufferSource();
            gainNode = audioCtx.createGain();
            source.buffer = buffer;
            source.connect(gainNode);

            gainNode.connect(audioCtx.destination);
            source.loop = true;            
            source.loopStart = 0;
            source.start(0);
            
          }
        }

        function error()
        {
          alert("error");
        }

        function startShow(buffer)
        {
            bufferMetro = buffer;
        }
        function startBatery(buffer)
        {
            bufferBatery = buffer;
        }
        function startHit(buffer)
        {
            bufferHit = buffer;
        }
        function startGuitar(buffer)
        {
            bufferGuitar = buffer;
        }
        function startPiano(buffer)
        {
            bufferPiano = buffer;
        }

        document.getElementById('pianoBt').addEventListener("click", function(){

          if (bufferPiano){
            socket.emit('enviar', { missatge: '4' } ); 

            playPiano(bufferPiano);
            socket.on('missatge', function (data) {
                if(data.missatge=='4') {
                  
                  playPiano(bufferPiano);
                           
                } else {
                    console.log("Problema:", data);
                }
            }); 
          }
        });                               
        document.getElementById('guitarBt').addEventListener("click", function(){

          if (bufferGuitar){ 
            socket.emit('enviar', { missatge: '3' } ); 

            playGuitar(bufferGuitar);
            socket.on('missatge', function (data) {
                if(data.missatge=='3') {
                  
                  playGuitar(bufferGuitar);
                           
                } else {
                    console.log("Problema:", data);
                }
            });
          }
        });         
        document.getElementById('hitsBt').addEventListener("click", function(){

          if (bufferHit){
            socket.emit('enviar', { missatge: '2' } ); 
            
            playPlatillo(bufferHit);
            socket.on('missatge', function (data) {
                if(data.missatge=='2') {
                  
                  playPlatillo(bufferHit);
                           
                } else {
                    console.log("Problema:", data);
                }
            });            
          } 
        });
        document.getElementById('drumsBt').addEventListener("click", function(){

          if (bufferBatery){
            socket.emit('enviar', { missatge: '1' } );

            playBattery(bufferBatery);
            socket.on('missatge', function (data) {
                if(data.missatge=='1') {
                  
                  playBattery(bufferBatery);
                           
                } else {
                    console.log("Problema:", data);
                }
            });             
          } 

        });                 
        document.getElementById('imgTempo').addEventListener("click", function(){

          if (bufferMetro){
            socket.emit('enviar', { missatge: '0' } );

            playMetro(bufferMetro);
            socket.on('missatge', function (data) {
                if(data.missatge=='0') {
                  
                  playMetro(bufferMetro);
                           
                } else {
                    console.log("Problema:", data);
                }
            }); 
          } 
        });


        var Temp=document.getElementById('Tempo');
        Temp.addEventListener('change', function() {
          
          source.loopEnd  = this.value;
        }); 

        var elGain=document.getElementById('Cgain');
        elGain.addEventListener('change', function() {

          var fraction = parseInt(this.value) / parseInt(100);
       
          gainNode.gain.value = fraction * fraction;        
        });

        var elFreqDrums=document.getElementById('elFreqDrums');
        elFreqDrums.addEventListener('change', function() {

          var minValue = 40;
          var maxValue = audioCtx.sampleRate / 2;

          var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;

          var multiplier = Math.pow(2, numberOfOctaves * (this.value - 1.0));

          filter.frequency.value = maxValue * multiplier;      
        });   

        var elQualDrums=document.getElementById('elQualDrums');
        elQualDrums.addEventListener('change', function() {

          filter.Q.value = this.value * 30;   
        }); 
        


}

