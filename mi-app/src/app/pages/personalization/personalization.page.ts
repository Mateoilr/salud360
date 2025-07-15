import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-personalization',
  templateUrl: './personalization.page.html',
  styleUrls: ['./personalization.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PersonalizationPage implements OnInit {

  // Visualization toggles
  lowEnergyDays: boolean = true;
  highEnergyDays: boolean = true;
  fertileDays: boolean = true;
  lowEnergyDays2: boolean = true;
  fertileDays2: boolean = true;
  highEnergyDays2: boolean = true;

  constructor(
    private navCtrl: NavController,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    // Initialize component
    this.loadUserPreferences();
  }

  ionViewWillEnter() {
    // Called when entering the page
    console.log('Calendar Settings page entered');
  }

  private loadUserPreferences() {
    // Load user preferences from storage or service
    // This is where you would typically load saved settings
    console.log('Loading user preferences...');
  }

  onToggleChange(settingName: string, value: boolean) {
    // Handle toggle changes
    console.log(`${settingName} changed to:`, value);
    this.saveUserPreferences();
  }

  private saveUserPreferences() {
    // Save user preferences to storage or service
    const preferences = {
      lowEnergyDays: this.lowEnergyDays,
      highEnergyDays: this.highEnergyDays,
      fertileDays: this.fertileDays,
      lowEnergyDays2: this.lowEnergyDays2,
      fertileDays2: this.fertileDays2,
      highEnergyDays2: this.highEnergyDays2
    };

    console.log('Saving preferences:', preferences);
    // Here you would typically save to storage service
  }

  onPeriodReminderClick() {
    // Handle period reminder settings
    console.log('Period reminder clicked');
    // Navigate to period reminder settings
  }

  onOvulationReminderClick() {
    // Handle ovulation reminder settings
    console.log('Ovulation reminder clicked');
    // Navigate to ovulation reminder settings
  }

  onSyncWithCalendarsClick() {
    // Handle sync with other calendars
    console.log('Sync with calendars clicked');
    this.navCtrl.navigateForward('/sync-partner');
  }

  goBack() {
    this.navCtrl.navigateForward('/stats');
  }
}
