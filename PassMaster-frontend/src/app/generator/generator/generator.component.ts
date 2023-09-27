import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardService } from 'ngx-clipboard';
import { NotificationComponent } from 'src/app/notification/notification/notification.component';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  passwordLength: number = 12;
  includeLowercase: boolean = true;
  includeUppercase: boolean = true;
  includeNumbers: boolean = true;
  includeSpecialCharacters: boolean = true;
  generatedPassword: string = '';

  constructor(
    private clipboardService: ClipboardService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.generatedPassword = this.generatePassword();
  }

  generatePassword(): string {
    const passwordLength = this.passwordLength;
    let charset = '';
    let generatedPassword = '';

    if (this.includeLowercase) {
      charset += 'abcdefghijklmnopqrstuvwxyz';
    }
  
    if (this.includeUppercase) {
      charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
  
    if (this.includeNumbers) {
      charset += '0123456789';
    }
  
    if (this.includeSpecialCharacters) {
      charset += '!$%&@/+-';
    }
  
    if (!this.includeLowercase && !this.includeUppercase && !this.includeNumbers && !this.includeSpecialCharacters) {
      charset = 'abcdefghijklmnopqrstuvwxyz';
    }
  
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset.charAt(randomIndex);
    }

    this.generatedPassword = generatedPassword;
  
    return generatedPassword;
  }

  onSwitchChange(event: any) {
    this.generatePassword();
  }

  copyToClipboard() {
    if (this.generatedPassword) {
      this.clipboardService.copyFromContent(this.generatedPassword);
      this.showCopyNotification("Mot de passe copié", "success");
    }
  }

  showCopyNotification(msg: string, type: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 5000,
      data: {
        message: msg,
        icon: type == "success" ? "check" : "close"
      },
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: type == "success" ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}
