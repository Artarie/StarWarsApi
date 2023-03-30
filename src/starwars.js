import { useRef, useState } from "react";


export function StarWars() {

    const [respostaPlanetas, setRespostaPlanetas]= useState(<div> </div>);

    function clickGetCatsAjax(){
        let url = "https://swapi.dev/api/planets/?page=1";
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url);
        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState == 4 && xmlhttp.status==200){
                console.log(xmlhttp.responseText);
                let respostaJSON = JSON.parse(xmlhttp.responseText);
                let html = [];
                
                respostaJSON.results.forEach((planeta)=>{
                    let name = planeta.name;
                    let climate = planeta.climate;
                    let gravity = planeta.gravity;
                    let poblation = planeta.population;
                
                    html.push(<div key={planeta.name}>
                        <p>Nombre : {name}</p>
                        <p>Clima: {climate}</p>
                        <p>Gravedad: {gravity}</p>
                        <p>Poblacion: {poblation}</p>
                        <hr></hr>
                    </div>);
                });
                setRespostaPlanetas(html);
            }
        }
        xmlhttp.send();
    }
    
    return <><h3>Star Wars</h3>  
    
    <button onClick={clickGetCatsAjax}>Planetas</button>
    <div>{respostaPlanetas}</div>
    </>
}




