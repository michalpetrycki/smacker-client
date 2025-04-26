import { Component } from '@angular/core';
import {
    hugeSpatula,
    hugeVegetarianFood,
    hugeNote03,
    hugeAddSquare,
} from '@ng-icons/huge-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgIcon, MatTooltipModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    providers: [
        provideIcons({
            hugeSpatula,
            hugeVegetarianFood,
            hugeNote03,
            hugeAddSquare,
        }),
    ],
})
export class HeaderComponent {
    routes: RouteWithIcon[] = [
        { name: 'New Recipe', path: '/recipe', icon: 'hugeAddSquare' },
        { name: 'Recipes', path: '/recipes', icon: 'hugeNote03' },
        { name: 'Categories', path: '/recipe-categories', icon: 'hugeSpatula' },
        { name: 'Products', path: '/products', icon: 'hugeVegetarianFood' },
        { name: 'Tools', path: '/tools', icon: 'hugeSpatula' },
    ];
}

interface RouteWithIcon {
    name: string;
    path: string;
    icon: string;
}
