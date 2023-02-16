import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpcFormsService } from 'src/app/shared/services/ipc-forms.service';

@Component({
  selector: 'app-panel-form',
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.scss'],
})
export class PanelFormComponent implements OnInit {
  registroPanelFormData = {
    inputs: [
      {
        class: 'col-12',
        label: 'Nombre',
        id: 'nombre',
        type: 'text',
        maxlength: '20',
        placeholder: 'Nombre..',
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
    nombre: ['', [Validators.required]],
    route: ['', [Validators.required]],
  });

  constructor(private ipcForms: IpcFormsService, private fb: FormBuilder) {}

  ngOnInit(): void {}

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
      .generateAngular({ projectName, projectPath })
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
}
