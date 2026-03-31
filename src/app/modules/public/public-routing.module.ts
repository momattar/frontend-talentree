import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from '../../layout/public/public.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { OfferComponent } from './pages/offer/offer.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: LandingPageComponent },  // Landing Page
      { path: 'landingpage', component: LandingPageComponent },  // نفس الصفحة
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'offer', component: OfferComponent },
      { path: 'testimonial', component: TestimonialComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }