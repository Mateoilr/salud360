import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'other';
  senderName?: string;
}

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ComunidadPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  messageText: string = '';
  messages: Message[] = [
    {
      id: '1',
      text: 'Who was that photographer you shared with me recently?',
      timestamp: '3:00PM',
      sender: 'user'
    },
    {
      id: '2',
      text: 'That\'s him!',
      timestamp: '3:00PM',
      sender: 'other',
      senderName: 'Slim Aarons'
    },
    {
      id: '3',
      text: 'What was his vision statement?',
      timestamp: '3:00PM',
      sender: 'user'
    },
    {
      id: '4',
      text: '"Attractive people doing attractive things in attractive places"',
      timestamp: '',
      sender: 'other',
      senderName: 'Slim Aarons'
    },
    {
      id: '5',
      text: 'Who was that photographer you shared with me recently?',
      timestamp: '3:00PM',
      sender: 'user'
    },
    {
      id: '6',
      text: '"Attractive people doing attractive things in attractive places"',
      timestamp: '',
      sender: 'other',
      senderName: 'Slim Aarons'
    },
    {
      id: '7',
      text: 'Who was that photographer you shared with me recently?',
      timestamp: '3:00PM',
      sender: 'user'
    }
  ];

  constructor() { }

  ngOnInit() {
    // Scroll to bottom when page loads
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  sendMessage() {
    if (this.messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: this.messageText,
        timestamp: this.getCurrentTime(),
        sender: 'user'
      };

      this.messages.push(newMessage);
      this.messageText = '';

      // Scroll to bottom after sending message
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      // Simulate response (optional)
      this.simulateResponse();
    }
  }

  private getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${displayHours}:${displayMinutes}${ampm}`;
  }

  private scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(300);
    }
  }

  private simulateResponse() {
    // Simulate typing indicator and response
    setTimeout(() => {
      const responses = [
        "That's him!",
        "I think you mean Slim Aarons.",
        "He was known for his glamorous lifestyle photography.",
        "His work captured the jet set lifestyle of the 1950s-70s."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const responseMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        timestamp: this.getCurrentTime(),
        sender: 'other',
        senderName: 'Slim Aarons'
      };

      this.messages.push(responseMessage);

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }, 1000);
  }
}


