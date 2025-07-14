import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-couple',
  templateUrl: './couple.page.html',
  styleUrls: ['./couple.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgxChartsModule]
})
export class CouplePage implements OnInit {
  weekDays: string[] = ['Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab', 'Dom'];
  viewMode: 'mes' | 'semana' = 'mes';

  emotionData = [
    { name: 'Lun', value: 40 },
    { name: 'Mar', value: 45 },
    { name: 'Mier', value: 50 },
    { name: 'Jue', value: 35 },
    { name: 'Vie', value: 40 },
    { name: 'Sab', value: 45 },
    { name: 'Dom', value: 50 }
  ];
  libidoData = [
    { name: 'Lun', value: 30 },
    { name: 'Mar', value: 35 },
    { name: 'Mier', value: 40 },
    { name: 'Jue', value: 25 },
    { name: 'Vie', value: 30 },
    { name: 'Sab', value: 35 },
    { name: 'Dom', value: 40 }
  ];
  energyData = [
    { name: 'Lun', value: 60 },
    { name: 'Mar', value: 65 },
    { name: 'Mier', value: 70 },
    { name: 'Jue', value: 55 },
    { name: 'Vie', value: 60 },
    { name: 'Sab', value: 65 },
    { name: 'Dom', value: 70 }
  ];
  sexualData = [
    { name: 'Lun', value: 20 },
    { name: 'Mar', value: 25 },
    { name: 'Mier', value: 30 },
    { name: 'Jue', value: 15 },
    { name: 'Vie', value: 20 },
    { name: 'Sab', value: 25 },
    { name: 'Dom', value: 30 }
  ];
  habitsData = [
    { name: 'Lun', value: 45 },
    { name: 'Mar', value: 50 },
    { name: 'Mier', value: 55 },
    { name: 'Jue', value: 40 },
    { name: 'Vie', value: 45 },
    { name: 'Sab', value: 50 },
    { name: 'Dom', value: 55 }
  ];

  chartWidth = 360;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    window.addEventListener('resize', this.updateChartWidth.bind(this));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const card = document.querySelector('.stat-card');
      if (card) {
        this.chartWidth = card.clientWidth - 32;
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateChartWidth.bind(this));
  }

  updateChartWidth() {
    const card = document.querySelector('.stat-card');
    if (card) {
      this.chartWidth = card.clientWidth - 32;
    }
  }

}
