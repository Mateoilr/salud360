import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContentPage implements OnInit {
  selectedTab: string = 'videos';

  // Contenido de meditación y bienestar
  meditationContent = [
    {
      id: 1,
      title: 'Meditación para la calma',
      description: 'Encuentra tu paz interior con esta guía',
      type: 'meditation',
      duration: '15 min',
      difficulty: 'Principiante'
    },
    {
      id: 2,
      title: 'Yoga para el equilibrio',
      description: 'Mejora tu flexibilidad y bienestar',
      type: 'yoga',
      duration: '30 min',
      difficulty: 'Intermedio'
    },
    {
      id: 3,
      title: 'Respiración consciente',
      description: 'Técnicas de respiración para relajarte',
      type: 'breathing',
      duration: '10 min',
      difficulty: 'Principiante'
    },
    {
      id: 4,
      title: 'Mindfulness diario',
      description: 'Practica la atención plena cada día',
      type: 'mindfulness',
      duration: '20 min',
      difficulty: 'Principiante'
    }
  ];

  // Tests disponibles
  availableTests = [
    {
      id: 'stress',
      title: 'Test de Estrés',
      description: 'Evalúa tus niveles de estrés',
      questions: 10,
      duration: '5 min',
      category: 'mental-health'
    },
    {
      id: 'mental-health',
      title: 'Test de Salud Mental',
      description: 'Conoce tu bienestar emocional',
      questions: 15,
      duration: '8 min',
      category: 'mental-health'
    },
    {
      id: 'sexuality',
      title: 'Test de Sexualidad',
      description: 'Explora tu salud sexual',
      questions: 12,
      duration: '6 min',
      category: 'sexuality'
    },
    {
      id: 'habits',
      title: 'Test de Hábitos',
      description: 'Analiza tus rutinas diarias',
      questions: 8,
      duration: '4 min',
      category: 'lifestyle'
    }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private themeService: ThemeService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.initializeSwiper();
  }

  ionViewDidEnter() {
    this.initializeSwiper();
  }

  private initializeSwiper() {
    // Configuración adicional del swiper si es necesario
    const swiperEl = document.querySelector('.meditation-swiper');
    if (swiperEl) {
      // Agregar eventos personalizados del swiper
      swiperEl.addEventListener('swiper-slide-change', (e: any) => {
        this.onSlideChange(e.detail[0]);
      });
    }
  }

  onSlideChange(swiper: any) {
    const activeIndex = swiper.activeIndex;
    console.log('Slide activo:', activeIndex);
    // Aquí puedes agregar lógica adicional cuando cambie el slide
  }

  // Cambiar entre tabs de contenido
  onTabChange(event: any) {
    this.selectedTab = event.detail.value;
    console.log('Tab seleccionado:', this.selectedTab);
  }

  // Navegar a contenido específico
  openContent(contentId: number) {
    const content = this.meditationContent.find(c => c.id === contentId);
    if (content) {
      console.log('Abrir contenido:', content);
      // Aquí puedes navegar a la página del contenido específico
      // this.router.navigate(['/content', contentId]);
      this.showContentPreview(content);
    }
  }

  // Mostrar preview del contenido
  async showContentPreview(content: any) {
    const alert = await this.alertController.create({
      header: content.title,
      message: `
        <p><strong>Descripción:</strong> ${content.description}</p>
        <p><strong>Duración:</strong> ${content.duration}</p>
        <p><strong>Nivel:</strong> ${content.difficulty}</p>
      `,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Comenzar',
          handler: () => {
            this.startContent(content);
          }
        }
      ]
    });

    await alert.present();
  }

  // Iniciar contenido
  startContent(content: any) {
    console.log('Iniciando contenido:', content);
    // Aquí puedes navegar a la página de reproducción
    // this.router.navigate(['/player', content.id]);
    this.showToast(`Iniciando: ${content.title}`);
  }

  // Iniciar test
  async startTest(testId: string) {
    const test = this.availableTests.find(t => t.id === testId);
    if (test) {
      const alert = await this.alertController.create({
        header: test.title,
        message: `
          <p>${test.description}</p>
          <p><strong>Preguntas:</strong> ${test.questions}</p>
          <p><strong>Duración estimada:</strong> ${test.duration}</p>
        `,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Comenzar Test',
            handler: () => {
              this.navigateToTest(testId);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  // Navegar al test
  navigateToTest(testId: string) {
    console.log('Navegando al test:', testId);
    this.showToast(`Iniciando test: ${testId}`);

    // Simular completación del test
    setTimeout(() => {
      this.completeTestAndNavigate(testId);
    }, 3000); // Simula 3 segundos de test
  }

  // Completar test y navegar a resultados
  completeTestAndNavigate(testId: string) {
    console.log('Test completado:', testId);
    this.showToast('¡Test completado! Ve tus resultados en Estadísticas');
    // Navegar a estadísticas después de completar test
    setTimeout(() => {
      this.navigateToStats();
    }, 2000);
  }

  // Navegar a tabs
  navigateToTab(tab: string) {
    console.log('Navegando a tab:', tab);
    // Aquí puedes implementar la navegación entre tabs
    switch (tab) {
      case 'inicio':
        this.router.navigate(['/home']);
        break;
      case 'comunidad':
        this.showToast('Comunidad próximamente disponible');
        break;
      case 'contenido':
        // Ya estamos en contenido
        break;
      case 'perfil':
        this.router.navigate(['/profile']);
        break;
    }
  }

  // NUEVOS MÉTODOS DE NAVEGACIÓN
  navigateToStats() {
    this.router.navigate(['/stats']);
  }

  navigateToReminders() {
    this.router.navigate(['/reminders']);
  }

  navigateToCouple() {
    this.router.navigate(['/couple']);
  }

  navigateToPersonalization() {
    this.router.navigate(['/personalization']);
  }

  // Navegar a estadísticas específicas por género
  navigateToGenderStats(gender: 'women' | 'men') {
    if (gender === 'women') {
      this.router.navigate(['/stats-women']);
    } else {
      this.router.navigate(['/stats-men']);
    }
  }

  // Cerrar sesión
  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/login']);
            this.showToast('Sesión cerrada exitosamente');
          }
        }
      ]
    });

    await alert.present();
  }

  // Verificar estado de autenticación
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  // Mostrar toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  // Métodos para gestión de contenido favorito
  toggleFavorite(contentId: number) {
    console.log('Toggle favorito para contenido:', contentId);
    // Aquí puedes implementar la lógica para guardar/quitar favoritos
    this.showToast('Agregado a favoritos');
  }

  // Compartir contenido
  shareContent(contentId: number) {
    const content = this.meditationContent.find(c => c.id === contentId);
    if (content) {
      console.log('Compartir contenido:', content);
      // Aquí puedes implementar la funcionalidad de compartir
      this.showToast(`Compartiendo: ${content.title}`);
    }
  }

  // Filtrar contenido por tipo
  filterContentByType(type: string) {
    return this.meditationContent.filter(content => content.type === type);
  }

  // Obtener progreso del usuario (simulado)
  getUserProgress() {
    // Aquí puedes implementar la lógica para obtener el progreso del usuario
    return {
      completedSessions: 12,
      totalMinutes: 180,
      streak: 5,
      level: 'Principiante'
    };
  }

  // Método para manejar errores
  handleError(error: any) {
    console.error('Error:', error);
    this.showToast('Ha ocurrido un error. Intenta nuevamente.');
  }

}
