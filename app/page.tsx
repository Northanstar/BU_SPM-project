import React from 'react';
import Link from 'next/link';
import { 
  CalendarCheck, 
  ShieldCheck, 
  Clock, 
  Users, 
  Stethoscope, 
  ArrowRight,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  HeartPulse
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <CalendarCheck className="h-8 w-8" />,
      title: "Easy Booking",
      description: "Book appointments in seconds with our intuitive interface"
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Book appointments anytime, anywhere"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Doctors",
      description: "Access to certified healthcare professionals"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "The easiest appointment system I've ever used! Booked my checkup in minutes.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "Streamlines patient management beautifully. Highly recommended for clinics.",
      rating: 5
    },
    {
      name: "Robert Davis",
      role: "Regular Patient",
      content: "Love the reminders and easy rescheduling. Makes healthcare accessible.",
      rating: 4
    }
  ];

  const stats = [
    { value: "10,000+", label: "Patients Served" },
    { value: "200+", label: "Doctors" },
    { value: "24/7", label: "Support" },
    { value: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
                <HeartPulse className="h-5 w-5" />
                <span className="text-sm font-medium">E-Health Appointment System</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your Health, 
                <span className="block text-blue-200">Our Priority</span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-2xl">
                Book medical appointments instantly with trusted healthcare providers. 
                Simple, secure, and accessible healthcare for everyone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/Register" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <Link 
                  href="/Login" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
                >
                  Existing Patient
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <CalendarCheck className="h-12 w-12 mb-4" />
                    <h3 className="font-bold text-xl">Quick Booking</h3>
                    <p className="text-blue-100 text-sm mt-2">Book in under 2 minutes</p>
                  </div>
                  
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <Stethoscope className="h-12 w-12 mb-4" />
                    <h3 className="font-bold text-xl">Expert Care</h3>
                    <p className="text-blue-100 text-sm mt-2">Verified doctors</p>
                  </div>
                  
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <ShieldCheck className="h-12 w-12 mb-4" />
                    <h3 className="font-bold text-xl">Secure Data</h3>
                    <p className="text-blue-100 text-sm mt-2">HIPAA compliant</p>
                  </div>
                  
                  <div className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                    <Clock className="h-12 w-12 mb-4" />
                    <h3 className="font-bold text-xl">Save Time</h3>
                    <p className="text-blue-100 text-sm mt-2">No waiting rooms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're revolutionizing healthcare access with technology that puts patients first
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-lg">
            Join thousands of satisfied patients and doctors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-bold text-gray-800">
                  {testimonial.name}
                </div>
                <div className="text-blue-600 text-sm">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands who have made the switch to smarter healthcare management
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/Appointment"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <CalendarCheck className="h-5 w-5" />
                <span>Book Appointment Now</span>
              </Link>
              
              <Link 
                href="/Register"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
              >
                Create Free Account
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-300" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-300" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-green-300" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <HeartPulse className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">E-Health</span>
              </div>
              <p className="text-gray-400">
                Making healthcare accessible, secure, and convenient for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/Appointment" className="text-gray-400 hover:text-white transition">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="/Login" className="text-gray-400 hover:text-white transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/Register" className="text-gray-400 hover:text-white transition">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2 text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>support@ehealth.com</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>123 Medical Center Dr</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Trust & Security</h3>
              <p className="text-gray-400 text-sm">
                HIPAA compliant • SSL encrypted • GDPR ready • 256-bit security
              </p>
              <div className="mt-6 text-sm text-gray-400">
                © 2023 E-Health Appointment System. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;