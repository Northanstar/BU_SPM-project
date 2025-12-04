"use client";

import React, { useState } from 'react';
import {
    Mail, Phone, MapPin, Clock, MessageSquare,
    Send, CheckCircle, AlertCircle
} from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Contact form submitted:', formData);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: 'Failed to send message. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <Phone className="h-6 w-6" />,
            title: 'Phone',
            details: ['(123) 456-7890', '(123) 456-7891 (Emergency)'],
            description: '24/7 Support Available'
        },
        {
            icon: <Mail className="h-6 w-6" />,
            title: 'Email',
            details: ['info@medicare.com', 'support@medicare.com'],
            description: 'Response within 24 hours'
        },
        {
            icon: <MapPin className="h-6 w-6" />,
            title: 'Address',
            details: ['123 Medical Center Dr', 'Healthcare City, HC 12345'],
            description: 'Main Headquarters'
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: 'Business Hours',
            details: ['Mon-Fri: 8:00 AM - 8:00 PM', 'Sat: 9:00 AM - 5:00 PM', 'Sun: Emergency Only'],
            description: 'Appointments available'
        }
    ];

    const departments = [
        { name: 'Appointments & Scheduling', phone: 'ext. 101' },
        { name: 'Medical Records', phone: 'ext. 102' },
        { name: 'Billing & Insurance', phone: 'ext. 103' },
        { name: 'Technical Support', phone: 'ext. 104' },
        { name: 'Patient Services', phone: 'ext. 105' },
        { name: 'Emergency Contact', phone: 'ext. 911' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We're here to help. Contact us for appointments, support, or any questions about our services.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column - Contact Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                                Contact Information
                            </h2>

                            <div className="space-y-8">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-lg mb-1">
                                                {info.title}
                                            </h3>
                                            <div className="space-y-1">
                                                {info.details.map((detail, idx) => (
                                                    <p key={idx} className="text-gray-600">
                                                        {detail}
                                                    </p>
                                                ))}
                                            </div>
                                            <p className="text-sm text-blue-600 mt-2">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Emergency Notice */}
                            <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-xl">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="h-6 w-6 text-red-600 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-red-800 text-lg mb-2">
                                            Emergency Notice
                                        </h3>
                                        <p className="text-red-700">
                                            For medical emergencies, please call 911 or visit your nearest emergency room immediately.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form & Departments */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="h-10 w-10 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                        Message Sent Successfully!
                                    </h3>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                        Thank you for contacting us. Our team will get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center space-x-3 mb-8">
                                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                            <MessageSquare className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">
                                                Send us a Message
                                            </h2>
                                            <p className="text-gray-600">
                                                Fill out the form below and we'll respond promptly.
                                            </p>
                                        </div>
                                    </div>

                                    {errors.submit && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                            {errors.submit}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    placeholder="John Doe"
                                                    disabled={isSubmitting}
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    placeholder="you@example.com"
                                                    disabled={isSubmitting}
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.subject ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="How can we help?"
                                                disabled={isSubmitting}
                                            />
                                            {errors.subject && (
                                                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                                Your Message
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${errors.message ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                placeholder="Please provide details about your inquiry..."
                                                disabled={isSubmitting}
                                            />
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    Sending Message...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-5 w-5 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                        {/* Departments */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                                Department Contacts
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {departments.map((dept, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition"
                                    >
                                        <h3 className="font-bold text-gray-800 text-lg mb-2">
                                            {dept.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            Phone: <span className="text-blue-600 font-medium">(123) 456-7890 {dept.phone}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map/Location */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Our Location
                            </h2>
                            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-2">
                                        123 Medical Center Dr, Healthcare City
                                    </p>
                                    <p className="text-gray-500">
                                        Interactive map would be displayed here
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="font-bold text-blue-800">Parking</p>
                                    <p className="text-sm text-gray-600">Free parking available</p>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="font-bold text-blue-800">Accessibility</p>
                                    <p className="text-sm text-gray-600">Wheelchair accessible</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;