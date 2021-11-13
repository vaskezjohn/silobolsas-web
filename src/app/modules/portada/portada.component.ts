import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css']
})
export class PortadaComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
    let s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/toggleMenu.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
