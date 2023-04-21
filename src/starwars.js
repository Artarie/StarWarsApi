import { useState, useEffect } from "react";

export function StarWars() {

    const [respostaPlanetas, setRespostaPlanetas] = useState(<div> </div>);
    const [respostaResidents, setResident] = useState(<h1> Residentes </h1>);
    const [currentPage, setCurrentPage] = useState(1);
    const [residentName, setResidentName] = useState();

    const handleNext = () => {
        setCurrentPage(currentPage + 1);


    };

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);

    };

    useEffect(() => {
        planets(); 
    }, [currentPage]);
    // useEffect(() => {
    //     planets(); 
    // }, [respostaResidents]);



    function planets() {

        let url = "https://swapi.dev/api/planets/?page=" + currentPage;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let respostaJSON = JSON.parse(xmlhttp.responseText);
                let html = [];

                respostaJSON.results.forEach((planeta) => {
                    let name = planeta.name;
                    let climate = planeta.climate;
                    let gravity = planeta.gravity;
                    let poblation = planeta.population;

                    html.push(<div onClick={() => showMore(planeta.name)} key={planeta.name}>
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
    const residentsHtml = [];
    function showResidents(residents){

        
            let xmlhttpPeople = new XMLHttpRequest();
            xmlhttpPeople.open("GET", residents);

            xmlhttpPeople.onreadystatechange = function () {
                if (xmlhttpPeople.readyState == 4 && xmlhttpPeople.status == 200) {
                    let respostaJSONPeople = JSON.parse(xmlhttpPeople.responseText);
                    residentsHtml.push(<p key={respostaJSONPeople.name}>{respostaJSONPeople.name}</p>);
                    console.log(residentsHtml);
               
                 //   setResident(residentsHtml);
                   
                }
              
            }
            xmlhttpPeople.send();
            setTimeout(() => {
                setResident(residentsHtml);
            }, 1000);
    }


    function showMore(name) {
        
        let url = "https://swapi.dev/api/planets/?search=" + name;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url);
        setResidentName();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let respostaJSON = JSON.parse(xmlhttp.responseText);
                let html = [];
                respostaJSON.results.forEach((planeta) => {

                    let name = planeta.name;
                    let climate = planeta.climate;
                    let gravity = planeta.gravity;
                    let poblation = planeta.population;
                    let rotation_period = planeta.rotation_period;
                    let orbital_period = planeta.orbital_period;
                    let diameter = planeta.diameter;
                    let terrain = planeta.terrain;
                    let surface_water = planeta.surface_water;
                    let residents = planeta.residents;
                   

                    residents.forEach((element) => {

                        showResidents(element);

                    });

                   

    
               
                    html.push(<div key={planeta.name}>
                        <p>Nombre : {name}</p>
                        <p>Clima: {climate}</p>
                        <p>Gravedad: {gravity}</p>
                        <p>Poblacion: {poblation}</p>
                        <p>Periodo de Rotación: {rotation_period}</p>
                        <p>Periodo de Orbitación: {orbital_period}</p>
                        <p>Diametro: {diameter}</p>
                        <p>Terreno: {terrain}</p>
                        <p>Agua: {surface_water}</p>

                        <hr></hr>
                    </div>);

                    // html.push(<div>{respostaResidents}</div>);

                });
                setRespostaPlanetas(html);
            }

        }
        xmlhttp.send();

    
    }
    // useEffect(() => {
    //     showMore(); 
    // }, );

    return <><h3>Star Wars</h3>
        <div>
            <button button disabled={currentPage === 1} onClick={handlePrevious}> Previous</button>
            <button button disabled={currentPage === 6} onClick={handleNext}> Next </button>

        </div>
        <div>{respostaPlanetas}</div>
        <div>{respostaResidents}</div>
    </>
}




