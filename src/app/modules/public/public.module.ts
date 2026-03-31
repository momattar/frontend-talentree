import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from '../../layout/public/public.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutComponent } from './pages/about/about.component';
import { OfferComponent } from './pages/offer/offer.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    PublicComponent,
    LandingPageComponent,
    AboutComponent,
    OfferComponent,
    TestimonialComponent,
    ContactComponent
  ]
})
export class PublicModule { }