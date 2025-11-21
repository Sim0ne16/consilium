import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Card} from 'primeng/card';
import {Button} from "primeng/button";
import {MultiSelect} from "primeng/multiselect";
import {ClassNames} from "primeng/classnames";
import {JOBS} from "../../shared/models/const/jobs.const";
import {RadioButton} from "primeng/radiobutton";
import {Header} from "../../shared/components/header/header";
import {Roles} from "../../shared/models/const/roles.enum";
import {AppState} from "../../store/app.state";
import {login, register} from "../../store/app.action";

@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.html',
    styleUrls: ['./auth.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        Card,
        InputText,
        Password,
        Button,
        MultiSelect,
        FormsModule,
        ClassNames,
        RadioButton,
        Header,
    ],
})
export class Auth {

    protected readonly JOBS = JOBS;
    activeTab = signal<'login' | 'register'>('login');
    registerStep = signal(1);

    loginForm: FormGroup;
    registerForm: FormGroup;


    constructor(private fb: FormBuilder, private store: Store<AppState>) {
        this.loginForm = this.fb.nonNullable.group({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', Validators.required)
        });

        this.registerForm = this.fb.group({
            name: this.fb.control('', Validators.required),
            surname: this.fb.control('', Validators.required),
            role: this.fb.control('', Validators.required),
            jobs: this.fb.control(null),
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', Validators.required)
        });
    }

    login() {
        if (this.loginForm.valid) {
            const payload = this.loginForm.getRawValue();
            this.store.dispatch(login(payload));
        }
    }

    register() {
        if (this.registerForm.valid) {
            this.store.dispatch(register(this.registerForm.getRawValue()));
        }
    }


    get isAdvisor() {
        return this.registerForm.get('role')?.value === Roles.ADVISOR;
    }

    get isUser() {
        return this.registerForm.get('role')?.value === Roles.USER;
    }

    //Stepper

    nextStep() {
        const s = this.registerStep();
        if (s < 3) this.registerStep.set(s + 1);
    }

    prevStep() {
        const s = this.registerStep();
        if (s > 1) this.registerStep.set(s - 1);
    }


}
