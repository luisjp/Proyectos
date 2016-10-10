
    /* http://bl.ocks.org/benjchristensen/2579599  */
    var div_hover = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // objeto de tipos de gráfico  con variables
    var TIPOS_ESTATICOS = TIPOS_ESTATICOS || {};
    TIPOS_ESTATICOS.LINE = "line";
    TIPOS_ESTATICOS.CIRCLES = "circle";
    TIPOS_ESTATICOS.GAUGES = "gauge";

    // objeto de Colores con variables estaticas y método
    var COLORES = TIPOS_ESTATICOS.COLORES || {};
    COLORES.BLACK = "rgb(0,0,0)";
    COLORES.WHITE = "rgb(255, 255, 255)";
    COLORES.RED = "rgb(255, 0, 0)";
    COLORES.rgb = function(r,g,b) {

      return "rgb("+r+","+g+","+b+")";
    }

    var toolsD3js = toolsD3js || {};
    toolsD3js.getMaxNumberofArray = function(arr)
    {
      return (Math.max.apply(null, JSON.parse("[" + arr + "]")));
    }
    toolsD3js.getRandomArbitrary = function(min, max)
    {
      return Math.random() * (max - min) + min;
    }

    function D3jsparent(div)
    {

        this.WIDTH = $(div).width();
        this.HEIGHT = $(div).height()==0 ? $(div).width()-200 : $(div).height()  ;
        this._div = div;

        this.x = d3.scale.linear()
            .domain([0, 100])
            .range([0, this.WIDTH]);

        this.y = d3.scale.linear()
            .domain([0, 100])
            .range([0, this.HEIGHT]);

        this.getWidth = function()
        {
          return this.WIDTH;
        }

        this.getHeight = function()
        {
          return this.HEIGHT;
        }

        this.createGraphic = function(div)
        {
          svg = d3.select(div).append("svg:svg")
              .attr("width", this.getWidth())
              .attr("height", this.getHeight())
              .append("svg:g");


          return svg;
        }
        this.ejecutar = function(tipo, dataset, objecttipo)
        {
          switch (tipo)
          {
            case TIPOS_ESTATICOS.LINE:
                this.svg = this.createGraphic(this._div);
                return svg.append("svg:path").attr("d", objecttipo(dataset));
            break;
            case TIPOS_ESTATICOS.CIRCLES:
                return objecttipo(dataset);
            break;
            case TIPOS_ESTATICOS.GAUGES:
                return objecttipo(dataset);
            break;

            default:

          }
        }


    }

    /**
    * Objeto de Expresión
    * linesd3js
    * dataset -> array de datos
    * div -> contenedor html donde se creará el gráfico
    */
    var linesd3js = function(dataset, div)
    {
        const TIPO_GRAFICO = "line";
        var x, y, lineParent, line;
        var lineParent = new D3jsparent(div);

        _asignarXY(dataset, (toolsD3js.getMaxNumberofArray(dataset)+1) );
        _createLine();

        /*
        * Private
        * Función para asignar x mediante d3.scale.linear()
        * ds = dataset
        * maxds = número más mayor del array
        */
        function _asignarXY(ds, maxds)
        {
          x = d3.scale.linear().domain([0, ds.length]).range([0, lineParent.getWidth()]);
          y = d3.scale.linear().domain([0, maxds]).range([lineParent.getHeight(), 0]);
        }
        /*
        * Private
        * Función para crear la linea
        *
        */
        function _createLine()
        {
          line = d3.svg.line()
              .x(function (d, i) {
                return x(i);
              })
              .y(function (d, i){
                return y(d);
              });

        }

        //Función de ejecución para generar el gráfico
        this.ejecutar = function()
        {
          lineParent.ejecutar(TIPO_GRAFICO, dataset, line );
        }
    };

    /*
    * Circlesd3js
    * Objeto para crear gráficos del tipo circulo
    * param dataset, div
    */
    var circlesd3js = function(dataset, div)
    {
      const TIPO_GRAFICO = "circle";
      var x, y, circleParent, circle, svg;
      var circleParent = new D3jsparent(div);
      var time0 = Date.now(),
          time1;

      var coord = d3.range(dataset.length).map(function() {
        return {xloc: 0, yloc: 0, xvel: 0, yvel: 0};
      });

      function createCircle (dataset)
      {

        svg = circleParent.createGraphic(div);
        circle = svg.selectAll("circle")
            .data(dataset)
            .enter().append("circle")
            .attr("r", function(d)
            {
              return Math.sqrt((circleParent.getHeight() / d)*50  );
            })
            .attr("cx", function(d)
            {
              return toolsD3js.getRandomArbitrary(0, circleParent.getWidth());
            })
            .attr("cy", function(d)
            {
              return toolsD3js.getRandomArbitrary(0, circleParent.getHeight());
            })
            .style("stroke", "white")
            .style("cursor","pointer")
            .style("fill", function(d)
            {

                var c = parseInt( (250 * d) /100 );
                return COLORES.rgb(c,c,c);

            }).on("mouseover", function (d) {
                            div_hover.transition()
                                     .duration(200)
                                     .style("opacity", .9);
                            div_hover.html(d)
                                     .style("left", (d3.event.pageX) + "px")
                                     .style("top", (d3.event.pageY - 28) + "px");
            }).on("mouseout", function(d) {
                            div_hover.transition()
                                     .duration(500)
                                     .style("opacity", 0);
            });

          return circle;
      }

      this.ejecutar = function()
      {
        circleParent.ejecutar(TIPO_GRAFICO, dataset, createCircle );

        d3.timer(function()
        {
          coord.forEach(function(d)
          {
            d.xloc += d.xvel;
            d.yloc += d.yvel;
            d.xvel += 0.30 * (Math.random() - .5) - 0.05 * d.xvel - 0.0020 * d.xloc;
            d.yvel += 0.30 * (Math.random() - .5) - 0.05 * d.yvel - 0.0005 * d.yloc;
          });

          circle.attr("transform", function(d, i)
          {
            return "translate(" + circleParent.x(coord[i].xloc) + "," + circleParent.y(coord[i].yloc) + ")";
          })


          time1 = Date.now();
          time0 = time1;
        });
      }
    };

    /*
    * gaugedd3js
    * Objeto para crear gráficos del tipo medio donut
    * param dataset, div
    */
    var gauged3js = function(dataset, div)
    {
      const TIPO_GRAFICO = "gauge";

      var gaugeParent = new D3jsparent(div) , svg;
      var pi = Math.PI, width=gaugeParent.getWidth(),  height=gaugeParent.getHeight();
      var iR=100;
      var oR=160;
      var cur_color = 'limegreen';
      var new_color, hold;
      var max = 100, min = 0, current = 10;
      var textMax = max;
      var textMin = min;
      var arc = d3.svg.arc().innerRadius(iR).outerRadius(oR).startAngle(-90 * (pi/180)); // Arc Defaults



      function createGauge (dataset)
      {
        svg = gaugeParent.createGraphic(div).append("g").attr("transform", "translate(" + width / 2 + "," + height / 1.2 + ")");

        var background = svg.append("path").datum({endAngle:  90 * (pi/180)}).style("fill", "#ddd").attr("d", arc);// Append background arc to svg
        var foreground = svg.append("path").datum({endAngle: -90 * (pi/180)}).style("fill", cur_color).attr("d", arc); // Append foreground arc to svg
        var max = svg.append("text").attr("transform", "translate("+ (iR + ((oR - iR)/2)) +",15)") // Display Max value
                    .attr("text-anchor", "middle").style("font-family", "Helvetica").text(textMax) // Set between inner and outer Radius
        // Display Min value
        var min = svg.append("text").attr("transform", "translate("+ -(iR + ((oR - iR)/2)) +",15)") // Set between inner and outer Radius
                    .attr("text-anchor", "middle").style("font-family", "Helvetica").text(textMin)
        // Display Current value
        var current = svg.append("text").attr("transform", "translate(0,"+ -(iR/4) +")") // Push up from center 1/4 of innerRadius
                    .attr("text-anchor", "middle").style("font-size", "50").style("font-family", "Helvetica").text(current)
        // Update every x seconds
        var incr=0;
        setInterval(function()
        {
            var num;
            if(dataset === undefined)
            {
              num = Math.random() * textMax;
            }else {
              if(incr > dataset.length-1){
                incr = 0;
                num = dataset[incr];
              }else {
                num = dataset[incr];
              }

            }


            var numPi = Math.floor((num * 180 / textMax) - 89) * (pi/180);// Get value
            if(num >= 80)
            {
              new_color = 'red';
            } else if(num >=50)
            {
              new_color = 'orange';
            } else
            {
              new_color = 'limegreen';
            } // Get new color
            current.transition().text(Math.floor(num));// Text transition
          // Arc Transition
            foreground.transition().duration(750).styleTween("fill", function() {
              return d3.interpolate(new_color, cur_color);
            }).call(arcTween, numPi);
            // Set colors for next transition
            hold = cur_color;
            cur_color = new_color;
            new_color = hold;
            incr++;
        }, 1500); // Repeat every 1.5s

      }
      function arcTween(transition, newAngle) {
          transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function(t) {
              d.endAngle = interpolate(t);
              return arc(d);
            };
          });
        }
      this.ejecutar = function()
      {
          gaugeParent.ejecutar(TIPO_GRAFICO, dataset, createGauge );
      }
    };



    /*
    * timelined3js
    * Objeto para crear timelines
    * ex: http://www.cssscript.com/simple-scrollable-timeline-chart-with-d3-js-d3-timeline/
    * param dataset, div
    */
    var timelined3js = function(dataset, div)
    {
      const TIPO_GRAFICO = "timeline";
      var timelineParent = new D3jsparent(div) , svg;
      var width = timelineParent.getWidth(),  height = timelineParent.getHeight();

      function createTimeLine (dataset)
      {

      }

      this.ejecutar = function ()
      {

      };

    };
