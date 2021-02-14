

db.asignaturas.insertMany([

    {
        _id: 1,
        Asignatura: "PAR",
        Profesor: "Jesus"
    },

    {
        _id: 2,
        Asignatura: "FOL",
        Profesor: "Amparo"

    },

    {
        _id: 3,
        Asignatura: "Base de Datos",
        Profesor: "Adolfo"

    },

    {
        _id: 4,
        Asignatura: "ISO",
        Profesor: "Alfonso"

    },

    {
        _id: 5,
        Asignatura: "Lenguaje de Marcas",
        Profesor: "Sara"

    }])



db.alumnos.insertMany([

    {
        _id: 1,
        Matricula: "225478963",
        Nombre: "Manuel",
        Apellidos: "Ugarte",
        Sexo: "M",
        Idg: [1, 2, 4],
        Edad: 18
    },

    {
        _id: 2,
        Matricula: "147854963",
        Nombre: "Raul",
        Apellidos: "Garcia",
        Sexo: "M",
        Idg: [2, 3],
        Edad: 18
    },

 

    

    {
        _id: 3,
        Matricula: "147896548",
        Nombre: "Paula",
        Apellidos: "Merino",
        Sexo: "F",
        Idg: [3, 2, 1],
        Edad: 19
    },

   
    {
        _id: 4,
        Matricula: "354789453",
        Nombre: "Jorge",
        Apellidos: "Gallego",
        Sexo: "M",
        Idg: [1, 2, 3, 4, 5],
        Edad: 21
    },

     {
        _id: 5,
        Matricula: "787841259",
        Nombre: "Eva",
        Apellidos: "Peña",
        Sexo: "F",
        Idg: [1, 2, 5],
        Edad: 25
    },

    {
        _id: 6,
        Matricula: "148759641",
        Nombre: "Marta",
        Apellidos: "Campos",
        Sexo: "F",
        Idg: [1, 2, 3],
        Edad: 21
    },

   

])


//....Muestra todas las alumnas de 19 o más que tenga  FOL O PAR mostrandome los campos: matricula, nombre, sexo , Edad y las asignaturas que tienen mostrandolo de la Z - A ....//

db.alumnos.aggregate([
    {
        $lookup: {
            from: "asignaturas",
            localField: "Idg",
            foreignField: "_id",
            as: "asignaturas"
        }
    },
    { $match: { Sexo: "F", "asignaturas.Asignatura": {$in: ["FOL", "PAR"]}, Edad: {$gte: 19} } },

    {
        $project: {
            _id: 0,
            Matricula: 1,
            Nombre: 1,
            Apellidos:1,
            Sexo: 1,
            Edad:1,
            Asignatura: "$asignaturas.Asignatura"
            

        }

    },
    { $sort: { Nombre: -1 } }

]).pretty()


//....RESULTADO....//

/*
{
        "Matricula" : "147896548",
        "Nombre" : "Paula",
        "Apellidos" : "Merino",
        "Sexo" : "F",
        "Edad" : 19,
        "Asignatura" : [
                "PAR",
                "FOL",
                "Base de Datos"
        ]
}
{
        "Matricula" : "148759641",
        "Nombre" : "Marta",
        "Apellidos" : "Campos",
        "Sexo" : "F",
        "Edad" : 21,
        "Asignatura" : [
                "PAR",
                "FOL",
                "Base de Datos"
        ]
}
{
        "Matricula" : "787841259",
        "Nombre" : "Eva",
        "Apellidos" : "Peña",
        "Sexo" : "F",
        "Edad" : 25,
        "Asignatura" : [
                "PAR",
                "FOL",
                "Lenguaje de Marcas"
        ]
}

*/