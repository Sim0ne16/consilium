import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})

export class Dashboard {

  data = {
    avatar: 'https://picsum.photos/200',
    name: 'Luca Bianchi',
    role: 'Personal Trainer',
    badges: ['Verificato', 'Fitness', 'Nutrizione'],
    rating: 4,
    reviewsCount: 38,

    bio: 'Preparatore atletico certificato, specializzato in forza, funzionale e ricomposizione corporea.',

    expertise: ['Allenamento', 'Dieta', 'Programmazione', 'Performance'],

    services: [
      {
        title: 'Piano Allenamento',
        desc: 'Programma personalizzato settimanale.'
      },
      {
        title: 'Consulenza 1:1',
        desc: 'Sessione video di 45 minuti.'
      },
      {
        title: 'Valutazione fisica',
        desc: 'Analisi forma, mobilità e obiettivi.'
      }
    ],

    responseTime: 'Entro 2 ore',
    availability: 'Lun–Sab, 9:00–19:00',
    rate: '€30 / sessione',

    reviews: [
      {
        author: 'Marco R.',
        rating: 5,
        text: 'Professionale e molto preparato. Programma efficace fin dalla prima settimana.'
      },
      {
        author: 'Giulia P.',
        rating: 4,
        text: 'Ottima consulenza, spiegazioni chiare e precise.'
      },
      {
        author: 'Stefano L.',
        rating: 5,
        text: 'Supporto continuo e davvero motivante.'
      }
    ],

    isAdmin: false,
    status: 'Active',
    adminNotes: ''
  };


}
