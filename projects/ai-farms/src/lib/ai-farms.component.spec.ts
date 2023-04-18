import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiFarmsComponent } from './ai-farms.component';

describe('AiFarmsComponent', () => {
  let component: AiFarmsComponent;
  let fixture: ComponentFixture<AiFarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiFarmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiFarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
