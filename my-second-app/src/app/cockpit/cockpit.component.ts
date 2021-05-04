import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @ViewChild('serverNameInput') serverNameInput! : ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  onServerCreated(serverContent: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: this.serverNameInput.nativeElement.value,
      serverContent: serverContent.value
    })
  }

  onBlueprintCreated(serverContent: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: this.serverNameInput.nativeElement.value,
      serverContent: serverContent.value
    })
  }
}
