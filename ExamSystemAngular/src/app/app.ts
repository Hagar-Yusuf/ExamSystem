import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Header } from "./components/shared/header/header";
import { Footer } from "./components/shared/footer/footer";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, Header, Footer], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ExamSystemAngular';
}
