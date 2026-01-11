"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FAQPage() {
  const faqs = [
    {
      category: "Orders & Payment",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay."
        },
        {
          q: "Can I cancel or modify my order?",
          a: "Orders can be modified or cancelled within 2 hours of being placed. Please contact our support team immediately for assistance."
        },
        {
          q: "Do you offer price adjustments?",
          a: "Yes, if an item you purchased goes on sale within 7 days of your purchase, we will honor a one-time price adjustment."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long will my order take to arrive?",
          a: "Standard shipping takes 3-5 business days, while express takes 1-2 business days. International orders typically arrive within 7-14 business days."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you will receive a confirmation email with a tracking number. You can also track it directly on our Track Order page."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 14-day return window for all unworn items with tags attached. Please see our Shipping & Returns page for full details."
        },
        {
          q: "How do I start a return?",
          a: "Log in to your account, go to Order History, and select the items you wish to return to generate a return label."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light tracking-tight text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-white/60 font-light mb-8">
            Find quick answers to common questions about our products and services.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="Search for a question..."
              className="bg-white/5 border-white/10 text-white pl-12 h-12"
            />
          </div>
        </div>

        <div className="space-y-12">
          {faqs.map((category) => (
            <section key={category.category}>
              <h2 className="text-xl font-medium text-white mb-6 tracking-wide">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${category.category}-${idx}`}
                    className="border border-white/10 bg-white/5 rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-white hover:no-underline font-light py-4">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/60 font-light pb-4 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        <div className="mt-20 text-center bg-white/5 border border-white/10 p-12 rounded-3xl">
          <h3 className="text-2xl font-light text-white mb-4">Still have questions?</h3>
          <p className="text-white/60 font-light mb-8">
            Our customer service team is available Monday through Friday, 9am - 6pm EST.
          </p>
          <a
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-amber-500 px-8 text-sm font-medium text-black hover:bg-amber-600 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </main>
    </div>
  );
}
