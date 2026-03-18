/// <reference types="google.maps" />
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styles: [`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    .delay-200 { animation-delay: 0.2s; }
  `]
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  @ViewChild('addressInput') addressInput!: ElementRef;
  
  leadForm: FormGroup;
  isSubmitting = false;
  private autocomplete: any;

  constructor(private fb: FormBuilder) {
    this.leadForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      propertyAddress: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initAutocomplete();
  }

  private async initAutocomplete() {
    setOptions({
      key: 'AIzaSyB_6CzaW76ZBWsGRFWfKPHmMtv_vbUAEnk', // Your API Key from .env
      v: 'weekly',
    });

    try {
      const { Autocomplete } = await importLibrary('places') as google.maps.PlacesLibrary;
      
      this.autocomplete = new Autocomplete(this.addressInput.nativeElement, {
        types: ['address'],
        componentRestrictions: { country: 'us' }
      });

      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        if (place.formatted_address) {
          this.leadForm.patchValue({
            propertyAddress: place.formatted_address
          });
        }
      });
    } catch (err) {
      console.warn('Google Maps Autocomplete failed to load:', err);
    }
  }

  async onSubmit() {
    if (this.leadForm.valid) {
      this.isSubmitting = true;
      try {
        const response = await fetch('/api/submit-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.leadForm.value)
        });
        
        if (response.ok) {
          alert('Lead submitted successfully!');
          this.leadForm.reset();
        } else {
          throw new Error('Failed to submit');
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('There was an error submitting your request. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
