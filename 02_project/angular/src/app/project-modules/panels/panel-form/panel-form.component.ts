import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IpcFormsService } from 'src/app/shared/services/ipc-forms.service';
import Carousel from 'bootstrap/js/dist/carousel';
import * as $ from 'jquery';
@Component({
  selector: 'app-panel-form',
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.scss'],
})
export class PanelFormComponent implements OnInit, AfterViewInit {
  registroPanelFormData = {
    inputs: [
      {
        class: 'col-12',
        label: 'Panel Name',
        id: 'name',
        type: 'text',
        maxlength: '20',
        placeholder: 'Panel Name..',
        errorMessage: [
          {
            typeError: 'required',
            message: 'El nombre es requerido.',
          },
          {
            typeError: 'maxlength',
            message: 'El nombre debe tener menos de 20 caracteres.',
          },
        ],
      },
      {
        class: 'col-6',
        label: 'Hight',
        id: 'hight',
        type: 'text',
        maxlength: '20',
        placeholder: 'Hight..',
        errorMessage: [
          {
            typeError: 'required',
            message: 'El nombre es requerido.',
          },
          {
            typeError: 'maxlength',
            message: 'El nombre debe tener menos de 20 caracteres.',
          },
        ],
      },
      {
        class: 'col-6',
        label: 'Width',
        id: 'width',
        type: 'text',
        maxlength: '20',
        placeholder: 'Width..',
        errorMessage: [
          {
            typeError: 'required',
            message: 'El nombre es requerido.',
          },
          {
            typeError: 'maxlength',
            message: 'El nombre debe tener menos de 20 caracteres.',
          },
        ],
      },
    ],
  };

  registroPanelForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    hight: ['', [Validators.required]],
    width: ['', [Validators.required]],
    route: ['', [Validators.required]],
  });

  projectTipes: Array<any> = [
    { name: 'Electron', value: 'electron' },
    { name: 'IOS', value: 'ios' },
  ];
  isProjectTipeSelected = false;

  curretnOptios: string[]=[];


  myCarousel: any;
  carousel: any;
  carouselItems = 2;
  currentItem = 1;
  tipesForm: FormGroup;
  constructor(private ipcForms: IpcFormsService, private fb: FormBuilder) {

    this.tipesForm = fb.group({
      selectedProjects:  new FormArray([])
     });
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.myCarousel = document.querySelector('#carouselPanel');
    this.carousel = new Carousel(this.myCarousel, {
      interval: false,
    });
  }

  next() {
    if (this.currentItem < 2) {
      this.carousel.next();
      this.currentItem = this.currentItem + 1;
    }
  }

  prev() {
    if (this.currentItem > 1) {
      this.carousel.prev();
      this.currentItem = this.currentItem - 1;
    }
  }

  onCheckboxChange(event: any) {
    const selectedProjects= (this.tipesForm.controls['selectedProjects'] as FormArray);
    if (event.target.checked) {
      selectedProjects.push(new FormControl(event.target.value));
    } else {
      const index = selectedProjects.controls
      .findIndex(x => x.value === event.target.value);
      selectedProjects.removeAt(index);
    }
  }
  tipeProjectSelected() {
    if(this.tipesForm.value.selectedProjects.length>0){
      this.curretnOptios = this.tipesForm.value;
      this.next();
      this.isProjectTipeSelected = false;
    }else{
      this.isProjectTipeSelected  = true;
    }

  }


  onSelectFolder() {
    this.ipcForms
      .getDestinationFolder()
      .then((result) => {
        this.registroPanelForm.get('route')?.patchValue(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onGenerateAngular() {
    const projectName = this.registroPanelForm.get('nombre')?.value;
    const projectPath = this.registroPanelForm.get('route')?.value;

    this.ipcForms
      .generateAngular({
        projectName,
        projectPath,
        fontSize: 0,
        panelOrientation: '',
        vh: 0,
        vw: 0,
      })
      .then(() => {
        console.log('Done');
      })
      .catch((err) => {
        console.log(err);
      });
  }


  registrarHerramienta() {
    if (this.registroPanelForm.valid) {
      console.log('ssss');
    } else {
      this.registroPanelForm.markAllAsTouched();
    }
  }

  getClassCSS(campo: string) {
    if (
      this.registroPanelForm.get(campo)?.invalid &&
      this.registroPanelForm.get(campo)?.touched
    ) {
      return 'is-invalid';
    } else if (
      this.registroPanelForm.get(campo)?.valid &&
      this.registroPanelForm.get(campo)?.touched
    ) {
      return 'is-valid';
    }
    return '';
  }

  inputErrorMessage(input: any) {
    const { id }: { id: string } = input;
    if (
      !this.registroPanelForm.get(id)?.valid &&
      this.registroPanelForm.get(id)?.touched
    ) {
      const num = this.registroPanelFormData.inputs.indexOf(input);
      for (
        let index = 0;
        index < this.registroPanelFormData.inputs[num].errorMessage.length;
        index++
      ) {
        if (
          this.registroPanelForm.get(id)?.errors?.[
            this.registroPanelFormData.inputs[num].errorMessage[index].typeError
          ]
        ) {
          return this.registroPanelFormData.inputs[num].errorMessage[index]
            .message;
        }
      }
    }
    return '';
  }

  reiniciar() {
    this.registroPanelForm.reset();
  }

  showslide: boolean = false;

  show() {
    this.showslide = !this.showslide;
  }
}
