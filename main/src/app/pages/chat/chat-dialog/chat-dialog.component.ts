import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../shared/model/message.types';
import {DialogFlowService} from '../../../services/dialog-flow.service';
import {TextMessage} from '../../../shared/model/text-message.types';
import {environment} from '../../../../environments/environment';
import {ResponseMessage} from '../../../shared/model/response-message.types';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {
  formChat: FormGroup;
  backEnabled: boolean = true;
  @Input('messages') messages: Message[];
  @Input('colorBackRight') colorBackRight: string;
  @Input('colorFontRight') colorFontRight: string;
  @Input('colorBackLeft') colorBackLeft: string;
  @Input('colorFontLeft') colorFontLeft: string;
  textInput = '';

  constructor(private dialogFlowService: DialogFlowService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formChat = this.formBuilder.group({
      textInput: ['']
    })
  }

  sendMessage() {
    let newMessage: Message = {
      text: this.formChat.value.textInput,
      createdAt: '',
      user: true
    }
    this.messages.push(newMessage);
    let messageBack: TextMessage = {
      firstname: environment.username,
      text: this.formChat.value.textInput
    }
    this.dialogFlowService.sendMessage(messageBack).subscribe((res: ResponseMessage) => {
      console.log(res)
      this.formChat.controls['textInput'].setValue('');

      let messageReturn: Message = {
        text: res?.responseMessage,
        createdAt: new Date().toDateString(),
        user: false
      }
      this.messages.push(messageReturn);
    });
    this.textInput = '';
  }

  onKey(event: any) {
    if (event.keyCode == 13) {
      this.sendMessage();
    }
  }
}
