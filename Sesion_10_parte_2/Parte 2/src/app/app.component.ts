import { Component, OnInit } from '@angular/core';

// Imports necesarios para trabajar con Service Worker
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-pwa';

  chiste: string = '';

  constructor(private _swUpdate: SwUpdate, private _dataService: DataService){}

  ngOnInit(): void {
      // Recargar la caché nada más iniciarse el componente
      this.recargarCache();
  }

  /**
   * Método encargado de mostrar una alerta al usuario cuando
   * El service worker detecte una nueva versión dosponible
   */
  recargarCache(){
    // Comprobamos que service woroker está activo y detacta cambios de producción
    if(this._swUpdate.isEnabled){
      this._swUpdate.versionUpdates.subscribe(
        {
          next: (event: VersionEvent) => {
            // Cuando se detecta y emite el evento de una versión de la aplicación disponible
            // Consultamos al usuario si desea cargar la nueva versión
            if(confirm('Hay una nueva versión de la aplicación. ¿Deseas cargarla?')){
              // Le decimos al service Worker que active la nueva versión
              this._swUpdate.activateUpdate()
                .then((value: boolean) => {
                    // Si usuario dice que sí a la recarga, actualizamos la ventana limpiando cache
                    // para que el Service Worker capture los nuevos cambios y los registre
                    window.location.reload();
                })
                .catch((error) => console.error(`Ha habido un error al activar la nueva versión: ${error}`))
                .finally(() => console.info('Nueva versión activada'))
            }
          },
          error: (error) => console.error(`Ha ocurrido un error al tratar de obtener una nueva versión: ${error}`),
          complete: () => console.info('Finalizada la obtención de nueva versión')
        }
      );
    }
  }

  /**
   * Método para solicitar un nuevo chiste a DataService
   */
  obtenerNuevoChiste(){
    this._dataService.obtenerFraseAleatoria().subscribe(
      {
        next: (respuesta: any) => this.chiste = respuesta.value,
        error: (error) => console.error(`Ha habido un error al obtener un nuevo chiste: ${error}`),
        complete: () => console.info('Nuevo chiste obtenido')
      }
    )
  }


}
