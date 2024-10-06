import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mostrarFondo: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detectar la ruta actual y establecer el fondo si estamos en la raíz
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Mostrar el fondo y la bienvenida cuando estemos en la ruta principal
        this.mostrarFondo = event.url === '/';
      }
    });
  }

  // Método para mostrar la imagen de fondo y el mensaje al hacer clic en "CiberColas"
  mostrarImagenFondo() {
    this.mostrarFondo = true;
    this.router.navigate(['/']); // Navegar a la ruta raíz
  }

  // Método para ocultar la imagen de fondo y el mensaje cuando se navegue a otra ruta
  ocultarImagenFondo() {
    this.mostrarFondo = false;
  }
}



