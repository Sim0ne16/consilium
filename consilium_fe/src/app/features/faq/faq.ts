import {Component} from '@angular/core';
import {Header} from "../../shared/components/header/header";

@Component({
    selector: 'app-faq',
    imports: [
        Header
    ],
    templateUrl: './faq.html',
    styleUrl: './faq.scss',
})
export class Faq {
    faq = [
        {
            q: 'How do I get started?',
            a: 'Simply create an account and follow our easy setup guide to begin using our platform.',
            open: false
        },
        {
            q: 'What features are included?',
            a: 'Our platform includes modern design, optimal performance, and enterprise-grade security features.',
            open: false
        },
        {
            q: 'Is technical support available?',
            a: 'Yes, we provide 24/7 technical support to help you with any questions or issues.',
            open: false
        }
    ];


    toggle(item: any) {
        this.faq.forEach(f => {
            if (f !== item) f.open = false;
        });
        item.open = !item.open;
    }

}
