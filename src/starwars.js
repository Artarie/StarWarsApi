import { useState, useEffect } from "react";

export function StarWars() {

    const [respostaPlanetas, setRespostaPlanetas] = useState(<div> </div>);
    const [respostaResidents, setResident] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const handleNext = () => {
        setCurrentPage(currentPage + 1);


    };

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);

    };
    const goBack = () => {
       planets();

    };

    useEffect(() => {
        planets();
    }, [currentPage]);



    function planets() {
        setResident();

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

                    html.push(<div class="col-4 center border border-primary m-2 bg-light " style={{ '--bs-bg-opacity': '.5' }} onClick={() => showMore(planeta.name)} key={planeta.name}>
                        <p>Nombre : {name}</p>
                        <p>Clima: {climate}</p>
                        <p>Gravedad: {gravity}</p>
                        <p>Poblacion: {poblation}</p>
                    </div>);

                });
                setRespostaPlanetas(html);
            }

        }
        xmlhttp.send();

    }
    const residentsHtml = [];
    function showResidents(residents) {
        setResident();


        let xmlhttpPeople = new XMLHttpRequest();
        xmlhttpPeople.open("GET", residents);

        xmlhttpPeople.onreadystatechange = function () {
            if (xmlhttpPeople.readyState == 4 && xmlhttpPeople.status == 200) {
                let respostaJSONPeople = JSON.parse(xmlhttpPeople.responseText);
                residentsHtml.push(<p key={respostaJSONPeople.name} onClick={() => showMoreResident(residents)}>{respostaJSONPeople.name}</p>);

                //   setResident(residentsHtml);

            }

        }
        xmlhttpPeople.send();
        setTimeout(() => {
            setResident(<div class="col-4 center border border-primary m-2 bg-light" style={{ '--bs-bg-opacity': '.5' }}> <h1>Residentes: </h1>{residentsHtml}</div>);
        }, 1000);
    }


    function showMore(name) {
        setResident();

        let url = "https://swapi.dev/api/planets/?search=" + name;
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
                    let rotation_period = planeta.rotation_period;
                    let orbital_period = planeta.orbital_period;
                    let diameter = planeta.diameter;
                    let terrain = planeta.terrain;
                    let surface_water = planeta.surface_water;
                    let residents = planeta.residents;


                    residents.forEach((element) => {

                        showResidents(element);

                    });

                    html.push(
                      
                    <div class="col-4 center border border-primary m-2 bg-light " style={{ '--bs-bg-opacity': '.5' }} key={planeta.name}>

                        <p>Nombre : {name}</p>
                        <p>Clima: {climate}</p>
                        <p>Gravedad: {gravity}</p>
                        <p>Poblacion: {poblation}</p>
                        <p>Periodo de Rotación: {rotation_period}</p>
                        <p>Periodo de Orbitación: {orbital_period}</p>
                        <p>Diametro: {diameter}</p>
                        <p>Terreno: {terrain}</p>
                        <p>Agua: {surface_water}</p>
                    </div>);

                    // html.push(<div>{respostaResidents}</div>);

                });
                setRespostaPlanetas(html);
            }

        }
        xmlhttp.send();


    }

    function showMoreResident(residents) {
        setResident();

        let configFetch = {
            method: "GET",
            headers: { 'Content-Type': 'application/x-www-formurlencoded' }
        };
        let promise = fetch(residents, configFetch);
        promise.then(function (response) {
            response.json().then(
                function (residentJSON) {
                    let html = [];

                    let name = residentJSON.name;
                    let height = residentJSON.height;
                    let mass = residentJSON.mass;
                    let gender = residentJSON.gender;
                    let hair_color = residentJSON.hair_color;
                    let skin_color = residentJSON.skin_color;
                    let eye_color = residentJSON.eye_color;
                    let birth_year = residentJSON.birth_year;
                    let homeworld = residentJSON.homeworld;

                    let configFetch = {
                        method: "GET",
                        headers: { 'Content-Type': 'application/x-www-formurlencoded' }
                    };
                    let promise = fetch(homeworld, configFetch);
                    promise.then(function (response) {
                        response.json().then(
                            function (objetoJSON) {
                                let planetName;

                                planetName = objetoJSON.name;

                                html.push(<div class="col-4 center border border-primary m-2 bg-light " style={{ '--bs-bg-opacity': '.5' }} key={residentJSON.name}>
                                    <p>Nombre : {name}</p>
                                    <p>Altura: {height}</p>
                                    <p>Peso: {mass}</p>
                                    <p>Genero: {gender}</p>
                                    <p>Color de pelo: {hair_color}</p>
                                    <p>Color de piel: {skin_color}</p>
                                    <p>Color de ojos: {eye_color}</p>
                                    <p>Fecha de nacimiento: {birth_year}</p>
                                    <p onClick={() => showMore(planetName)}>Planeta de procedencia: {planetName}</p>

                                </div>);
                                setRespostaPlanetas(html);
                                setResident();
                            });

                    });
                }, function (err) { console.log(err) }


            );
        }, function (err) { console.log(err) }
        );
    }
    return <>


        <div class="d-flex justify-content-center">
            <div class="row">
                <div class="col-12">
                    <h1>Star Wars</h1>
                </div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">

                        <li class="page-item"><a disabled={currentPage === 1} onClick={handlePrevious} class="page-link" >Previous</a></li>
                        <li class="page-item"><a class="page-link"  onClick={goBack}>Go back</a></li>
                        <li class="page-item"><a class="page-link" disabled={currentPage === 6} onClick={handleNext}>Next</a></li>

                    </ul>
                </nav>
            </div>
        </div>
        <div >
            <div class="row justify-content-md-center">{respostaPlanetas} </div>
            <div class="row justify-content-md-center">                       
            {respostaResidents}
            </div>
        </div>
    </>
}




