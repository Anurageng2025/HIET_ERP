// src/app/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: any[] = [];
  username: string = '';

  constructor(private socketService: AuthService) {}

  logout(){
    this.socketService.logout();
  }

  ngOnInit() {
    this.username = localStorage.getItem('userName') || 'Anonymous';
    this.socketService.joinRoom({ username: this.username });
    this.socketService.receivePreviousMessages().subscribe((messages: any[]) => {
      this.messages = messages;  // Load chat history
      console.log(messages);
      
    });
    this.socketService.receiveMessage().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.socketService.sendMessage({ username: this.username, text: this.message });
      this.message = '';
    }
  }

  isNewDay(currentMessage: any, previousMessage: any) {
    if (!previousMessage) return true; // First message, so it's a new day
    const currentDate = new Date(currentMessage.createdAt).toDateString();
    const previousDate = new Date(previousMessage.createdAt).toDateString();
    return currentDate !== previousDate;
  }
}
