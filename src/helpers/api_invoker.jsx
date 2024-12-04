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

const getReportPasado = async () => {

    try {
        const response = await fetch(`${ApiUrl.url}/reportsPasado`, {
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

//reportsNameImageVideo

const getReportsName = async () => {

    try {
        const response = await fetch(`${ApiUrl.url}/reportsName`, {
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

const getReportById = async (id) => {
    try {
        const response = await fetch(`${ApiUrl.url}/reportsName/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.json();
        }
        throw new Error(`Error fetching role with ID: ${id}`);
    } catch (error) {
        console.error('Error fetching role:', error);
        throw error;
    }
};


// exportar los metodos
module.exports = { createRol, createUser, loginUser, getReport, getReportsName, getReportById, getReportPasado };

