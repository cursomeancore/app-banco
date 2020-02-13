import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';


@Component({
  selector: 'app-gestores-agregar',
  templateUrl: './gestores-agregar.component.html',
  styleUrls: ['./gestores-agregar.component.css']
})
export class GestoresAgregarComponent implements OnInit {
  @ViewChild('usuarioInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('passwordInput', { static: false }) amountInputRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onAgregarGestor() {

  }
}
