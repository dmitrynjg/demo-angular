import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'],
})
export class AppShellComponent implements AfterViewInit {
  @ViewChild('sidebarContainer') sidebarContainer!: ElementRef<HTMLDivElement>;
  constructor(private userService: UserService) {}
  isEndScroll: boolean = false;
  authName: string = '';

  checkScroll(): void {
    const sidebarNeedsScroll =
      this.sidebarContainer.nativeElement.scrollHeight >
      this.sidebarContainer.nativeElement.clientHeight;

    if (sidebarNeedsScroll) {
      this.sidebarContainer.nativeElement.classList.add('scroll');
    } else {
      this.sidebarContainer.nativeElement.classList.remove('scroll');
    }
  }

  onScroll() {
    const isSidebarBottom =
      this.sidebarContainer.nativeElement.scrollHeight -
        this.sidebarContainer.nativeElement.scrollTop ===
      this.sidebarContainer.nativeElement.clientHeight;
    if (this.isEndScroll === !isSidebarBottom) {
      this.isEndScroll = isSidebarBottom;
    }
  }

  logout() {
    this.userService.logout();
  }
  
  ngAfterViewInit(): void {
    this.userService.get().subscribe((user) => {
      this.authName = user.login;
    });
    this.checkScroll();
  }
}
