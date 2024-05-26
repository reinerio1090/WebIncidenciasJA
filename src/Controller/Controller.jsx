
const BASE_URL = 'http://localhost:8080/api/v1/incidencias';

const getIncidencias = async () => {
  try {
    const response = await fetch(BASE_URL);
    const result = await response.json();
    return Array.isArray(result.datos) ? result.datos : [];
  } catch (error) {
    console.error('Error fetching incidencias:', error);
    throw error;
  }
};

const getIncidenciasByFecha = async (fechaInicio, fechaFin) => {
  try {
    const response = await fetch(`${BASE_URL}/fecha?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    const result = await response.json();
    return Array.isArray(result.datos) ? result.datos : [];
  } catch (error) {
    console.error('Error fetching incidencias by fecha:', error);
    throw error;
  }
};

const getIncidenciasByEstado = async () => {
  try {
    const response = await fetch(`${BASE_URL}/estado`);
    const result = await response.json();
    return Array.isArray(result.datos) ? result.datos : [];
  } catch (error) {
    console.error('Error fetching incidencias by estado:', error);
    throw error;
  }
};

const createIncidencia = async (incidenciaData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(incidenciaData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating incidencia:', error);
    throw error;
  }
};

const modificarIncidencia = async (id, newData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error modifying incidencia:', error);
    throw error;
  }
};

export { getIncidencias, getIncidenciasByFecha, getIncidenciasByEstado, createIncidencia, modificarIncidencia };
