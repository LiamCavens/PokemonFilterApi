import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})

export class HeaderComponent {
    headerTitle = 'Liams Pokémon App'
}