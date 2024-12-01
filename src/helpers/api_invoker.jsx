// importamos la url
import ApiUrl from "./api_url";

// metodo asyncrono que recibe Un objeto Rol y manda a la IP la peticion POST

const createRol = async (rol) => {
    console.log('Rol: ', rol);

    try {
        const response = await fetch(`${ApiUrl.url}/roles`, {
        //const response = await fetch(`http://192.168.1.11:3005/roles`, {
        //const response = await fetch(`http://10.0.2.2/roles3`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rol),
        });
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Error creating role');
    } catch (error) {
        console.error('Error creating role:', error);
        throw error;
    }
}

const createUser = async (user) => {
    console.log('User: ', user);

    try {
        const response = await fetch(`${ApiUrl.url}/user`, {
        //const response = await fetch(`http://
        //const response = await fetch(`http://
        //const response = await fetch(`http://
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Error creating user');
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

const loginUser = async (user) => {
    console.log('User: ', user);

    try {
        const response = await fetch(`${ApiUrl.url}/userl/login`, {
        //const response = await fetch(`http://
        //const response = await fetch(`http://
        //const response = await fetch(`http://
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            return await response.json();
        }
        return await response.json();


        //throw new Error('Error in login');
    }
    catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}


//getReports

const getReport = async () => {

    try {
        const response = await fetch(`${ApiUrl.url}/reports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Si la respuesta no es 2xx, lanza un error con el estado de la respuesta
            const errorData = await response.json();
            console.error('Error response data:', errorData);
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Si la respuesta es exitosa, retorna el JSON
        return await response.json();
    } catch (error) {
        console.error('Error fetching report:', error);
        throw error;
    }
}




const getTypeAccident = async () => {
    try {
        const response = await fetch(`${ApiUrl.url}/typeAccident`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Respuesta de la API:', data);
            return data; // Retorna los datos correctamente
        } else {
            // Maneja errores HTTP (códigos como 404, 500, etc.)
            const errorData = await response.json();
            console.error('Error de la API:', errorData);
            throw new Error(`Error HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al recuperar los datos:', error);
        throw error; // Lanza el error para manejarlo en la llamada
    }
};



const createReport = async (report) => {
    console.log('Report: ', report);

    try {
        const response = await fetch(`${ApiUrl.url}/createReport`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
            },
            body: JSON.stringify(report),
        });
        if (response.ok) {
             return await response.json();
        }
        throw new Error('Error creating report');
    }
    catch (error) {
        console.error('Error creating report:', error);
        throw error;
    }
}



// exportar los metodos
module.exports = { createRol, createUser, loginUser, getReport, getTypeAccident, createReport};

