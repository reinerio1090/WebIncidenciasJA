import React, { useState } from 'react';
import { Select, SelectItem ,DatePicker} from '@tremor/react'
import { Button, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Dialog, DialogPanel,Textarea  } from '@tremor/react';
import { format} from 'date-fns';
import { getIncidencias, getIncidenciasByEstado, getIncidenciasByFecha, modificarIncidencia } from '../../Controller/Controller';


const ListarIncidenciasComponent = () => {
   
    const [isOpen, setIsOpen] = React.useState(false);
    const [estado,setEstado]=useState("todas");
    const [valueFrom, setValueFrom] = useState(new Date(Date.now() -(30 * 24 * 60 * 60 * 1000)));
    const [valueTo, setValueTo] = useState(new Date(Date.now()));
    const [msgRange, setMsgRange] = useState("");
    const [searchType, setSearchType] = useState('fecha');
    const [incidencias, setIncidencias] = useState([]);
    const [selectedIncidencia, setSelectedIncidencia] = useState(null);
    const [valueObservacio,setvalueObservacio]=useState("");

    const handleIconClick = (incidencia) => {
      setSelectedIncidencia(incidencia)
      setIsOpen(true);
    };
    const handleClose = () => {
      setIsOpen(false);
      setSelectedIncidencia(null);
    };

    const handleChangeModificar = async () => {
      if (selectedIncidencia) {
          try {
              await modificarIncidencia(selectedIncidencia.idIncidencia, {
                  observacion: valueObservacio,
                  idUsuarioSoporte: 5
              });
              setIsOpen(false);
              handleSearch();
          } catch (error) {
              console.error('Error updating incidencia:', error);
          }
      }
    };

    const handleSearchByFecha = async () => {
      try {
        const data = await getIncidenciasByFecha(format(valueFrom, 'yyyy-MM-dd'),format(valueTo, 'yyyy-MM-dd'));
        setIncidencias(data);
        console.log("busFecha")
        console.log(data);
      } catch (error) {
        setMsgRange("Error searching by fecha");
        setIncidencias([]);
      }
    };

    const handleSearchByEstado = async () => {
      try {
        const data = await getIncidenciasByEstado();
        console.log("busEstado")
        console.log(data);
        setIncidencias(data);
      } catch (error) {
        setMsgRange("Error searching by estado:");
        setIncidencias([]);
      }
    };

    const handleSearchAll = async () => {
      try {
        const data = await getIncidencias();
        console.log("busEstado")
        console.log(data);
        setIncidencias(data);
      } catch (error) {
        setMsgRange("Error searching all");
        setIncidencias([]);
      }
    };
    
    const HandleChangeEstado = (event) => {
        setEstado(event);
    }
    const handleSearchTypeChange = (value) => {
        setSearchType(value);
      };
    const handleChangeObservacion = (event) => {
      setvalueObservacio(event.target.value);
    };     

    const handleSearch = async() => {
        if (valueFrom == null || valueTo == null){
            setMsgRange("Ingrese un rango de fechas");
            setIncidencias([]);
        }else
            setMsgRange("");
        if (msgRange === "") {                     
            if (searchType === 'fecha') {
                await handleSearchByFecha();
            } if (searchType === 'estado') {
              if(estado==='pendientes')
                await handleSearchByEstado();
              else
                await handleSearchAll();
            }              
        }
    }

    return (
        <>
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-bold text-lg ml-8 my-4">Listado Incidencias</h3>
       <div className='flex flex-wrap gap-x-6 gap-y-3 justify-center items-end mt-3 z-50' >   

        <div>
            <p className="font-semibold text-base">Buscar por:</p>
            <Select defaultValue='fecha' value={searchType} onValueChange={handleSearchTypeChange}>
                <SelectItem value="estado" ><div className='flex '><span class="icon-[ic--outline-playlist-remove] mr-3 h-6 w-6"></span>Estado</div></SelectItem>                   
                <SelectItem value="fecha"><div className='flex '><span class="icon-[la--list-ul] mr-3 h-6 w-6"></span>Fecha</div></SelectItem>                  
            </Select>
        </div>
        {searchType === 'fecha' && (
            <>
            <div className="">
                <p className="font-semibold text-base">fecha desde:</p>
                <DatePicker className="mx-auto max-w-sm" value={valueFrom} onValueChange={setValueFrom}  placeholder="seleccione Fecha" selectPlaceholder="Seleccionar"/>                
            </div>  
            <div className="">
                <p className="font-semibold text-base">fecha hasta:</p>
                <DatePicker className="mx-auto max-w-sm" value={valueTo} onValueChange={setValueTo} placeholder="seleccione Fecha" selectPlaceholder="Seleccionar"/>                
            </div>           
            </>
        )}

        {searchType === 'estado' && (
            <>
            <div>
                <label className="font-semibold text-base">Estado de incidencia:</label>
                <Select className='w-48' defaultValue='todas' value={estado} onValueChange={HandleChangeEstado}>
                    <SelectItem value="pendientes" ><div className='flex '><span class="icon-[ic--outline-playlist-remove] mr-3 h-6 w-6"></span>Mostrar Pendientes</div></SelectItem>                   
                    <SelectItem value="todas"><div className='flex '><span class="icon-[la--list-ul] mr-3 h-6 w-6"></span>Mostrar Todas</div></SelectItem>                  
                </Select>
            </div>
            </>
        )}
        <div className="">
                <Button variant="secondary"onClick={() => handleSearch()} className="flex items-center justify-center ">
                    <span className="icon-[streamline--interface-search-circle-circle-glass-search-magnifying] w-4 h-4 mr-1"></span>
                    <span>Buscar</span>
                </Button>
                <div className='text-red-600 text-xs'>{msgRange}</div>
            </div>
        </div>

      <Table className="mt-5">        
        <TableHead>          
          <TableRow className=''>
            <TableHeaderCell className='max-w-6 text-center'>ID</TableHeaderCell>
            <TableHeaderCell className='text-center'>Descripción</TableHeaderCell>
            <TableHeaderCell className='max-w-10 text-center'>Socio</TableHeaderCell>
            <TableHeaderCell className='max-w-10 text-center'>Estado</TableHeaderCell>
            <TableHeaderCell className='max-w-12 text-center' >Creación</TableHeaderCell>
            <TableHeaderCell className='max-w-12 text-center'>Actualización</TableHeaderCell>
            <TableHeaderCell className='max-w-12 text-center'>UsuarioSoporte</TableHeaderCell>
            <TableHeaderCell className='text-center'>Observación</TableHeaderCell>
            <TableHeaderCell className='text-center max-w-10'>Opción</TableHeaderCell>
          </TableRow>        
        </TableHead>       
      <TableBody>
          {incidencias.map((incidencia,index) => (
          <TableRow  key={incidencia.idIncidencia}>
            <TableCell className='max-w-6 text-center'>{incidencia.idIncidencia}</TableCell>
            <TableCell className='max-w-20 truncate'>{incidencia.descripcion}</TableCell>
            <TableCell className='max-w-10  text-center'>{incidencia.idSocio}</TableCell>
            <TableCell className='max-w-10 text-center'>{incidencia.estado ? <span class="icon-[octicon--issue-closed-16] w-5 h-5 text-green-600"></span> : <span class="icon-[pajamas--issue-close] w-5 h-5 bg-yellow-500"></span>}</TableCell>
            <TableCell className=' max-w-12 text-center'>{format((incidencia.fechaCreacion), 'yyyy-MM-dd')}</TableCell>
            <TableCell className='max-w-12 text-center'>{incidencia.fechaActualizacion ? format(incidencia.fechaActualizacion, 'yyyy-MM-dd') : '-'}</TableCell>
            <TableCell className='max-w-10 text-center'>{incidencia.idUsuarioSoporte ? incidencia.idUsuarioSoporte : '-'}</TableCell>
            <TableCell className='max-w-20 truncate'>{incidencia.observacion ? incidencia.observacion : '-'}</TableCell>
            <TableCell className='max-w-10  text-center'>{incidencia.estado ?<span class="icon-[mdi--eye-check-outline] w-5 h-5 text-green-700 cursor-pointer" onClick={() => handleIconClick(incidencia)}></span>:<span class="icon-[si-glyph--customer-support] w-5 h-5 bg-yellow-500 cursor-pointer"  onClick={() => handleIconClick(incidencia)} aria-label="Atender incidencia"></span>}</TableCell>
          </TableRow>
          ))}
      </TableBody>      
   </Table>

   <Dialog open={isOpen} onClose={handleClose} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg max-w-screen-md w-full">
          {selectedIncidencia && (
            <>
              <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">Detalles de la Incidencia Nro. {selectedIncidencia.idIncidencia}</h3>

              <p><strong>Descripción:  </strong> {selectedIncidencia.descripcion}</p>
              <p><strong>Socio:  </strong> {selectedIncidencia.idSocio}</p>
              <p><strong>Estado:  </strong> {selectedIncidencia.estado ? 'Atendido' : 'Pendiente'}</p>
              <p><strong>Fecha de Creación:  </strong> {format(new Date(selectedIncidencia.fechaCreacion), 'yyyy-MM-dd')}</p>
              <p><strong>Fecha de Actualización:  </strong> {selectedIncidencia.fechaActualizacion ? format(new Date(selectedIncidencia.fechaActualizacion), 'yyyy-MM-dd') : '-'}</p>
              <p><strong>Usuario Soporte:  </strong> {selectedIncidencia.idUsuarioSoporte }</p>
              <p><strong>Observación:  </strong> 
                {selectedIncidencia.estado? 
                  selectedIncidencia.observacion :
                  <Textarea placeholder="Agregar observacion a incidencia" className="mx-auto max-w-lg" onChange={handleChangeObservacion}/>      
                }
              </p>
              <div className='flex text-center justify-center gap-3' >
                  {selectedIncidencia.estado? "":
                    <Button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={handleChangeModificar}>Guardar</Button>
                  }
                  <button onClick={handleClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Cerrar</button>
              </div>
            </>
          )}
        </DialogPanel>
      </Dialog>

        </>     
    );
};

export default ListarIncidenciasComponent;