import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatDialogComponent} from './chat-dialog/chat-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageComponent} from './mesage/message.component';
import {RouterModule} from '@angular/router';
import {PagesRoutes} from '../pages.routing.module';
import {chatRoutes} from './chat.routing.module';
import {ChatComponent} from './chat/chat.component';


@NgModule({
  declarations: [
    ChatDialogComponent,
    MessageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(chatRoutes),

  ],
  exports: [
    MessageComponent,
    ChatDialogComponent
  ]
})
export class ChatModule {
}
