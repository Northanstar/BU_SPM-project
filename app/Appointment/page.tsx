'use client'

import React from 'react';
import { useState } from 'react';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  dob: string;
  address: string;
  location: string;
  preferredDate: string;
  symptoms: string;
  urgency: 'low' | 'medium' | 'high';
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

const AppointmentForm: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    address: '',
    location: '',
    preferredDate: '',
    symptoms: '',
    urgency: 'high',
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  // Handle radio button changes
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      urgency: e.target.value as 'low' | 'medium' | 'high'
    }));
  };

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const requiredFields: (keyof FormData)[] = ['fullName', 'phone', 'email', 'dob', 'address', 'location', 'preferredDate', 'symptoms'];

    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (simple)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    const today = new Date();
    const preferredDate = new Date(formData.preferredDate);
    if (formData.preferredDate && preferredDate < today) {
      newErrors.preferredDate = 'Appointment date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real application, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        dob: '',
        address: '',
        location: '',
        preferredDate: '',
        symptoms: '',
        urgency: 'high',
        notes: ''
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date for appointment (tomorrow)
  const getMinAppointmentDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Get maximum date for date of birth (120 years ago)
  const getMaxDobDate = () => {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 120);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 text-black">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            Patient Appointment Request
          </h1>
          <p className="text-gray-600 text-lg">
            Book your medical appointment with us. Fill out the form below and we'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white h-full">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-calendar-check text-2xl"></i>
                </div>
                <h2 className="text-2xl font-bold mb-2">Why Book With Us?</h2>
                <p className="text-blue-100">Fast, convenient, and professional healthcare services.</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="fas fa-clock text-blue-200 mt-1 mr-3"></i>
                  <div>
                    <h3 className="font-bold">24/7 Availability</h3>
                    <p className="text-sm text-blue-100">Book appointments anytime, day or night</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-shield-alt text-blue-200 mt-1 mr-3"></i>
                  <div>
                    <h3 className="font-bold">Secure & Private</h3>
                    <p className="text-sm text-blue-100">Your information is protected and confidential</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-stethoscope text-blue-200 mt-1 mr-3"></i>
                  <div>
                    <h3 className="font-bold">Expert Care</h3>
                    <p className="text-sm text-blue-100">Qualified medical professionals</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-blue-500">
                <h3 className="font-bold mb-2">Contact Info</h3>
                <p className="text-sm text-blue-100 flex items-center mb-1">
                  <i className="fas fa-phone-alt mr-2"></i> (123) 456-7890
                </p>
                <p className="text-sm text-blue-100 flex items-center">
                  <i className="fas fa-envelope mr-2"></i> appointments@clinic.com
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-2">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information Section */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      <i className="fas fa-user text-blue-600 mr-2"></i> Personal Information
                    </h3>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-user text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-phone text-gray-400"></i>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-envelope text-gray-400"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="dob" className="block text-gray-700 font-medium mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-calendar text-gray-400"></i>
                      </div>
                      <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        max={getMaxDobDate()}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          errors.dob ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.dob && (
                      <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                      Full Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <i className="fas fa-home text-gray-400"></i>
                      </div>
                      <textarea
                        id="address"
                        rows={2}
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123 Main Street, City, State, ZIP Code"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Location & Appointment Section */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i> Location & Appointment Details
                    </h3>
                  </div>

                  {/* Preferred Location */}
                  <div>
                    <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                      Preferred Clinic Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-map-pin text-gray-400"></i>
                      </div>
                      <select
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="" disabled>
                          Select a location
                        </option>
                        <option value="main">Main Clinic - Downtown</option>
                        <option value="north">Northside Medical Center</option>
                        <option value="west">West End Clinic</option>
                        <option value="south">South City Hospital</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="preferredDate" className="block text-gray-700 font-medium mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-calendar-day text-gray-400"></i>
                      </div>
                      <input
                        type="date"
                        id="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        min={getMinAppointmentDate()}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  {/* How do you feel? Section */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                      <i className="fas fa-heartbeat text-blue-600 mr-2"></i> How Are You Feeling?
                    </h3>
                  </div>

                  {/* Symptoms/Description */}
                  <div className="md:col-span-2">
                    <label htmlFor="symptoms" className="block text-gray-700 font-medium mb-2">
                      Please describe your symptoms or how you're feeling <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <i className="fas fa-comment-medical text-gray-400"></i>
                      </div>
                      <textarea
                        id="symptoms"
                        rows={4}
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                          errors.symptoms ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Please describe your symptoms in detail, including when they started, severity, and any other relevant information..."
                      />
                    </div>
                    {errors.symptoms && (
                      <p className="text-red-500 text-sm mt-1">{errors.symptoms}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      Be as detailed as possible to help us prepare for your appointment.
                    </p>
                  </div>

                  {/* Urgency Level */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-3">How urgent is your concern?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['low', 'medium', 'high'] as const).map((level) => (
                        <label
                          key={level}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                            formData.urgency === level
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:bg-blue-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="urgency"
                            value={level}
                            checked={formData.urgency === level}
                            onChange={handleRadioChange}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <div>
                            <span className="font-medium capitalize">{level}</span>
                            <p className="text-sm text-gray-500">
                              {level === 'low' && 'Routine check-up or non-urgent matter'}
                              {level === 'medium' && 'Need attention soon but not emergency'}
                              {level === 'high' && 'Need immediate medical attention'}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Any other information you'd like to share..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2 mt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-gray-600 text-sm">
                        <i className="fas fa-lock text-green-500 mr-1"></i>
                        Your information is secure and will not be shared
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-linear-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane mr-2"></i> Submit Appointment Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              /* Success Message */
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <i className="fas fa-check-circle text-green-500 text-3xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-green-800">
                      Appointment Request Submitted Successfully!
                    </h3>
                    <p className="text-green-700 mt-1">
                      Thank you for your submission. We will contact you within 24 hours to confirm your appointment details.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>© 2023 Medical Clinic. All rights reserved.</p>
          <p className="mt-1">
            For emergencies, please call 911 or visit your nearest emergency room.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;