import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppDashboardComponent } from './dashbord.component';

describe('LoginComponent', () => {
  let component: AppDashboardComponent;
  let fixture: ComponentFixture<AppDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppDashboardComponent] // Declare LoginComponent in TestBed
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
