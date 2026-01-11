"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-white/60 font-light">
            We're here to assist you with any inquiries regarding our collections, orders, or styling advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-light text-white mb-8">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-light">First Name</label>
                  <Input className="bg-white/5 border-white/10 text-white" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60 font-light">Last Name</label>
                  <Input className="bg-white/5 border-white/10 text-white" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-light">Email Address</label>
                <Input className="bg-white/5 border-white/10 text-white" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-light">Subject</label>
                <Input className="bg-white/5 border-white/10 text-white" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/60 font-light">Message</label>
                <Textarea className="bg-white/5 border-white/10 text-white min-h-[150px]" placeholder="Your message..." />
              </div>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black py-6">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light text-white mb-8">Get in touch</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Email</h3>
                    <p className="text-white/50 text-sm">hello@atelier.com</p>
                    <p className="text-white/50 text-sm">support@atelier.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Phone</h3>
                    <p className="text-white/50 text-sm">+1 (555) 123-4567</p>
                    <p className="text-white/50 text-sm">Mon-Fri: 9am-6pm EST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <h2 className="text-2xl font-light text-white mb-8">Visit our showroom</h2>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">New York Flagship</h3>
                  <p className="text-white/50 text-sm">123 Fashion Avenue</p>
                  <p className="text-white/50 text-sm">New York, NY 10001</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <MessageSquare className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Live Chat</h3>
                    <p className="text-white/50 text-sm">Available 24/7 for quick questions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">Support Hours</h3>
                    <p className="text-white/50 text-sm">We respond to emails within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
