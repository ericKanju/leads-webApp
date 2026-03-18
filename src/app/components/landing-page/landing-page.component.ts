import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-[#f8f7ff] font-sans text-slate-900 relative overflow-hidden">
      <!-- Background Gradients -->
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/50 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]"></div>

      <!-- Navigation -->
      <nav class="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Trovex.ai</span>
        </div>
      </nav>

      <!-- Hero Section -->
      <main class="max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <!-- Left Content -->
        <div class="space-y-8 animate-fade-in-up">
          <h1 class="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900">
            Train and sell better with <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Trovex AI</span>
          </h1>
          <p class="text-xl text-slate-600 max-w-lg leading-relaxed">
            Interactive AI Roleplays for your team. Leave your info and we'll be in touch shortly.
          </p>

          <ul class="space-y-6">
            <li class="flex items-start space-x-4 group">
              <div class="mt-1 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors duration-300">
                <svg class="w-4 h-4 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg text-slate-800">Customized around your methodology</h3>
                <p class="text-slate-500">Create roleplays around your talking points, training methodology, and customer ICP.</p>
              </div>
            </li>
            <li class="flex items-start space-x-4 group">
              <div class="mt-1 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors duration-300">
                <svg class="w-4 h-4 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg text-slate-800">Meet learners where they are</h3>
                <p class="text-slate-500">Fits into your existing LMS, CMS or training portal. Seamless for admins and learners.</p>
              </div>
            </li>
            <li class="flex items-start space-x-4 group">
              <div class="mt-1 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors duration-300">
                <svg class="w-4 h-4 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="font-bold text-lg text-slate-800">Your InfoSec team will thank you</h3>
                <p class="text-slate-500">SOC 2 Type 2, GDPR compliant. Data excluded from AI training models.</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right Form Card -->
        <div class="animate-fade-in-up delay-200">
          <div class="bg-white/80 backdrop-blur-xl p-8 lg:p-12 rounded-[2rem] shadow-2xl shadow-purple-200/50 border border-white">
            <h2 class="text-3xl font-bold mb-8 text-slate-900 text-center lg:text-left">See <span class="text-purple-600">Trovex AI</span> in Action</h2>
            <form [formGroup]="leadForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700 ml-1">First Name *</label>
                  <input type="text" formControlName="firstName" placeholder="Jane"
                    class="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all outline-none">
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700 ml-1">Last Name *</label>
                  <input type="text" formControlName="lastName" placeholder="Doe"
                    class="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all outline-none">
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700 ml-1">Work Email *</label>
                <input type="email" formControlName="email" placeholder="jane@company.com"
                  class="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all outline-none">
              </div>

              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700 ml-1">Phone Number *</label>
                <div class="relative">
                  <input type="tel" formControlName="phone" placeholder="+1 (555) 000-0000"
                    class="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all outline-none">
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700 ml-1">Property Address *</label>
                <input #addressInput type="text" formControlName="propertyAddress" placeholder="Start typing address..."
                  class="w-full px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all outline-none">
              </div>

              <button type="submit" [disabled]="leadForm.invalid || isSubmitting"
                class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group">
                <span class="flex items-center justify-center space-x-2">
                  <span *ngIf="isSubmitting" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  <span>{{ isSubmitting ? 'Sending Request...' : 'Schedule My Personalised Demo' }}</span>
                </span>
              </button>
              
              <p class="text-xs text-center text-slate-400">
                Trovex's <a href="#" class="underline hover:text-purple-600">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </main>

      <!-- Trusted By Section -->
      <section class="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 relative z-10">
        <p class="text-center text-sm font-medium text-slate-400 mb-8">Trusted by 100+ forward-thinking companies</p>
        <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
          <div class="text-2xl font-black text-slate-400">fincobox</div>
          <div class="text-2xl font-black text-slate-400">snapdeal</div>
          <div class="text-2xl font-black text-slate-400">evabot</div>
          <div class="text-2xl font-black text-slate-400">Vyapar</div>
          <div class="text-2xl font-black text-slate-400">Vedantu</div>
          <div class="text-2xl font-black text-slate-400">Scalenut</div>
        </div>
      </section>
    </div>
  `,
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
      key: 'YOUR_GOOGLE_MAPS_API_KEY', // Placeholder
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
