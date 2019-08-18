//import all other files, make them function , delete eventlistenre on the other ones 
import { lollipop } from "./lollipop"; 
import { graph } from "./graph"; 
import { bubble } from "./bubble"; 
import { choropleth } from "./choropleth"; 


    document.addEventListener("DOMContentLoaded", () => {
        document.getElementsByClassName("home")[0].addEventListener('click', ()=> {
            let element = document.getElementById("container");
            while (element.firstChild) {
               element.removeChild(element.firstChild);
           }

           var img = document.createElement('img')
           img.setAttribute("class", 'wordcloud');          
           img.setAttribute("src", "src/assets/wordcloud (1).svg")
           document.getElementById("container").appendChild(img)


        })





        document.getElementsByClassName("button1")[0].addEventListener('click', ()=> {
            let element = document.getElementById("container");
            while (element.firstChild) {
               element.removeChild(element.firstChild);
           }

            var svg = document.createElement('div')
            svg.setAttribute("id", 'lollipop');          
            document.getElementById("container").appendChild(svg)
            lollipop(); 

        })

        document.getElementsByClassName("button2")[0].addEventListener('click', ()=> {
            let element = document.getElementById("container");
            while (element.firstChild) {
               element.removeChild(element.firstChild);
           }

            var svg = document.createElement('div')
            svg.setAttribute("id", 'category-graph');          
            document.getElementById("container").appendChild(svg)
            graph(); 
        })


        document.getElementsByClassName("button3")[0].addEventListener('click', ()=> {
            let element = document.getElementById("container");
            while (element.firstChild) {
               element.removeChild(element.firstChild);
           }

            var svg = document.createElement('div')
            var div = document.createElement('div')
            div.setAttribute("class", "title")
            div.innerHTML = "TOTAL REVENUE BY GOVERNMENT DONOR"
            document.getElementById("container").appendChild(div)
            svg.setAttribute("id", "world-map")
            document.getElementById("container").appendChild(svg)
            choropleth(); 
        })


        // <div id="sliderContainer">
        //     <input id="timeslide" type="range" min="0" max="6" value="0" step="1"/><br>
        //     <span id="range">2010</span>
        // </div>




        document.getElementsByClassName("button4")[0].addEventListener('click', ()=> {


            //remove stuff already on screen 
            let element = document.getElementById("container");
             while (element.firstChild) {
                element.removeChild(element.firstChild);
            }

            // document.removeChild(document.firstChild)
            var svg = document.createElement('div')
            svg.setAttribute("id", "bubble-chart")
            document.getElementById("container").appendChild(svg)
            bubble(); 
        })


  
    } )

